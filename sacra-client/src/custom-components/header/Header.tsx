import Link from 'next/link'
import React from 'react'
import LogoSvg from '../LogoSvg'
import { ClientHydration } from '../ui/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import NavMenu from './NavMenu'
import NavSheet from './NavSheet'

export default function Header() {
  return (
    <div className="font-Inter text-graphite w-full px-4 py-8 md:px-0">
        <div className="mx-auto flex w-[95%] max-w-[2200px] items-center justify-between md:w-[85%]">
            <div className="flex w-1/5">
                <Link
                  href={`/`}
                  className="relative flex items-center h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
                >
                    <LogoSvg />
                </Link>
            </div>
            {/* Desktop */}
            <div className="hidden w-fit lg:block">
              <ClientHydration fallback={
                <div className="flex gap-6">
                  <Skeleton className="w-[6.5rem] p-4"/>
                  <Skeleton className="w-[6.5rem] p-4"/>
                  <Skeleton className="w-[6.5rem] p-4"/>
                  <Skeleton className="w-[6.5rem] p-4"/>
                  <Skeleton className="w-[6.5rem] p-4"/>
                </div>
              }>
                <NavMenu />
              </ClientHydration>
            </div>

            {/* Mobile */}
            <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3 lg:hidden">
                <div className="block pl-2">
                    <ClientHydration fallback={
                      <Skeleton className="h-[2.5rem] w-[2.5rem]"/>
                    }>
                        <NavSheet />
                    </ClientHydration>
                </div>
            </div>
        </div>
    </div>
  )
}
