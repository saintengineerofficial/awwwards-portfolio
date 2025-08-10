export type State = {
  currentY: number;
  targetY: number;
  lastY: number;
  scrollVelocity: number;
  isDragging: boolean;
  startY: number;
  projects: Map<number, HTMLElement>;
  parallaxImages: Map<number, { update: (scroll: number) => void; updateBound: () => void }>;
  projectHeight: number;
  isSnapping: boolean;
  snapStartTime: number;
  snapStartY: number;
  snapTargetY: number;
  lastScrollTime: number;
  isScrolling: boolean;
};

export type Project = {
  title: string;
  image: string;
  isAlternate: boolean;
};
