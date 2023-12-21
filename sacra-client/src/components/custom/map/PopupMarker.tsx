"use client"

import React from 'react'
import { Popup } from 'react-map-gl'
import type { Properties } from './MapComponent'
import MarkerIcon from './MarkerIcon'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Image from "next/image";
import type { PopupEvent } from 'react-map-gl/dist/esm/types/events'

export default function PopupMarker({ 
    popupInfo,
    onClose
}: { 
    popupInfo: Properties | null,
    onClose: ((e: PopupEvent<mapboxgl.Popup>) => void)
}) {

  if (!popupInfo) return null

  return (
    <Popup
      anchor="bottom"
      offset={20}
      longitude={Number(popupInfo.geolocation.longitude)}
      latitude={Number(popupInfo.geolocation.latitude)}
      maxWidth='260px'
      className='popup-marker'
      onClose={onClose}
    >
        <div className='flex flex-col gap-3 items-center text-center'>
          <Image
            src={popupInfo.image ? popupInfo.image : "/images/image-placeholder-sacra.png"}
            width={260}
            height={200}
            alt={popupInfo.title}
          />
          <div className="max-w-[260px] px-2">
            <p className='break-words font-medium text-sm mb-1.5'>
              {popupInfo.title}
            </p>
            <p className="flex justify-center gap-1 break-words font-light text-xs text-left">
                <MarkerIcon className="min-w-[0.75rem] min-h-[0.75rem] max-w-[0.75rem] max-h-[0.75rem]" /> 
                <span className=''>{popupInfo.locationFull}</span>
            </p>
          </div>
          <Link 
            href={`/catalog/${popupInfo.objectId}`}
            className='text-accent text-sm hover:underline mb-3 border-none'
          >
            Перейти <ArrowUpRight className='w-4 h-4 inline-block' />
          </Link>
        </div>
    </Popup>
  )
}
