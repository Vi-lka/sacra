"use client"

import Markdown from '@/components/custom/Markdown'
import MarkerIcon from '@/components/custom/map/MarkerIcon'
import type { ObjectBySlug } from '@/lib/schemas/strapi-schemas'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

export default function Info({
    object,
    className
}: {
    object: ObjectBySlug,
    className?: string,
}) {

    const region = !!object.region.data ? object.region.data.attributes.title + ", " : ""
    const district = !!object.district.data ? object.district.data.attributes.title + ", " : ""
    const city = !!object.city.data ? object.city.data.attributes.title + ", " : ""
    const location = !!object.location ? object.location : ""

    const locationFull = region + district + city + location

    return (
        <div className={cn(
            "mt-1",
            className,
        )}>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", delay: 0.1 }}
                className="flex items-center gap-1.5 font-bold md:mb-3 mb-6 lg:text-lg text-base"
            >
                {object.confession.data?.attributes.title}
            </motion.p>
            {locationFull.length > 0
                ? (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, type: "tween", delay: 0.3 }}
                        className="flex items-center gap-1.5 font-semibold mb-8 lg:text-base text-sm"
                    >
                        <MarkerIcon className="w-4 h-4" /> 
                        <span>{locationFull}</span>
                    </motion.p>
                )
                : null
            }
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", delay: 0.5 }}
                className="w-fit"
            >
                <Markdown data={object.historicalNote}/>
            </motion.div>
        </div>
    )
}
