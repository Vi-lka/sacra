"use client"

import 'mapbox-gl/dist/mapbox-gl.css';

import type { ObjectsType } from '@/lib/schemas/strapi-schemas';
import React from 'react'
import type { MapRef} from 'react-map-gl';
import Map, { Marker } from 'react-map-gl'
import MarkerIcon from './MarkerIcon';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import Image from "next/image";
import MapboxLanguage from '@mapbox/mapbox-gl-language';

export default function MapComponent({
    objects,
}: {
    objects: ObjectsType
}) {

  const mapRefCallback = React.useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      //Set the actual ref we use elsewhere
      const map = ref;

      //Add language control that updates map text i18n based on browser preferences
      const language = new MapboxLanguage();
      map.addControl(language);
    }
  }, [])

  return (
    <div className='w-full'>
        <Map
            ref={mapRefCallback}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: objects.data[0].attributes.geolocation.longitude,
              latitude: objects.data[0].attributes.geolocation.latitude,
              zoom: 5
            }}
            style={{width: "100%",  margin: "0 auto", height: "80vh"}}
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        >
            {objects.data.map((el, index) => (
                <Marker 
                    key={index}
                    longitude={el.attributes.geolocation.longitude}
                    latitude={el.attributes.geolocation.latitude}
                    anchor="center"
                >
                  <div className='cursor-pointer'>
                    <Popover>
                      <PopoverTrigger>
                        <div className="flex flex-col items-center gap-1">
                          <MarkerIcon />
                          {/* <p className='bg-foreground text-background px-2 py-1 rounded-md'>{el.attributes.title}</p> */}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className='flex flex-col gap-1 items-center text-center'>
                          {el.attributes.imagesSlider.data[0] 
                            ? (
                              <Image
                                src={el.attributes.imagesSlider.data[0].attributes.url}
                                width={200}
                                height={200}
                                // className={"w-full object-cover"}
                                alt={el.attributes.title}
                              />
                            )
                            : null
                          }
                          <p>{el.attributes.title}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </Marker>
            ))}
        </Map>
    </div>
  )
}
