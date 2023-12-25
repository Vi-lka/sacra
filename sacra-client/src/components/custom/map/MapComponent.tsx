"use client"

import 'mapbox-gl/dist/mapbox-gl.css';

import type { Objects } from '@/lib/schemas/strapi-schemas';
import React from 'react';
import type { LngLatLike, MapRef} from 'react-map-gl';
import Map, { Marker } from 'react-map-gl';
import MarkerIcon from './MarkerIcon';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { motion } from 'framer-motion';
import type { BBox } from "geojson";
import useSupercluster from "use-supercluster";
import type { PointFeature } from 'supercluster';
import PopupMarker from './PopupMarker';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import { cn } from '@/lib/utils';

export type Properties = {
  objectId: string,
  title: string,
  image: string | undefined,
  locationFull: string,
  geolocation: {
    latitude: number;
    longitude: number;
  }
  point_count: number,
  cluster: boolean,
}

export const param = "marker"

export default function MapComponent({
  objects,
}: {
  objects: Objects
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  const currentParam = searchParams.get(param) ?? undefined
  const paramJSON = currentParam 
    ? JSON.parse(currentParam) as Properties
    : null

  const mapRef = React.useRef<MapRef>();
  const mapRefCallback = React.useCallback((ref: MapRef | undefined) => {
    if (!!ref) {
      //Set the actual ref
      mapRef.current = ref;
      const map = ref;
      //Add language control that updates map text i18n based on browser preferences
      const language = new MapboxLanguage();
      map.addControl(language);
    }
  }, [])

  const [viewState, setViewState] = React.useState({
    longitude: paramJSON ? paramJSON.geolocation.longitude : 93.282883,
    latitude: paramJSON ? paramJSON.geolocation.latitude : 57.700747,
    zoom: paramJSON ? 5.9 : 5,
    bearing: 0,
    pitch: 45
  });
  const [bounds, setBounds] = React.useState<BBox | undefined>(undefined);

  const [popupInfo, setPopupInfo] = React.useState<Properties | null>(paramJSON);

  const points: Array<PointFeature<Properties>> = objects.data.map(object => {
    const city = !!object.attributes.city.data ? object.attributes.city.data.attributes.title + ", " : ""
    const location = !!object.attributes.location ? object.attributes.location : ""
  
    const locationFull = city + location

    return ({
      type: "Feature",
      properties: { 
        objectId: object.attributes.slug,
        title: object.attributes.title,
        image: object.attributes.imagesSlider.data[0]?.attributes.url,
        locationFull: locationFull,
        geolocation: {
          longitude: object.attributes.geolocation.longitude,
          latitude: object.attributes.geolocation.latitude
        },
        point_count: 1,
        cluster: false,
      },
      geometry: {
        type: "Point",
        coordinates: [
          object.attributes.geolocation.longitude,
          object.attributes.geolocation.latitude
        ]
      }
    })
  });

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: viewState.zoom,
    options: { radius: 45, maxZoom: 22 }
  });

  const onSelectCluster = React.useCallback((coordinates: LngLatLike) => {
    mapRef.current?.flyTo({center: coordinates, duration: 1000, zoom: viewState.zoom + 2});
  }, [viewState.zoom]);

  const onSelectMarker = React.useCallback((properties: Properties) => {
      mapRef.current?.flyTo({center: [properties.geolocation.longitude, properties.geolocation.latitude], duration: 1000});
      setPopupInfo(properties);

      const params = new URLSearchParams(window.location.search);
      params.set(param, JSON.stringify(properties));
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
  }, [pathname, router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: "tween", delay: 0.3 }}
      className='relative w-full overflow-hidden rounded-md'
    >
      {isPending && <Spinner className='absolute top-2 left-2 z-50'/>}
        <Map
          {...viewState}
          ref={mapRef as React.Ref<MapRef> | undefined}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/vi-per/clqdi9xq300a101qy9jo4bbbm"
          style={{width: "100%",  margin: "0 auto", height: "80vh"}}
          onMove={evt => {
            setViewState(evt.viewState)
            setBounds(evt.target.getBounds().toArray().flat() as BBox)
          }}
          onLoad={evt => {
            setBounds(evt.target.getBounds().toArray().flat() as BBox)
          }}
          onStyleData={() => mapRefCallback(mapRef.current)}
        >
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount
            } = cluster.properties;
          
            // cluster to render
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  latitude={latitude}
                  longitude={longitude}
                >
                  <div
                    className="cluster-marker text-base"
                    style={{
                      width: `${10 + (pointCount / points.length) * 50}px`,
                      height: `${10 + (pointCount / points.length) * 50}px`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCluster(cluster.geometry.coordinates as LngLatLike)
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            // single point to render
            return (
              <Marker 
                key={`crime-${cluster.properties.objectId}`}
                longitude={longitude}
                latitude={latitude}
                anchor="center"
                onClick={e => {
                  // If we let the click event propagates to the map, it will immediately close the popup
                  // with `closeOnClick: true`
                  e.originalEvent.stopPropagation();
                  onSelectMarker(cluster.properties as Properties)
                }}
              >
                <MarkerIcon 
                  className='cursor-pointer transition-all' 
                  classNamePath={cn(
                    "transition-all",
                    cluster.properties.objectId === popupInfo?.objectId 
                      ? 'fill-accent' 
                      : 'fill-foreground'
                  )}
                />
              </Marker>
            );
          })}

          <PopupMarker 
            popupInfo={popupInfo} 
            onClose={() => setPopupInfo(null)}
          />
        </Map>
    </motion.div>
  )
}