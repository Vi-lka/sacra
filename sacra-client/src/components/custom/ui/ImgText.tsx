"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ImageComponent from "./ImageComponent";

type Props = {
  title: string | null;
  width: number;
  height: number;
  url: string;
  src: string | undefined;
  className?: string;
  children?: React.ReactNode;
}

export default function ImgText(props: Props) {

  return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, type: "tween" }}
        className="flex flex-col gap-3 h-fit"
      >
        <Link
          href={props.url}
          className={cn(
            "bg-beaverLight ring-ring ring-offset-background flex min-h-full w-full overflow-hidden rounded-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.04] hover:ring-2 hover:ring-offset-4",
            props.className,
          )}
        >
          <motion.div
            initial={{ scale: 0.6, y: -120 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="btn-shine relative flex w-full"
          >
            <ImageComponent
              src={props.src}
              width={props.width ? props.width : 320}
              height={props.height ? props.height : 320}
              fill={false}
              priority={true}
              className={"w-full object-cover"}
              alt={props.title ? props.title : ""}
            />
            <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-10" />
          </motion.div>
        </Link>
        
        {props.children}
    </motion.div>
  );
}
