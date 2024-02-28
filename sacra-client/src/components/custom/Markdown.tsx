/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw"
import { getShortDescription } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ImageComponent from './ui/ImageComponent'

export default function Markdown({
  data,
}: {
  data?: string | null;
}) {

  const [more, setMore] = React.useState(false);

  const maxLength = 140;

  if (!!!data || data.length <= 1) return null;

  const MarkdownComponents: object = {
    p: (paragraph: { children?: boolean; node?: any}) => {
        const { node } = paragraph
      
        if (node.children[0].tagName === "img") {
          const image = node.children[0]
          const metastring = image.properties.alt
          const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
          const metaWidth = metastring.match(/{([^}]+)x/)
          const metaHeight = metastring.match(/x([^}]+)}/)
          const width = metaWidth ? metaWidth[1] : "768"
          const height = metaHeight ? metaHeight[1] : "432"
          const isPriority = metastring?.toLowerCase().match('{priority}')
          const hasCaption = metastring?.toLowerCase().includes('{caption:')
          const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

          console.log(image)
      
          return (
            <div className="lg:max-w-lg max-w-xs mx-auto">
                <ImageComponent
                  src={image.properties.src}
                  fill={false}
                  width={width <= 768 ? width : 450}
                  height={height <= 432 ? height : 450}
                  className="aspect-[5/4] object-contain w-full overflow-hidden rounded-md"
                  alt={alt}
                  priority={isPriority}
                />
                {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
            </div>
          )
        }
        return <p>{paragraph.children}</p>
    },
  }
  
  return (
    <article className="prose prose-sm prose-headings:text-foreground prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-a:text-primary max-w-none w-full">
      <ReactMarkdown 
        className="!text-foreground whitespace-pre-wrap mt-3 text-sm transition-all duration-300 ease-in-out max-h-fit"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownComponents}
      >
        {more ? data : getShortDescription(data, maxLength)}
      </ReactMarkdown>
      {data.split(" ").length > maxLength ? (
        <div
          className="!text-foreground mt-3 flex cursor-pointer items-center gap-1 text-xs uppercase hover:underline"
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
    </article>
  )
}
