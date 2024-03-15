import type { DynamicZone } from '@/lib/schemas/strapi-schemas'
import React from 'react'
import Markdown from '../Markdown';
import FileComp from './FileComp';
import LinkComp from './LinkComp';
import type { Image } from "@/lib/schemas/strapi-schemas"
import EmbededHTML from './EmbededHTML';
import VideoComp from './VideoComp';
import PhotoComp from './PhotoComp';
import SliderComp from './SliderComp';

export default function Dynamic({
  item
}: {
  item: DynamicZone
}) {

  switch (item.__typename) {
    case "ComponentContentRichText":
      return <Markdown data={item.text} />
  
    case "ComponentContentFile":
      return <FileComp name={item.name} file={item.file} />

    case "ComponentContentUrl":
      return <LinkComp name={item.name} url={item.url} />

    case "ComponentContentSlider":
      const isImage = (item: Image): item is {
        attributes: {
            url: string;
        };
      } => {
        return !!item
      }
    
      const images = item.images.data.filter(isImage)

      if (images.length === 1) {
        return <PhotoComp url={images[0].attributes.url} />
      } else {
        return <SliderComp images={images} />
      }

    case "ComponentContentVideo":
      return <EmbededHTML elem={item.embeded} classNameEmbeded="lg:w-4/5 mx-auto" />

    case "ComponentContentVideoFile":
      return <VideoComp video={item.file} classNameVideo="lg:w-4/5 mx-auto" />
    
    default:
      return null;
  }
}