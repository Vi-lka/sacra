"use client";

import React from "react";
import { Button, Modal, ModalContent, Tooltip, cn, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

export default function Open3DModel({
    embededHTML,
    className
}: {
    embededHTML: string | null,
    className?: string,
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    if (!embededHTML) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", delay: 0.5 }}
            >
                <Tooltip 
                    content="3D"
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
                        isDisabled={embededHTML.length === 0}
                        variant="light"
                        className="mt-1 font-medium text-xs hover:scale-110" 
                        onPress={onOpen} 
                    >
                        <Box />
                    </Button>
                </Tooltip>
            </motion.div>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
                classNames={{
                    closeButton: "z-[1000] lg:block hidden text-foreground bg-background hover:bg-background hover:scale-125 transition-all"
                }}
            >
                <ModalContent className="bg-secondary h-[85vh] max-w-[90vw] overflow-hidden p-0">
                      <div className={cn(
                        "w-full h-full overflow-hidden",
                        className
                      )} dangerouslySetInnerHTML={{__html: embededHTML}}></div>
                </ModalContent>
            </Modal>
        </>
    );
}
