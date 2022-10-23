import { useEffect, useState } from "react";

export default function ScreenSize() {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {

    setTimeout(() => {
      detectHW({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    }, 3000);

  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return { With: windowDimenion.winWidth, Height: windowDimenion.winHeight };
}

