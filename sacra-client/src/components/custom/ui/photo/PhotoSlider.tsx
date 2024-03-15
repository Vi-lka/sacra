"use client";

import "keen-slider/keen-slider.min.css";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import PhotoSliderImg from "./PhotoSliderImg";
import { motion } from "framer-motion";
import ImageComponent from "../ImageComponent";

export default function PhotoSlider({
  data,
  children,
  className
}: {
  data: {
    attributes: {
        url: string;
    };
  }[];
  children?: React.ReactNode,
  className?: string
}) {
  const [created, setCreated] = React.useState<boolean>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    initial: 0,
    slides: {
      origin: "center",
      spacing:
        typeof window !== "undefined" && window.innerWidth <= 740 ? 3 : 6,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setCreated(true);
    },
    destroyed() {
      setCreated(false);
    },
  });

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        ref={sliderRef}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, type: "tween", delay: 0.2 }} 
        className="keen-slider bg-transparent max-h-96 cursor-grab rounded-md aspect-video 2xl:aspect-[2/1.2] 2xl:max-h-[500px]"
      >
        {data.map((image, index) => (
          <div key={index} className="keen-slider__slide zoom-out__slide">
            {created ? (
              <PhotoSliderImg src={image.attributes.url} alt={image.attributes.url} />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        ))}
      </motion.div>

      {children}

      {created && !!instanceRef.current ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, type: "tween", delay: 0.2 }} 
          className="mt-2 flex items-center gap-6"
        >
          <div className="flex flex-auto gap-3 w-fit mx-auto items-center justify-center">
            <ArrowLeft
              className="h-5 w-5 cursor-pointer transition-all hover:scale-125"
              onClick={() => instanceRef.current?.prev()}
            />
            <div className="flex flex-wrap gap-3 w-fit items-center justify-center">
              {data.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(index);
                  }}
                  className="flex rounded-md aspect-square overflow-hidden"
                >
                  <ImageComponent
                    src={image.attributes.url}
                    fill={false}
                    width={55}
                    height={55}
                    className={cn(
                      "mx-auto rounded-md object-cover aspect-square",
                      currentSlide === index ? "opacity-100" : "opacity-30",
                    )}
                    alt={"Image"}
                    priority={true}
                  />
                  {/* <div
                    className={cn(
                      "h-0.5 w-full transition-all",
                      currentSlide === index ? "bg-accent" : "bg-secondary",
                    )}
                  /> */}
                </button>
              ))}
            </div>
            <ArrowRight
              className="h-5 w-5 cursor-pointer transition-all hover:scale-125"
              onClick={() => instanceRef.current?.next()}
            />
          </div>
        </motion.div>
      ) : (
        <Skeleton className="mb-3.5 mt-3 h-7 w-full" />
      )}
    </div>
  );
}
