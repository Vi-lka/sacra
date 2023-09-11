import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getObjects } from '@/lib/queries/strapi-server';
import React from 'react';
import Map from 'react-map-gl';

export default async function MapPage() {

    try {
        await getObjects(1, 2147483647)
    } catch (error) {
        return (
        <ErrorHandler 
            error={error} 
            place="Map" 
            notFound 
            goBack 
          />
        )
    }

  const dataResult = await getObjects(1, 2147483647);


  return (
    <div>
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%]">
            Map
        </div>

        <Map
            mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14
            }}
            style={{width: 600, height: 400}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    </div>
  )
}
