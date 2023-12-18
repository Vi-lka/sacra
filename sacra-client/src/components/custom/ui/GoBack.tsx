"use client"

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'

export default function GoBack() {
  const router = useRouter()

  return (
    <Button 
        className="flex items-center w-fit py-4 pr-4 pl-0 cursor-pointer underline underline-offset-4"
        variant="light"
        onClick={() => router.back()}
    >
        <FiChevronLeft className="h-4 w-4" /> 
        <span className="">Вернуться назад</span>
    </Button>
  )
}
