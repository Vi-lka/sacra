"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw"
import { getShortDescription } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Markdown({
  data,
}: {
  data?: string | null;
}) {

  const [more, setMore] = React.useState(false);

  const maxLength = 140;

  if (!!!data || data.length <= 1) return null;
  
  return (
    <>
      <ReactMarkdown 
        className="whitespace-pre-wrap mt-3 overflow-hidden text-sm transition-all duration-300 ease-in-out max-h-fit"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {more ? data : getShortDescription(data, maxLength)}
      </ReactMarkdown>
      {data.split(" ").length > maxLength ? (
        <div
          className="mt-3 flex cursor-pointer items-center gap-1 text-xs uppercase hover:underline"
          onClick={() => setMore((value) => !value)}
        >
          {more ? (
            <>
              <p>Свернуть</p>
              <ChevronUp className="h-6 w-6 stroke-1" />
            </>
          ) : (
            <>
              <p>Читать далее</p>
              <ChevronDown className="h-6 w-6 stroke-1" />
            </>
          )}
        </div>
      ) : null}
    </>
  )
}
