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
        transition={{ duration: 0.3, type: "tween", delay: 0.1 }}
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
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
            className="btn-shine relative flex w-full"
          >
            <ImageComponent
              src={props.src}
              width={props.width ? props.width : 320}
              height={props.height ? props.height : 320}
              fill={false}
              priority={true}
              className={"min-h-full my-auto object-cover "}
              alt={props.title ? props.title : ""}
            />
            <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-10" />
          </motion.div>
        </Link>
        
        {props.children}
    </motion.div>
  );
}
