import Loading from '@/components/custom/Loading';
import MapComponent from '@/components/custom/map/MapComponent';
import { ClientHydration } from '@/components/custom/ui/ClientHydration';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getObjects } from '@/lib/queries/strapi-server';
import React from 'react';

export default async function MapPage() {

  const [ dataResult ] = await Promise.allSettled([ getObjects(1, 2147483647) ]);
  if (dataResult.status === "rejected")
  return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Map" 
      notFound 
      goBack 
    />
  );

  return (
    <ClientHydration fallback={<Loading />}>
      <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-6">
        <MapComponent objects={dataResult.value} />
      </div>
    </ClientHydration>
  )
}
