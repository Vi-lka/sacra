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
import OpenTour from './OpenTour';
import Tour from './Tour';
import ImageComponent from '@/components/custom/ui/ImageComponent';
import PhotoModal from '@/components/custom/ui/photo/PhotoModal';

export default async function Object({
  params: { slug },
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined },
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

  console.log(images)

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
        <div className='my-6 min-h-[350px]'>
          <AnimatedText
            text={dataResult.value.title}
            className='2xl:text-3xl lg:text-2xl text-xl font-bold drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)] lg:hidden block'
            animation={titleAnimations}
            staggerChildren={0.01}
            delay={0.1}
            once
          />

          <section className="lg:w-1/2 lg:float-right lg:m-6 mx-auto my-6">
            {images.length === 1 ? (<>
              <ImageComponent
                src={imagePrimary}
                fill={false}
                width={600}
                height={600}
                className="mx-auto max-h-[70vh] overflow-hidden rounded-md object-contain h-auto w-auto"
                alt={dataResult.value.title}
                priority={true}
              />
              <div className="mt-3 flex flex-wrap gap-3 items-center justify-end">
                <OpenOnMap properties={{
                  objectId: dataResult.value.slug,
                  title: dataResult.value.title,
                  image: dataResult.value.imagesSlider.data[0]?.attributes.url,
                  locationFull: locationForMap,
                  geolocation: dataResult.value.geolocation,
                  point_count: 1,
                  cluster: false
                }}/>
                <Open3DModel embededHTML={dataResult.value.model} />
                {dataResult.value.tour && dataResult.value.tour.data
                  ? (
                    <OpenTour>
                      <Tour id={dataResult.value.tour.data.id} searchParams={searchParams}/>
                    </OpenTour>
                  )
                  : null
                }
                {images.length === 1 
                  ? <PhotoZoom src={imagePrimary} alt={dataResult.value.title} />
                  : <PhotoModal data={images} />
                }
              </div>
            </>) : (
              <PhotoSlider data={images}>
                <div className="mt-1 flex flex-wrap gap-3 items-center justify-end">
                  <OpenOnMap properties={{
                    objectId: dataResult.value.slug,
                    title: dataResult.value.title,
                    image: dataResult.value.imagesSlider.data[0]?.attributes.url,
                    locationFull: locationForMap,
                    geolocation: dataResult.value.geolocation,
                    point_count: 1,
                    cluster: false
                  }}/>
                  <Open3DModel embededHTML={dataResult.value.model} />
                  {dataResult.value.tour && dataResult.value.tour.data
                    ? (
                      <OpenTour>
                        <Tour id={dataResult.value.tour.data.id} searchParams={searchParams}/>
                      </OpenTour>
                    )
                    : null
                  }
                  {images.length === 1 
                    ? <PhotoZoom src={imagePrimary} alt={dataResult.value.title} />
                    : <PhotoModal data={images} />
                  }
                </div>
              </PhotoSlider>
            )}
          </section>

          <section className="">
            <AnimatedText
              text={dataResult.value.title}
              className='2xl:text-3xl lg:text-2xl text-xl font-bold drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)] lg:block hidden'
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
