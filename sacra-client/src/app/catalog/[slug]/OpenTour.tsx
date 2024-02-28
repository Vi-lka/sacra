"use client";

import React, { Suspense } from "react";
import { Button, Modal, ModalContent, Tooltip, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import Loading from "@/components/custom/Loading";
import Image from "next/image"

export default function OpenTour({
    children,
}: {
    children: React.ReactNode,
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
            >
                <Tooltip 
                    content="Тур"
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
                        <Image 
                            src="/images/tour.svg" 
                            alt="Tour"
                            width={32}
                            height={32}
                        />
                    </Button>
                </Tooltip>
            </motion.div>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
                classNames={{
                    closeButton: "z-50 text-xl text-background hover:bg-transparent hover:scale-125 transition-all"
                }}
            >
                <ModalContent className="bg-secondary h-[85vh] max-w-[90vw] overflow-hidden p-0">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </ModalContent>
            </Modal>
        </>
    );
}
