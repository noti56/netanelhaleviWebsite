import { useAnimations, useFBX } from "@react-three/drei";
import { useState, useEffect, MutableRefObject } from "react";
import { Group, Mesh } from "three";

export const fixedUrlToassets = "assets/animations/";
const useAnimationAction = (
  mesh: MutableRefObject<Group> | MutableRefObject<Mesh>,
  animationFbxUrl: string
) => {
  const { animations } = useFBX(animationFbxUrl);
  const { actions } = useAnimations(animations, mesh);
  return actions;
};
export default useAnimationAction;