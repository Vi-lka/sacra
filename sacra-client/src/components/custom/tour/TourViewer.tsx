/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React, { useEffect } from 'react'
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin"
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin"

import "@photo-sphere-viewer/core/index.css"
import "@photo-sphere-viewer/markers-plugin/index.css"
import "@photo-sphere-viewer/virtual-tour-plugin/index.css"

export type Link = {
    nodeId: string, 
    position: { textureX: number, textureY: number },
    markerStyle: {
        size: { width: number, height: number },
        className: string
    },
}

// type PanoData = {
//     isEquirectangular: true;
//     fullWidth: number;
//     fullHeight: number;
//     croppedWidth: number;
//     croppedHeight: number;
//     croppedX: number;
//     croppedY: number;
//     poseHeading?: number;
//     posePitch?: number;
// };

export type Node = {
    id: string,
    panorama: string,
    thumbnail: string,
    name: string,
    caption: string,
    links: Link[],
    // panoData?: PanoData,
}
export type Data = {
    nodes: Node[],
    startNode: string,
}

export default function TourViewer({
    data,
    debug,
}: {
    data: Data,
    debug: string | undefined,
}) {

    const viewerRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const viewer = new Viewer({
            container: viewerRef.current!,
            panorama: '/images/A_black_image.jpg',
            loadingImg: "/images/logo-icon.png",
            loadingTxt: 'Загрузка...',
            navbar: [
                'zoom',
                'move',
                'description',
                'caption',
                'fullscreen',
            ],
            plugins: [
                MarkersPlugin,
                [
                    VirtualTourPlugin,
                    {
                      renderMode: "markers",
                      transitionOptions: {
                          speed: 600,
                          fadeIn: true,
                          rotation: false,
                      }
                    },
                ],
            ],
        });

        const handleReady = (instance: any) => {
            const virtualTour: VirtualTourPlugin = instance.getPlugin(VirtualTourPlugin);
            if (!virtualTour) return;
    
            virtualTour.setNodes(
                data.nodes,
                data.startNode,
            );
    
            // virtualTour.addEventListener('node-changed', ({ node }) => {
            //     if ((node.panoData as PanoData).poseHeading !== undefined && (node.panoData as PanoData).posePitch !== undefined) {
            //         viewer.animate({
            //             yaw: (node.panoData as PanoData).poseHeading,
            //             pitch: (node.panoData as PanoData).posePitch,
            //             speed: 600,
            //         })
            //     }
            // });
        };

        viewer.addEventListener("ready", () => {
            handleReady(viewer)
        }, { once: true })

        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        viewer.addEventListener("click", (event: any & {
            type: "click";
        },) => {
            if (debug === "1") {
                console.log("Marker: ", {
                    textureX: event.data.textureX, 
                    textureY: event.data.textureY,
                })
                console.log("Camera Position: ", viewer.getPosition())
            }
        })
    }, [data, debug, viewerRef])

    return (
        <div
            id={"container-tour"} 
            className='h-full w-full'
        >
            <div ref={viewerRef} className=' w-full h-[85vh]'></div>
        </div>
    )
}
