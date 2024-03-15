import Link from 'next/link';
import { Link as LinkIcon } from "lucide-react"
import React from 'react'

export default function LinkComp({
    name,
    url
}: {
    name: string;
    url: string
}) {

    return (
        <Link
            href={url}
            target='__blank'
            className='flex items-center gap-3 font-semibold lg:text-lg text-base underline underline-offset-4 hover:text-primary transition-all duration-300'
        >
           <LinkIcon />
           {name}
        </Link>
    )
}
