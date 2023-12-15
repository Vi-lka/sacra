import Markdown from '@/components/custom/Markdown';
import MarkerIcon from '@/components/custom/map/MarkerIcon';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import GoBack from '@/components/custom/ui/GoBack';
import { getObjectBySlug } from '@/lib/queries/strapi-server';
import Image from 'next/image';
import React from 'react'

export default async function Object({
  params: { slug },
}: {
  params: { slug: string };
}) {

  try {
    await getObjectBySlug(slug);
  } catch (error) {
    return (
      <ErrorHandler 
        error={error} 
        place="Object" 
        notFound 
        goBack 
      />
    )
  }

  const dataResult = await getObjectBySlug(slug);

  const imagePrimary = dataResult.imagesSlider.data[0] 
    ? dataResult.imagesSlider.data[0]?.attributes.url 
    : "/images/image-placeholder-sacra.png"

  return (
    <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mt-24 mb-20">
      <GoBack />
      <div className='flex lg:flex-row flex-col-reverse gap-6 my-6'>
        <section className="flex flex-col gap-2 lg:w-1/2">
          <h1 className='lg:text-2xl text-xl font-bold'>
            {dataResult.title}
          </h1>
          <p className="flex items-center gap-1.5 font-bold">
            <MarkerIcon className="w-4 h-4" /> {dataResult.location}
          </p>
          <Markdown data={dataResult.historicalNote}/>
        </section>

        <figure className='relative lg:aspect-square aspect-video lg:w-1/2'>
          <Image 
            src={imagePrimary}
            alt={dataResult.title}
            fill
            sizes='70vw'
            className='lg:object-contain object-cover'
          />
        </figure>
      </div>
    </div>
  )
}
