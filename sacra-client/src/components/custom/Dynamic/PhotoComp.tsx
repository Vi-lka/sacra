import React from 'react'
import ImageComponent from '../ui/ImageComponent'
import PhotoZoom from '../ui/photo/PhotoZoom'
import { cn } from '@/lib/utils'

export default function PhotoComp({
    url,
    className
}: {
    url: string,
    className?: string
}) {
    return (
        <div className={cn("relative", className)}>
            <ImageComponent
              src={url}
              fill={false}
              width={600}
              height={600}
              className="mx-auto max-h-[70vh] overflow-hidden rounded-md object-contain h-auto w-auto"
              alt="Фото"
            />
            <PhotoZoom src={url} alt='Фото' className='absolute right-0 top-0' />
        </div>
    )
}
