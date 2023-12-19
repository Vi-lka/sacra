import { Spinner } from '@nextui-org/react'
import React from 'react'
import SacraSvg from '../svg/SacraSvg'

export default function Loading() {
  return (
    <>
        <div className="mx-auto w-full h-screen flex flex-col gap-6 items-center justify-center z-50">
            <SacraSvg className='w-[10rem] no-anim z-50' />
            <div className='w-full flex flex-col gap-3 items-center justify-center'>
                <Spinner className='mx-auto' size="lg" />
                <h1>Загрузка...</h1>
            </div>
        </div>
    
        <div className="gradient w-full h-screen absolute top-0"/>
    </>
  )
}
