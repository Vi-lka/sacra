import React from 'react'
import PhotoSlider from '../ui/photo/PhotoSlider'
import PhotoModal from '../ui/photo/PhotoModal'
import { cn } from '@/lib/utils';

export default function SliderComp({
    images,
    className
}: {
    images: {
        attributes: {
            url: string;
        };
    }[],
    className?: string
}) {
    return (
        <div className={cn("relative", className)}>
            <PhotoSlider data={images} />
            <PhotoModal data={images} className='absolute right-0 top-0' />
        </div>
    )
}
