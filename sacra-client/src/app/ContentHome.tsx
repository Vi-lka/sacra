import AnimatedNumber from '@/components/custom/animation/AnimatedNumber'
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getCities, getObjects, getTours } from '@/lib/queries/strapi-server';
import React from 'react'

export default async function ContentHome() {

    const [ objectsResult, toursResult, citiesResult ] = await Promise.allSettled([ 
        getObjects(1, 2147483647),
        getTours(),
        getCities(),
    ]);

    return (
        <div className='mx-auto w-[95%] max-w-[2200px] md:w-[85%] lg:mt-36 mt-6'>
            <section className='w-full flex lg:flex-row flex-col justify-around items-center gap-24'>
                {!(objectsResult.status === "rejected") 
                    ? (
                        <div className='text-center'>
                            <AnimatedNumber 
                                number={objectsResult.value.meta.pagination.total} 
                                className='lg:text-9xl text-7xl font-bold'
                            >
                                <h2 className='lg:text-lg mt-3'>Объектов культурного наследия</h2>
                            </AnimatedNumber>
                        </div>
                    )
                    : (
                        <ErrorHandler 
                            error={objectsResult.reason as unknown} 
                            place="Home"
                            notFound={false} 
                        />
                    )
                }
                {!(toursResult.status === "rejected") 
                    ? (
                        <div className='text-center'>
                            <AnimatedNumber 
                                number={toursResult.value.meta.pagination.total} 
                                className='lg:text-9xl text-7xl font-bold'
                            >
                                <h2 className='lg:text-lg mt-3'>Виртуальных туров</h2>
                            </AnimatedNumber>
                        </div>
                    )
                    : (
                        <ErrorHandler 
                            error={toursResult.reason as unknown} 
                            place="Home"
                            notFound={false} 
                        />
                    )
                }
                {!(citiesResult.status === "rejected") 
                    ? (
                        <div className='text-center'>
                            <AnimatedNumber 
                                number={citiesResult.value.meta.pagination.total} 
                                className='lg:text-9xl text-7xl font-bold'
                            >
                                <h2 className='lg:text-lg mt-3'>Городов Енисейской сибири</h2>
                            </AnimatedNumber>
                        </div>
                    )
                    : (
                        <ErrorHandler 
                            error={citiesResult.reason as unknown} 
                            place="Home"
                            notFound={false} 
                        />
                    )
                }
            </section>
        </div>
    )
}
