"use client";

import React, { Suspense } from "react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import Loading from "@/components/custom/Loading";

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
                <Button 
                    isIconOnly
                    variant="bordered"
                    className="mt-1 font-medium text-xs border-accent hover:scale-110" 
                    onPress={onOpen} 
                >
                    <p>Тур</p>
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
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </ModalContent>
            </Modal>
        </>
    );
}
