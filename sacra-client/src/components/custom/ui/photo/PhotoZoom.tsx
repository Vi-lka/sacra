"use client";

import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ImageComponent from "../ImageComponent";
import { cn } from "@/lib/utils";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function PhotoZoom({
  alt,
  src,
}: {
  alt: string;
  src: string | undefined;
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = React.useState(true);

    return (
        <>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "tween", delay: 0.2 }}
              className="max-h-fit w-full cursor-pointer" 
              onClick={onOpen}
            >
                <ImageComponent
                  src={src}
                  fill={false}
                  width={600}
                  height={600}
                  className={cn(
                    "mx-auto max-h-[70vh] overflow-hidden rounded-md object-contain",
                    loading ? "" : "h-auto w-auto",
                  )}
                  alt={alt}
                  priority={true}
                  onLoad={() => setLoading(false)}
                />
            </motion.div>
            <Modal 
              isOpen={isOpen} 
              onOpenChange={onOpenChange}
              placement="center"
              classNames={{
                closeButton: "z-50 text-foreground bg-background hover:bg-background hover:scale-125 transition-all"
              }}
            >
              <ModalContent className="bg-secondary h-[85vh] max-w-[90vw] overflow-hidden p-0">
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
                        src={src}
                        fill
                        sizes={`100vw`}
                        quality={100}
                        className="object-contain"
                        alt={alt}
                      />
                    </div>
                  </TransformComponent>
                </TransformWrapper>
              </ModalContent>
            </Modal>
        </>
    );
}
