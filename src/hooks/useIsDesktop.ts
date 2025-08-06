// hooks/useIsDesktop.ts
import { useEffect, useState } from "react";

export function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      const match = window.matchMedia(`(min-width: ${minWidth}px)`);
      setIsDesktop(match.matches);
    };

    checkMediaQuery();

    // 可选：监听窗口变化，响应式更新
    window.addEventListener("resize", checkMediaQuery);
    return () => window.removeEventListener("resize", checkMediaQuery);
  }, [minWidth]);

  return isDesktop;
}
