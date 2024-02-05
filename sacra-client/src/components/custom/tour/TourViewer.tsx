/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React from 'react'
import type { ViewerAPI } from 'react-photo-sphere-viewer';
import { ReactPhotoSphereViewer, GalleryPlugin, MarkersPlugin, VirtualTourPlugin } from 'react-photo-sphere-viewer';

export type Link = {
    nodeId: string, 
    position: { textureX: number, textureY: number },
    markerStyle: {
        size: { width: number, height: number },
        className: string
    },
}
export type Node = {
    id: string,
    panorama: string,
    thumbnail: string,
    name: string,
    caption: string,
    links: Link[],
}
export type Data = {
    nodes: Node[],
    startNode: string,
}

export default function TourViewer({
    data,
    debug
}: {
    data: Data
    debug: string | undefined
}) {
    const pSRef = React.createRef<ViewerAPI>();

    const handleReady = (instance: any) => {
        const virtualTour: any = instance.getPlugin(VirtualTourPlugin);
        if (!virtualTour) return;

        // const markerLighthouse: any = {
        //     id: "marker-1",
        //     image: "/images/image-placeholder-sacra.png",
        //     tooltip: "Cape Florida Light, Key Biscayne",
        //     size: { width: 32, height: 32 },
        //     anchor: "bottom center",
        //     position: {
        //         textureX: 1500,
        //         textureY: 780,
        //     }
        // };

        (virtualTour as VirtualTourPlugin).setNodes(
            data.nodes,
            data.startNode,
        );
    };

    return (
        <div id={"container-tour"} className='h-full w-full'>
            <ReactPhotoSphereViewer 
                ref={pSRef}
                src="/images/A_black_image.jpg" // placeholder
                // touchmoveTwoFingers={true}
                loadingImg="/images/logo-icon.png"
                loadingTxt='Загрузка...'
                width={"100%"}
                height={'85vh'}
                littlePlanet={false}
                plugins={[
                    MarkersPlugin,
                    [
                      GalleryPlugin,
                      {
                        thumbnailSize: { width: 100, height: 100 },
                      },
                    ],
                    [
                      VirtualTourPlugin,
                      {
                        renderMode: "markers",
                      },
                    ],
                ]}
                container={"container-tour"}
                onReady={handleReady}
                onClick={(event) => {
                    if (debug === "1") {
                        console.log(event.data)
                    }
                }} 
            />
        </div>
    )
}
