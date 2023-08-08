"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiLoader } from 'react-icons/fi';

export default function PaginationControls({ 
    length,
    defaultPageSize,
}: { 
    length: number,
    defaultPageSize: number,
}) {

  const [isPendingMore, startTransitionMore] = React.useTransition()
  const [isPendingPage, startTransitionPage] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const page = searchParams.get('page') ?? '1'
  const per = searchParams.get('per') ?? defaultPageSize

  const [pageInput, setPageInput] = React.useState(page)

  React.useEffect(() => {
    setPageInput(page)
  }, [page])
  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (Number(event.target.value) > max_page) {

      setPageInput(max_page.toString())
    
    } else if (!event.target.value) {

      setPageInput(event.target.value)

    } else if (Number(event.target.value) < 1) {
      
      setPageInput('1')
    
    } else setPageInput(event.target.value)
  }

  const max_page = Math.ceil(length / Number(per))

  const handlePageParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("page", value);
        startTransitionPage(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      } else {
        params.delete("page");
      }
    },
    [pathname, router],
  );

  const handlePageSizeParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("per", value);
        startTransitionMore(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete("per");
      }
    },
    [pathname, router],
  );

  return (
    <div className='flex lg:gap-0 gap-12 lg:items-start items-center lg:flex-row flex-col lg:justify-end relative'>
        <Button
          className="px-10 py-6 uppercase lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          variant={(Number(page) >= max_page) ? "hidden" : "default"}
          disabled={isPendingPage || isPendingMore}
          onClick={() => handlePageSizeParams((Number(per) + defaultPageSize).toString())}
        >
          <span className="sr-only">Показать ещё</span>
          {isPendingMore ? <FiLoader className='animate-spin' /> : "Показать ещё"}
        </Button>

        <div className='flex items-center lg:flex-row flex-col-reverse lg:gap-6 gap-3' style={{ display: Number(per) >= length ? 'none' : 'flex'}}>

            <p className='font-Inter flex items-center'>
                {isPendingPage ? 
                  <FiLoader className='animate-spin' /> 
                  : 
                  (
                    <>
                      Страница
                      <Input 
                        className='w-14 mx-2 font-Inter font-normal text-base'
                        type="number" 
                        value={pageInput} 
                        onChange={handleChangeInput}
                        onKeyDownCapture={event => {
                          if (event.key === 'Enter') {
                            handlePageParams(pageInput)
                          }
                        }}
                        onBlurCapture={() => handlePageParams(pageInput)}
                      />
                      из {max_page}
                    </>
                  )}
            </p>

            <div className="flex items-center space-x-2">
                {/* FIRST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams('1')}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=1&per=${per}`} className="hidden">Перейти на первую страницу</Link>
                  <span className="sr-only">Перейти на первую страницу</span>
                  <FiChevronsLeft className="h-4 w-4" />
                </Button>

                {/* PREVIOUS */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) - 1).toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${Number(page) - 1}&per=${per}`} className="hidden">Перейти на предыдущую страницу</Link>
                  <span className="sr-only">Перейти на предыдущую страницу</span>
                  <FiChevronLeft className="h-4 w-4" />
                </Button>

                {/* NEXT */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) + 1).toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${Number(page) + 1}&per=${per}`} className='hidden'>Перейти на следующую страницу</Link>
                  <span className="sr-only">Перейти на следующую страницу</span>
                  <FiChevronRight className="h-4 w-4" />
                </Button>

                {/* LAST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams(max_page.toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${max_page}&per=${per}`} className='hidden'>Перейти на последнюю страницу</Link>
                  <span className="sr-only">Перейти на последнюю страницу</span>
                  <FiChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  )
}
