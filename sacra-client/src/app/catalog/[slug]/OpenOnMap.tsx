"use client"

import { param  } from '@/components/custom/map/MapComponent';
import type {Properties} from '@/components/custom/map/MapComponent';
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { MapPinned } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function OpenOnMap({
    properties
}: {
    properties: Properties
}) {

    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    const goToMarker = React.useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        params.set(param, JSON.stringify(properties));
        startTransition(() => {
          router.push(`/map?${params.toString()}`, { scroll: false });
        });
    }, [properties, router]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: "tween", delay: 0.3 }}
        >
            <Button 
                isIconOnly 
                isLoading={isPending}
                variant="bordered"
                className="mt-1 font-medium text-xs border-accent hover:scale-110" 
                onPress={() => goToMarker()}
            >
                <MapPinned className='w-5 h-5' />
            </Button>
        </motion.div>
  )
}
