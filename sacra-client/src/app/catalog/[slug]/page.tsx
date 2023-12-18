import Markdown from '@/components/custom/Markdown';
import MarkerIcon from '@/components/custom/map/MarkerIcon';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import GoBack from '@/components/custom/ui/GoBack';
import { getObjectBySlug } from '@/lib/queries/strapi-server';
import React from 'react'
import type { Image } from "@/lib/schemas/strapi-schemas"
import PhotoZoom from '@/components/custom/ui/photo/PhotoZoom';
import PhotoSlider from '@/components/custom/ui/photo/PhotoSlider';

export default async function Object({
  params: { slug },
}: {
  params: { slug: string };
}) {

  const [ dataResult ] = await Promise.allSettled([
    getObjectBySlug(slug)
  ]);
  if (dataResult.status === "rejected")
  return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Object" 
      notFound 
      goBack 
    />
  );

  const imagePrimary = dataResult.value.imagesSlider.data[0] 
    ? dataResult.value.imagesSlider.data[0].attributes.url 
    : "/images/image-placeholder-sacra.png"

  const isImage = (item: Image): item is {
    attributes: {
        url: string;
    };
  } => {
    return !!item
  }

  const images = dataResult.value.imagesSlider.data.filter(isImage)

  return (
    <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mt-24 mb-20">
      <GoBack />
      <div className='flex lg:flex-row flex-col-reverse gap-6 my-6'>
        <section className="flex flex-col gap-2 lg:w-1/2">
          <h1 className='lg:text-2xl text-xl font-bold'>
            {dataResult.value.title}
          </h1>
          <p className="flex items-center gap-1.5 font-bold">
            <MarkerIcon className="w-4 h-4" /> {dataResult.value.location}
          </p>
          <Markdown data={dataResult.value.historicalNote}/>
        </section>

        <div className="lg:w-1/2">
          {images.length < 2 ? (
            <PhotoZoom
              src={imagePrimary}
              alt={dataResult.value.title}
            />
          ) : (
            <PhotoSlider data={images} />
          )}
        </div>
      </div>
    </div>
  )
}
