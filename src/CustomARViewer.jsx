import React, { useRef, useEffect } from "react";
import { XR, ARButton, Controllers } from "@react-three/xr";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model({ modelUrl }) {
  const group = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (!modelUrl) return;
    const loader = new GLTFLoader();
    let modelScene;
    loader.load(
      modelUrl,
      (gltf) => {
        modelScene = gltf.scene;
        group.current.add(modelScene);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
    return () => {
      if (modelScene && group.current) {
        group.current.remove(modelScene);
      }
    };
  }, [modelUrl]);

  return <group ref={group} />;
}

export default function CustomARViewer({ modelUrl }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
      <Canvas>
        <XR>
          <Controllers />
          {/* Load the model dynamically */}
          {modelUrl && <Model modelUrl={modelUrl} />}
        </XR>
        <ambientLight />
        <OrbitControls />
      </Canvas>
      {/* Custom UI example */}
      <button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 20px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: 8,
          fontWeight: 600,
        }}
        onClick={() => alert("Custom UI Action!")}
      >
        Custom Button
      </button>
    </div>
  );
}