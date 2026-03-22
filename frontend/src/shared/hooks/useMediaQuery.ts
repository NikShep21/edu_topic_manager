import { BREAKPOINTS } from "@/shared/config/breakpoints";
import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.laptop;
  const isLaptop = width >= BREAKPOINTS.laptop;

  return {
    width,
    isMobile,
    isTablet,
    isLaptop,
  };
};
