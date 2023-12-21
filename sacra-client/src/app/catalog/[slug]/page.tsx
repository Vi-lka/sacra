import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import GoBack from '@/components/custom/ui/GoBack';
import { getObjectBySlug } from '@/lib/queries/strapi-server';
import React from 'react'
import type { Image } from "@/lib/schemas/strapi-schemas"
import PhotoZoom from '@/components/custom/ui/photo/PhotoZoom';
import PhotoSlider from '@/components/custom/ui/photo/PhotoSlider';
import Info from './Info';
import Open3DModel from './Open3DModel';
import { AnimatedText } from '@/components/custom/animation/AnimatedText';
import Metadata from './Metadata';
import { ClientHydration } from '@/components/custom/ui/ClientHydration';
import Loading from '@/components/custom/Loading';
import OpenOnMap from './OpenOnMap';

export default async function Object({
  params: { slug },
}: {
  params: { slug: string };
}) {

  const [ dataResult ] = await Promise.allSettled([ getObjectBySlug(slug) ]);
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

  const titleAnimations = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.05,
      },
    },
  };

  const city = !!dataResult.value.city.data ? dataResult.value.city.data.attributes.title + ", " : ""
  const location = !!dataResult.value.location ? dataResult.value.location : ""

  const locationForMap = city + location

  return (
    <ClientHydration fallback={<Loading />}>
      <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
        <GoBack />
        <div className='flex lg:flex-row flex-col gap-6 my-6'>
          <section className="flex flex-col gap-2 lg:w-1/2">
            <AnimatedText
              el="h1"
              text={dataResult.value.title}
              className='2xl:text-3xl lg:text-2xl text-xl font-bold drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)]'
              animation={titleAnimations}
              staggerChildren={0.01}
              delay={0.1}
              once
            />

            {/* Desktop Info */}
            <Info 
              object={dataResult.value}
              className='lg:block hidden'
            />
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
            <div className="mt-3 flex flex-wrap gap-3 items-center justify-end">
              <Open3DModel url={
                dataResult.value.models.data[0] 
                  ? dataResult.value.models.data[0].attributes.file.data?.attributes.url
                  : undefined
              }/>
              <OpenOnMap properties={{
                objectId: dataResult.value.slug,
                title: dataResult.value.title,
                image: dataResult.value.imagesSlider.data[0]?.attributes.url,
                locationFull: locationForMap,
                geolocation: dataResult.value.geolocation,
                point_count: 1,
                cluster: false
              }}/>
            </div>
          </div>

          {/* Mobile Info */}
          <Info 
            object={dataResult.value}
            className='lg:hidden block'
          />
        </div>
        <Metadata data={dataResult.value} />
      </div>
    </ClientHydration>
  )
}
