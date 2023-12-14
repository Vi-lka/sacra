"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { InputSearch } from './InputSearch'
import { Button } from '@/components/ui/button'
import { FiSearch, FiLoader, FiDelete } from 'react-icons/fi';
import { cn } from '@/lib/utils'

export default function SearchField({ placeholder }: { placeholder: string }) {

    const [inputValue, setInputValue] = React.useState<string>("")
    const [debouncedValue, setDebouncedValue] = React.useState<string>("")
    const [mounted, setMounted] = React.useState<boolean>(false)

    const [focus, setFocus] = React.useState<boolean>(false)

    const inputRef = React.createRef<HTMLInputElement>();
    
    const router = useRouter();
    const pathname = usePathname();

    const [isPending, startTransition] = React.useTransition()

    const handleSearchParams = React.useCallback(
        (inputValue: string) => {
          const params = new URLSearchParams(window.location.search);
          if (inputValue.length > 0) {
            params.set("search", inputValue);
          } else {
            params.delete("search");
          }
          startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          });
        },
        [pathname, router],
    );

    // EFFECT: Set Focus
    React.useEffect(() => {
      if (inputValue.length > 0) inputRef.current?.focus()
    }, [inputRef, inputValue.length])

    // EFFECT: Set Initial Params
    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const searchQuery = params.get("search") ?? ""
      setInputValue(searchQuery)
    }, [])

    // EFFECT: Set Mounted
    React.useEffect(() => {
      if (debouncedValue.length > 0 && !mounted) {
        setMounted(true)
      }
    }, [debouncedValue, mounted])

    // EFFECT: Debounce Input Value
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(inputValue)
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    }, [inputValue])

    // EFFECT: Search Params
    React.useEffect(() => {
      if (mounted) handleSearchParams(debouncedValue)
    }, [debouncedValue, handleSearchParams, mounted])
    
  return (
    <div className='relative'>
      <InputSearch
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        className={cn(
          "transition-all",
          focus ? 
            'w-full ring-ring ring-2 ring-offset-2' 
            : 
            'w-full'
        )}
      >
        <FiSearch className="h-4 w-4" />
      </InputSearch>
      
      {isPending ? (
        <div className="absolute top-2 right-2">
          <FiLoader className='w-6 h-6 animate-spin' />
        </div>
      ) : null}
      
      {((inputValue.length > 0) && !isPending) ? (
          <Button 
              variant='ghost'
              className="absolute top-2 right-2 w-fit h-fit p-0"
              onClick={() => {
                  setDebouncedValue('')
                  setInputValue('')
              }}
          >
              <FiDelete className='w-8 h-6' />
          </Button>
      ) : null}
    </div>
  )
}
