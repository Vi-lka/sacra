import AnimatedNumber from '@/components/custom/animation/AnimatedNumber'
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getCities, getObjects } from '@/lib/queries/strapi-server';
import React from 'react'

export default async function ContentHome() {

    const [ objectsResult, citiesResult ] = await Promise.allSettled([ 
        getObjects(1, 2147483647),
        getCities()
    ]);
    if (objectsResult.status === "rejected")
    return (
      <ErrorHandler 
        error={objectsResult.reason as unknown} 
        place="Home"
        notFound={false} 
      />
    );
    if (citiesResult.status === "rejected")
    return (
      <ErrorHandler 
        error={citiesResult.reason as unknown} 
        place="Home"
        notFound={false} 
      />
    );

    return (
        <div className='mx-auto w-[95%] max-w-[2200px] md:w-[85%] lg:mt-36 mt-6'>
            <section className='w-full flex lg:flex-row flex-col justify-around items-center gap-24'>
                <div className='text-center'>
                    <AnimatedNumber 
                        number={objectsResult.value.meta.pagination.total} 
                        className='lg:text-9xl text-7xl font-bold'
                    >
                        <h2 className='lg:text-lg mt-3'>Объектов культурного наследия</h2>
                    </AnimatedNumber>
                </div>
                <div className='text-center'>
                    <AnimatedNumber 
                        number={citiesResult.value.meta.pagination.total} 
                        className='lg:text-9xl text-7xl font-bold'
                    >
                        <h2 className='lg:text-lg mt-3'>Городов Енисейской сибири</h2>
                    </AnimatedNumber>
                </div>
            </section>
        </div>
    )
}
