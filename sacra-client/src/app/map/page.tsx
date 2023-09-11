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
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%]">
            <h1 className="font-bold md:text-2xl text-xl uppercase mb-3">
                Сакральное Пространство <br/> Енисейской Сибири
            </h1>
            <p className='mb-3'>
            Карта сакральных объектов представленных на сайте
            </p>

            <MapComponent objects={dataResult} />
        </div>
    </div>
  )
}
