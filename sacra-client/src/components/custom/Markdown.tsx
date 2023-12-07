"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw"

export default function Markdown({
  data,
}: {
  data?: string | null;
}) {
  
  return (
    <ReactMarkdown 
      className={"whitespace-pre-wrap"} 
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {data ? data : ""}
    </ReactMarkdown>
  )
}
