"use client"

import { param  } from '@/components/custom/map/MapComponent';
import type {Properties} from '@/components/custom/map/MapComponent';
import { Button, Tooltip } from '@nextui-org/react'
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
            <Tooltip 
                content="На карте"
                placement="bottom"
                delay={0}
                closeDelay={0}
                motionProps={{
                  variants: {
                    exit: {
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        ease: "easeIn",
                      }
                    },
                    enter: {
                      opacity: 1,
                      transition: {
                        duration: 0.15,
                        ease: "easeOut",
                      }
                    },
                  },
                }}
                classNames={{
                    content: [
                      "py-2 px-4 shadow-xl",
                      "text-foreground bg-background",
                    ],
                }}
            >
                <Button 
                    isIconOnly 
                    isLoading={isPending}
                    variant="light"
                    className="mt-1 font-medium text-xs hover:scale-110" 
                    onPress={() => goToMarker()}
                >
                    <MapPinned />
                </Button>
            </Tooltip>
        </motion.div>
  )
}
