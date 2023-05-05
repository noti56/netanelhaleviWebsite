import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Euler, Group, MathUtils, Mesh, Quaternion, Vector3 } from "three";
import { Html, useAnimations, useFBX, useGLTF } from "@react-three/drei";

import { Vector3 as R3fVector3, useFrame, useThree } from "@react-three/fiber";
import useHeadMouse, { getMouseDegrees, moveJoint } from "@/hooks/UseHeadMouse";
import { clamp, degToRad } from "three/src/math/MathUtils";
import useAnimationAction from "@/hooks/useAnimationAction";
import { useWindowSize } from "@/hooks/useWindowSize";

interface props {
  position: R3fVector3;
}
const Model = ({ position }: props) => {
  const screenType = useWindowSize();

  const character = useFBX(`nati.fbx`);
  const [mouseX, setmousePosX] = useState<number>(0);
  const [mouseY, setmousePosY] = useState<number>(0);
  const ref = useRef<Group>() as React.MutableRefObject<Group>;

  const { camera, mouse } = useThree();
  const vec = new Vector3();

  useEffect(() => {
    if (screenType == "desktop") {
      document.addEventListener("mousemove", getMouseMovement);
    }
    return () => {
      document.removeEventListener("mousemove", getMouseMovement);
    };
  }, [ref, screenType]);

  const getMouseMovement = (mouseEvent: MouseEvent) => {
    const mouseX = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(mouseEvent.clientY / window.innerHeight) * 2 + 1;

    setmousePosY(mouseY);
    setmousePosX(mouseX);
  };

  // useFrame(() => {
  //   // Access head bone of character model
  //   const headBone = ref.current.getObjectByName("mixamorigHead");

  //   // Get mouse coordinates
  //   if ((!mouseX && mouseX !== 0) || (!mouseY && mouseY !== 0)) return;
  //   // Convert mouse coordinates to 3D world coordinates
  //   const mouseVector = new Vector3(
  //     mouseX / window.innerWidth,
  //     -(mouseY / window.innerHeight),
  //     1.5
  //   );
  //   mouseVector.unproject(camera);
  //   console.log(mouseVector);

  //   // Update head bone position to follow mouse movement
  //   const targetQuaternion = new Quaternion().setFromEuler(
  //     new Euler(
  //       Math.atan2(mouseVector.x, mouseVector.z),
  //       Math.atan2(mouseVector.y, mouseVector.z),
  //       0
  //     )
  //   );

  //   // Smoothly interpolate between current and target rotation
  //   // headBone?.quaternion.slerp(targetQuaternion, 0.8);

  //   headBone?.lookAt(mouseVector);
  // });
  const idle = useAnimationAction(ref, "Neutral Idle.fbx");
  const animation = idle["mixamo.com"];
  useEffect(() => {
    if (!animation) return;
    animation?.fadeIn(0.3);
    animation?.play();
  }, [animation, idle]);

  useFrame(({ mouse, viewport }) => {
    const headBone = ref.current.getObjectByName("mixamorigHead");
    if (!headBone) return;
    const x = clamp((mouseX * viewport.width) / 2.5, -5, 5);
    const y = clamp((mouseY * viewport.height) / 2.5, 2, 5);

    headBone.rotateX(-mouseY * 0.2);

    headBone.rotateY(mouseX);

    // ref.current.rotateX(y);
  });

  return (
    <Suspense>
      <group ref={ref} scale={0.02} position={position}>
        <primitive object={character} dispose={null} />
      </group>
    </Suspense>
  );
};

export default Model;
