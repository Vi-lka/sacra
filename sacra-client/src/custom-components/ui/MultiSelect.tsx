"use client"

import * as React from "react"

import Select from 'react-select'

type Options = {
    value: string | number,
    label: string,
}

export function MultiSelect({ options, placeholder }: { options: Array<Options>, placeholder: string }) {

  return (
    <Select 
        className="w-full text-background bg-background"
        isMulti
        placeholder={placeholder}
        options={options} 
    />
  )
}
