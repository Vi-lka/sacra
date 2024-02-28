"use client";

import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ImageComponent from "../ImageComponent";
import { Button, Modal, ModalContent, Tooltip, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Maximize } from "lucide-react";

export default function PhotoZoom({
  alt,
  src,
}: {
  alt: string;
  src: string | undefined;
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "tween", delay: 0.2 }}
            >
              <Tooltip 
                content="Фотография"
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
                    className="mt-1 font-medium text-xs hover:scale-110" 
                    onPress={onOpen}
                >
                  <Maximize />
                </Button>
              </Tooltip>
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
