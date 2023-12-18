"use client"

import React from 'react'
import { motion, useAnimation, useInView } from "framer-motion";
import SacraSvg from '../svg/SacraSvg'
import LinesSvg from '../svg/LinesSvg'
import { AnimatedText } from './animation/AnimatedText';

export default function Hero() {
    const controls = useAnimation();
    const ref = React.useRef(null)
    const isInView = useInView(ref)

    React.useEffect(() => {
        if (isInView) {
          void controls.start("visible");
        }
      }, [controls, isInView]);

    const titleAnimations = {
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.05,
          },
        },
    };

    const subTitleAnimations = {
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.15,
            delay: 2.2
          },
        },
    };

    return (
        <div className='flex relative h-max min-h-screen'>
            <SacraSvg className='w-1/3 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            <LinesSvg className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
            <div className="z-10 flex flex-col gap-1 w-[90%] 2xl:mt-[40vh] xl:mt-[35vh] md:mt-[20vh] mt-[25vh] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AnimatedText
                  el="h1"
                  text={"Сакральное Пространство Енисейской Сибири"}
                  className='xl:text-2xl md:text-xl text-base font-bold uppercase drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)]'
                  animation={titleAnimations}
                  staggerChildren={0.02}
                  delay={1.2}
                />
                <motion.p 
                    ref={ref}
                    animate={controls}
                    initial="hidden"
                    variants={subTitleAnimations}
                    className="2xl:text-base md:text-sm text-xs drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] lg:w-[70%] mx-auto"
                >
                    Виртуальный путеводитель по сакральным местам Красноярского края, Республики Тывы и Республики Хакасии.
                </motion.p>
            </div>
        </div>
    )
}
