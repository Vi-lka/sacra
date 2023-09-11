"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

import type { MultiValue } from 'react-select';
import Select from 'react-select'

type Options = {
    value: string | number,
    label: string,
}

export function MultiSelect({ 
  options, 
  placeholder,
  param
}: { 
  options: Array<Options>, 
  placeholder: string,
  param: string
}) {

  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentParams = searchParams.get(param) ?? undefined

  let defaultValues = [] as Options[]
  options.forEach(option => {
    if (currentParams?.split('_').includes(option.value.toString())) {
      defaultValues = [...defaultValues, option]
    }
  })

  const handleSelectParams = React.useCallback(
    (newValue: MultiValue<Options>) => {

      const params = new URLSearchParams(window.location.search);

      let values = [] as string[]

      if (newValue.length > 0) {

        newValue.forEach(option => {
          values = [...values, option.value.toString()]
        })

        params.set(param, values.join('_'));

      } else {

        params.delete(param);
      
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, pathname, router],
  );

  return (
    <Select 
        className="w-full text-background bg-background"
        isMulti
        isLoading={isPending}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValues}
        onChange={handleSelectParams}
    />
  )
}
