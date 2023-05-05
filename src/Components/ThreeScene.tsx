import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

const ThreeScene = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight />
      {/* <OrbitControls position={[0, 0, 0]} /> */}

      <Model position={[0, 0, 0]} />
    </Canvas>
  );
};

export default ThreeScene;
