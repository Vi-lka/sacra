import GoBack from '@/components/custom/ui/GoBack'
import React from 'react'

export default function PublicationSingle({
    params: { id }
}: {
    params: { id: string },
}) {
    
    return (
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
            <GoBack />
            <div className='my-6 min-h-[350px]'>
                {id}
            </div>
        </div>
    )
}
