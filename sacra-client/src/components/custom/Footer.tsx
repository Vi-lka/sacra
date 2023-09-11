import Link from 'next/link'
import React from 'react'
import LogoSvg from './LogoSvg'

export default function Footer() {
  return (
    <div className="font-Inter text-graphite w-full px-4 py-8 md:px-0 bg-[#01041D]">
        <div className="mx-auto flex w-[95%] max-w-[2200px] items-center justify-between md:w-[85%]">
            <div className="flex w-1/5">
                <Link
                  href={`/`}
                  className="relative flex items-center h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
                >
                    <LogoSvg />
                </Link>
            </div>
        </div>

        <div className='mx-auto flex w-[95%] max-w-[2200px] items-center justify-between md:w-[85%]'>
            <div className="font-normal text-sm">
                <p>8 999 999 99 99</p>
                <p>sacra@mail.com</p>
            </div>
            <div className="">
                <p className="font-normal md:text-sm text-[9px] md:text-left text-right">© 2023 Сакральное Пространтсво Енисейской Сибири</p>
            </div>
        </div>
    </div>
  )
}
