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

type PanoData = {
    isEquirectangular: true;
    fullWidth: number;
    fullHeight: number;
    croppedWidth: number;
    croppedHeight: number;
    croppedX: number;
    croppedY: number;
    poseHeading?: number;
    posePitch?: number;
};

export type Node = {
    id: string,
    panorama: string,
    thumbnail: string,
    name: string,
    caption: string,
    links: Link[],
    panoData?: PanoData,
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
    const pSRef = React.createRef<ViewerAPI>();

    const handleReady = (instance: any) => {
        const virtualTour: any = instance.getPlugin(VirtualTourPlugin);
        if (!virtualTour) return;

        (virtualTour as VirtualTourPlugin).setNodes(
            data.nodes,
            data.startNode,
        );

        (virtualTour as VirtualTourPlugin).addEventListener('node-changed', ({ node }) => {
            pSRef.current?.animate({
                yaw: (node.panoData as PanoData).poseHeading,
                pitch: (node.panoData as PanoData).posePitch,
                speed: 600,
            })
        });
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
                navbar={[
                    'zoom',
                    'move',
                    'description',
                    'caption',
                    'fullscreen',
                ]}
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
                        transitionOptions: {
                            speed: 600,
                            fadeIn: true,
                            rotation: false,
                        }
                      },
                    ],
                ]}
                container={"container-tour"}
                onReady={handleReady}
                onClick={(event) => {
                    if (debug === "1") {
                        console.log("Marker: ", {
                            textureX: event.data.textureX, 
                            textureY: event.data.textureY,
                        })
                        console.log("Camera Position: ", pSRef.current?.getPosition())
                    }
                }} 
            />
        </div>
    )
}
