"use client"

import 'mapbox-gl/dist/mapbox-gl.css';

import type { ObjectsType } from '@/lib/schemas/strapi-schemas';
import React from 'react'
import Map, { Marker } from 'react-map-gl'

export default function MapComponent({
    objects,
}: {
    objects: ObjectsType
}) {
    
    objects.data.map(el => console.log(el.attributes.geolocation))

  return (
    <div className='w-full'>
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: 44.268375,
              latitude: 46.307964,
              zoom: 14
            }}
            style={{width: "100%",  margin: "0 auto", height: "80vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {objects.data.map((el, index) => (
                <Marker 
                    key={index}
                    longitude={el.attributes.geolocation.longitude}
                    latitude={el.attributes.geolocation.latitude}
                    anchor="bottom"
                >
                  <h1 className=' text-4xl text-red-700'>Marker</h1>
                </Marker>
            ))}
        </Map>
    </div>
  )
}
