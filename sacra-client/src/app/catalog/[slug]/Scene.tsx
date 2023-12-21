"use client";

import React, { Suspense } from "react";
import { CameraControls, Center, Environment, Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Spinner } from "@nextui-org/react";

type Scene = {
  fileSrc: string;
  environmentPreset?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse"
    | undefined;
};

export default function Scene(props: Scene) {
  return (
    <div className="z-10 h-full flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center">
            <Spinner className="mx-auto h-12 w-12" />
            <p>Загрузка...</p>
          </div>
        }
      >
        <Canvas>
          {/* <Bounds fit clip damping={6} margin={1.2}> */}
          <Center>
            <Gltf src={props.fileSrc} receiveShadow castShadow />
          </Center>
          {/* </Bounds> */}

          <CameraControls />
          <Environment preset={props.environmentPreset} blur={1} />
        </Canvas>
      </Suspense>
    </div>
  );
}
