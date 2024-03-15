import { File } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function FileComp({
    name,
    file
}: {
    name: string;
    file: {
        data?: {
            attributes: {
                url: string;
            };
        } | null | undefined;
    }
}) {

    if (!file.data) return null

    return (
        <Link
            href={file.data.attributes.url}
            target='__blank'
            className='flex items-center gap-3 font-semibold lg:text-lg text-base underline underline-offset-4 hover:text-primary transition-all duration-300'
        >
           <File/> 
           {name}
        </Link>
    )
}
