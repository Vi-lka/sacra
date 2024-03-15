"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight, Maximize } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Button, Modal, ModalContent, Skeleton, Tooltip, useDisclosure } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import ImageComponent from "../ImageComponent";

export default function PhotoModal({
  data,
  className
}: {
  data: {
    attributes: {
        url: string;
    };
  }[];
  className?: string
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [created, setCreated] = React.useState<boolean>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: false,
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
    <>
      <Tooltip 
        content="Фотографии"
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
          variant="light" 
          onPress={onOpen}
          className={cn("mt-1 font-medium text-xs hover:scale-110", className)}
        >
          <Maximize className="drop-shadow-md" />
        </Button>
      </Tooltip>
      <Modal 
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange()
          setCurrentSlide(0)
        }}
        placement="center"
        classNames={{
          closeButton: "z-50 text-foreground bg-background hover:bg-background hover:scale-125 transition-all"
        }}
      >
        <ModalContent className="bg-secondary h-[85vh] max-w-[90vw] overflow-hidden p-0">
          <div
            ref={sliderRef}
            className="keen-slider bg-secondary h-full w-full cursor-grab rounded-md"
          >
            {data.map((image, index) => (
              <div
                key={index}
                className="keen-slider__slide zoom-out__slide"
                onClick={(e) => e.stopPropagation()}
              >
                {created ? (
                  <TransformWrapper>
                    <TransformComponent
                      contentStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "85vh",
                        width: "90vw",
                      }}
                    >
                      <div className="relative h-full w-full">
                        <ImageComponent
                          src={image.attributes.url}
                          fill
                          sizes="100vw"
                          quality={100}
                          className="object-contain"
                          alt={image.attributes.url}
                        />
                      </div>
                    </TransformComponent>
                  </TransformWrapper>
                ) : (
                  <Skeleton className="h-full w-full" />
                )}
              </div>
            ))}
          </div>
          {created && !!instanceRef.current ? (
            data.length > 1 ? (
              <>
                <div className="bg-secondary absolute bottom-0 flex h-fit w-full items-center gap-6 bg-opacity-20">
                  <div className="flex flex-auto gap-2">
                    {data.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => instanceRef.current?.moveToIdx(index)}
                        className="mx-1 flex-auto py-2"
                      >
                        <div
                          className={cn(
                            "h-0.5 w-full transition-all",
                            currentSlide === index ? "bg-accent" : "bg-background",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <ArrowLeft
                  className="text-foreground bg-background absolute bottom-6 left-2 h-8 w-8 cursor-pointer rounded-md bg-opacity-20 transition-all hover:scale-125 md:top-1/2 md:translate-y-1/2"
                  onClick={() => instanceRef.current?.prev()}
                />
                <ArrowRight
                  className="text-foreground bg-background absolute bottom-6 right-2 h-8 w-8 cursor-pointer rounded-md bg-opacity-20 transition-all hover:scale-125 md:top-1/2 md:translate-y-1/2"
                  onClick={() => instanceRef.current?.next()}
                />
              </>
            ) : null
          ) : (
            <Skeleton className="mt-6 h-3 w-full" />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
