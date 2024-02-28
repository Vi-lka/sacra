import type { Data, Link, Node } from '@/components/custom/tour/TourViewer';
import TourViewer from '@/components/custom/tour/TourViewer';
import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import { getTour } from '@/lib/queries/strapi-server';
import React from 'react'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default async function Tour({
    id,
    searchParams,
}: {
    id: string;
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

    const nodes: Node[] = dataResult.value.nodes.data.map((node) => {
        const panorama = BASE_IMAGE_URL + node.attributes.panorama.data.attributes.url
        const thumbnail = node.attributes.thumbnail.data 
            ? BASE_IMAGE_URL + node.attributes.thumbnail.data.attributes.url
            : "/images/image-placeholder-sacra.png"

        const panoData = {
                isEquirectangular: true as const,
                fullWidth: node.attributes.panorama.data.attributes.width,
                fullHeight: node.attributes.panorama.data.attributes.height,
                croppedWidth: node.attributes.panorama.data.attributes.width,
                croppedHeight: node.attributes.panorama.data.attributes.height,
                croppedX: 0,
                croppedY: 0,
                poseHeading: node.attributes.defaultYaw ?? 0,
                posePitch: node.attributes.defaultPitch ?? 0,
            }

        return {
            id: node.id,
            panorama,
            thumbnail,
            name: "",
            caption: node.attributes.description ?? "",
            panoData,
            links: node.attributes.links.data.map((link): Link => (
                {
                    nodeId: link.attributes.toNode.data?.id ?? node.id,
                    position: link.attributes.position,
                    markerStyle: {
                        size: { width: 32, height: 32 },
                        className: ""
                    },
                }
            ))
        }
    })

    const startNode = dataResult.value.startNode.data?.id ?? dataResult.value.nodes.data[0].id

    const data: Data = { nodes, startNode }
    
    return (
        <TourViewer data={data} debug={debug} />
    )
}
