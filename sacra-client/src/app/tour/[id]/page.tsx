import type { Data } from '@/components/custom/tour/TourViewer';
import TourViewer from '@/components/custom/tour/TourViewer'
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getTour } from '@/lib/queries/strapi-server';
import React from 'react'

export default async function TourPage({
    params: { id },
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const [ dataResult ] = await Promise.allSettled([ getTour(id) ]);
    if (dataResult.status === "rejected")
    return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Tour" 
        notFound 
        goBack 
      />
    );

    const debug = searchParams['debug'] as string | undefined

    const data: Data = {
        nodes: [
            {
                id: "1",
                panorama: "/images/test_pano1.jpg",
                thumbnail: "/images/image-placeholder-sacra.png",
                name: "One",
                caption: `[1]`,
                links: [{ 
                    nodeId: "2", 
                    position: { textureX: 4234, textureY: 2622 },
                    markerStyle: {
                        size: { width: 32, height: 32 },
                        className: "animate-bounce"
                    },
                }],
                // markers: [markerLighthouse],
            },
            {
                id: "2",
                panorama: "/images/test_pano1.jpg",
                // thumbnail: baseUrl + "tour/key-biscayne-2-thumb.jpg",
                thumbnail: "/images/image-placeholder-sacra.png",
                name: "Two",
                caption: `[2]`,
                links: [{ 
                    nodeId: "1", 
                    position: { textureX: 4234, textureY: 2622 },
                    markerStyle: {
                        size: { width: 32, height: 32 },
                        className: "animate-bounce"
                    },
                }],
            },
        ],
        startNode: "1"
    }

    return (
        <div>
            <TourViewer data={data} debug={debug} />
        </div>
    )
}
