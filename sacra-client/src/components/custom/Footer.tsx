import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ErrorHandler from './ui/ErrorHandler';
import { getFooter } from '@/lib/queries/strapi-server';

export default async function Footer() {

    const [ dataResult ] = await Promise.allSettled([ getFooter() ]);
    if (dataResult.status === "rejected")
    return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Footer" 
        notFound 
        goBack 
      />
    );

    const year = new Date().getFullYear();

    return (
        <div className="w-full px-4 py-8 md:px-0 text-foreground bg-[#01041D] relative z-50">
            <div className="mx-auto flex w-[95%] max-w-[2200px] items-center justify-between md:w-[85%]">
                <div className="flex w-1/5">
                    <Link
                      href={`/`}
                      className="relative flex items-center h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
                    >
                        <Image 
                            src={'/images/logo-full.png'}
                            alt='SACRA'
                            fill
                            className='object-contain'
                        />
                    </Link>
                </div>
            </div>

            <div className='mx-auto flex w-[95%] max-w-[2200px] items-end justify-between md:w-[85%]'>
                <div className="font-normal text-sm">
                    <Link href={`tel:${dataResult.value.number}`} className='mt-2 block'>{dataResult.value.number}</Link>
                    <Link href={`mailto:${dataResult.value.email}`} className='mt-2 block'>{dataResult.value.email}</Link>
                </div>
                <div className="flex flex-col h-full justify-between">
                    <p className="font-normal md:text-sm text-[9px] md:text-left text-right">{year} Сакральное Пространтсво Енисейской Сибири</p>
                </div>
            </div>
        </div>
    )
}
