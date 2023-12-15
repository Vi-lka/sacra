"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { VscSearchStop } from 'react-icons/vsc'
import { GrUndo } from 'react-icons/gr'
import { Button } from '@/components/ui/button'

export default function NotFound({ 
    children,
    goBack
}: { 
    children?: React.ReactNode,
    goBack: boolean
}) {

    const router = useRouter()
    
  return (
    <>
        {children}
        
        <div className='flex flex-col items-center text-center gap-10 w-max mx-auto mt-10 mb-10'>
            <div className='flex flex-col items-center text-center gap-4'>
                <VscSearchStop size={36} />

                <h2 className='font-OpenSans uppercase lg:text-3xl text-xl font-bold'>
                    Не найдено
                </h2>

                <p className='font-Inter font-normal lg:text-sm text-xs'>
                    Не удалось найти запрошенный ресурс
                </p>
            </div>

            {goBack ? (
                <Button 
                    className="lg:p-6 p-3 uppercase font-Inter w-full"
                    onClick={() => router.back()}
                >
                    Вернуться
                    <GrUndo className='ml-1' size={18} />
                </Button>
            ) : null}
        </div>
    </>
  )
}
