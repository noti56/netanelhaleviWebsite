import { useState, useEffect } from "react";

interface size {
  width: number;
  height: number;
}
type Screen = "desktop" | "mobile";
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Screen>("desktop");
  useEffect(() => {
    function handleResize() {
      setWindowSize(
        configureScreen({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    }

    const configureScreen = ({ height, width }: size): Screen => {
      if (height < 900 && width < 600) return "mobile";
      return "desktop";
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
