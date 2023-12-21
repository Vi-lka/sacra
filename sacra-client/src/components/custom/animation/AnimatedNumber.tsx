"use client"

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import React from 'react'

export default function AnimatedNumber({ 
    number,
    className,
    children,
}: { 
    number: number,
    className?: string,
    children?: React.ReactNode
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true })

    React.useEffect(() => {
        if (isInView) {
            const animation = animate(count, number, { duration: 1, delay: 0.2 });
            return animation.stop;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])
  
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: "tween" }}
        >
            <motion.h1 ref={ref} className={className}>
                {rounded}
            </motion.h1>
            {children}
        </motion.div>
    );
}
