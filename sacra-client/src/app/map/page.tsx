import MapComponent from '@/components/custom/map/MapComponent';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getObjects } from '@/lib/queries/strapi-server';
import React from 'react';

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
      <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mt-24 mb-6">
        <MapComponent objects={dataResult} />
      </div>
    </div>
  )
}
