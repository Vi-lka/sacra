"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'

export default function GoBack() {

    const router = useRouter()

  return (
    <Button 
        className="flex items-center w-fit py-4 pr-4 pl-0 cursor-pointer"
        variant={"link"}
        onClick={() => router.back()}
    >
        <FiChevronLeft className="h-4 w-4" /> 
        <span className="">Вернуться назад</span>
    </Button>
  )
}
