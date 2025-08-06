import React from 'react'

type Props = {
  progress: number;
}

const PreLoading = ({ progress }: Props) => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
      <p className="mb-4 text-xl tracking-widest animate-pulse">
        Loading {Math.floor(progress)}%
      </p>
      <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default PreLoading