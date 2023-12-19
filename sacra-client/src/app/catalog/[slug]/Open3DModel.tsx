"use client";

import React from "react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Scene from "./Scene";
import { motion } from "framer-motion";

export default function Open3DModel({
    url,
}: {
    url: string | undefined
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    if (!!!url) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", delay: 0.3 }}
            >
                <Button 
                    isIconOnly 
                    isDisabled={url.length === 0} 
                    variant="bordered"
                    className="mt-1 font-medium text-xs border-accent hover:scale-110" 
                    onPress={onOpen} 
                >
                    <p>3D</p>
                </Button>
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
                    <Scene fileSrc={url} environmentPreset="warehouse" />
                </ModalContent>
            </Modal>
        </>
    );
}
