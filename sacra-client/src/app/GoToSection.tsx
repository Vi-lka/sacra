"use client"

import DotsSvg from '@/components/svg/DotsSvg'
import { Button } from '@nextui-org/react'
import { motion, useInView } from 'framer-motion'
import { Library, MapPinned } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function GoToSection() {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true })

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, type: "tween", delay: 0.6 }}
        className='flex items-center mx-auto w-[95%] max-w-[2200px] md:w-[85%] h-screen lg:mt-6 mt-32'
    >
        <section className='w-full h-full flex lg:flex-row flex-col lg:justify-around justify-center items-center lg:gap-6 gap-40 overflow-hidden'>
            <motion.div ref={ref} className='relative'>
                <Link href="/catalog" className='md:min-w-[21rem] min-w-[80%]' passHref>
                    <Button
                        variant="ghost"
                        color="primary"
                        className="
                            w-full z-10 md:min-w-[21rem] min-w-[16.5rem]
                            relative overflow-visible md:px-24 py-24 px-16
                            bg-background font-medium text-2xl rounded-2xl shadow-accent/30 shadow-inner border-none
                            hover:-translate-y-1 hover:shadow-foreground/40 hover:shadow-lg
                            after:absolute after:content-[''] after:inset-0 after:z-[-1]
                            after:bg-transparent after:rounded-2xl after:blur-sm
                            after:transition after:!duration-500
                            hover:after:scale-150 hover:after:bg-primary/90 hover:after:opacity-0
                        "
                        size="lg"
                    >
                        <Library className='lg:w-10 lg:h-10' />
                        Каталог
                    </Button>
                </Link>
                {isInView && <DotsSvg className='absolute sm:w-96 sm:h-96 w-80 h-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0' />}
            </motion.div>
            <motion.div ref={ref} className='relative'>
                <Link href="/map" className='md:min-w-[21rem] min-w-[80%]' passHref>
                    <Button
                        variant="ghost"
                        color="primary"
                        className="
                            w-full z-10 md:min-w-[21rem] min-w-[16.5rem]
                            relative overflow-visible md:px-24 py-24 px-16
                            bg-background font-medium text-2xl rounded-2xl shadow-accent/30 shadow-inner border-none
                            hover:-translate-y-1 hover:shadow-foreground/40 hover:shadow-lg
                            after:absolute after:content-[''] after:inset-0 after:z-[-1]
                            after:bg-transparent after:rounded-2xl after:blur-sm
                            after:transition after:!duration-500
                            hover:after:scale-150 hover:after:bg-primary/90 hover:after:opacity-0
                        "
                        size="lg"
                    >
                        <MapPinned className='lg:w-10 lg:h-10' />
                        Карта
                    </Button>
                </Link>
                {isInView && <DotsSvg className='absolute sm:w-96 sm:h-96 w-80 h-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0' />}
            </motion.div>
        </section>
    </motion.div>
  )
}
