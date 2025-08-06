"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import PreLoading from "./PreLoading";

const ProgressGuard = ({ children }: { children: React.ReactNode }) => {
  const { progress } = useProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setReady(true), 500); // 给点缓冲时间
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!ready) {
    return <PreLoading progress={progress} />;
  }

  return children;
};

export default ProgressGuard;
