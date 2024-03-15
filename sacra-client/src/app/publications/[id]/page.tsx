import Dynamic from '@/components/custom/Dynamic/Dynamic';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import GoBack from '@/components/custom/ui/GoBack'
import ImageComponent from '@/components/custom/ui/ImageComponent';
import { getPublicationById } from '@/lib/queries/strapi-server';
import React from 'react'

export default async function PublicationSingle({
    params: { id }
}: {
    params: { id: string },
}) {

    const [ dataResult ] = await Promise.allSettled([ getPublicationById(id) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Publication" 
            notFound 
            goBack 
        />
    );

    const dateArray = dataResult.value.date.split("-")

    // Change year position
    const newDateString = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
    
    return (
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
            <GoBack />
            <div className='flex justify-center items-center my-6 sm:min-h-[350px] min-h-[250px] relative overflow-hidden rounded-2xl'>
                <div className='absolute z-10 bg-background/60 w-full h-full'/>
                {dataResult.value.image.data 
                    ? (
                        <ImageComponent
                            src={dataResult.value.image.data?.attributes.url}
                            alt='Фото публикации'
                            fill
                            sizes='95vw'
                            className='object-cover z-0'
                        />
                    )
                    : <div className="absolute bg-background w-full h-full" />
                }
                <h1 className='font-bold z-20 relative max-w-xs text-center lg:text-2xl sm:text-lg drop-shadow-md'>{dataResult.value.title}</h1>
                <p className='absolute lg:bottom-6 lg:left-6 bottom-4 left-4 font-semibold lg:text-base text-sm z-20 drop-shadow'>{newDateString}</p>
            </div>
            <div className='flex flex-col lg:gap-12 gap-6 lg:mt-12 mt-6'>
                {dataResult.value.content.map((item, index) => (
                    <Dynamic key={index} item={item} />
                ))}
            </div>
        </div>
    )
}
