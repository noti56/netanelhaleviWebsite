import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { AnimationMixer, MathUtils } from "three";
import { degToRad } from "three/src/math/MathUtils";
// import { EReadyPlayerMeNode } from "../../types/ReadyPlayerMeNode.interace";

const useHeadMouse = (readyPlayerMeNode: any) => {
  console.log(readyPlayerMeNode);

  console.log(readyPlayerMeNode);

  let toStop = false;
  let hasRanOnce = false;
  const [mixer] = useState(() => new AnimationMixer(readyPlayerMeNode));

  const { size } = useThree();
  useFrame((state, delta) => {
    if (toStop || !readyPlayerMeNode) return;

    const mouse = {
      x: size.width / 2 + (state.mouse.x * size.width) / 2,
      y: size.height / 2 + (-state.mouse.y * size.height) / 2,
    };
    mixer.update(delta);
    moveJoint(getMouseDegrees(mouse.x, mouse.y, 40), readyPlayerMeNode["Neck"]);
    moveJoint(getMouseDegrees(mouse.x, mouse.y, 40), readyPlayerMeNode["Spine"]);
  });
};
export default useHeadMouse;

export function getMouseDegrees(
  x: number,
  y: number,
  degreeLimit: number
): { x: number; y: number } {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }

  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

export function moveJoint(degrees: { x: number; y: number }, joint: any) {
  console.log(joint);
  joint.rotation.xD = MathUtils.lerp(joint.rotation.xD || 0, degrees.y, 0.1);
  joint.rotation.yD = MathUtils.lerp(joint.rotation.yD || 0, degrees.x, 0.1);
  joint.rotation.x = degToRad(joint.rotation.xD);
  joint.rotation.y = degToRad(joint.rotation.yD);
}
