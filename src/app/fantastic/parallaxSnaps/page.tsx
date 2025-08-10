"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Project, State } from "./type";

const projectData: Project[] = [
  { title: "Euphoria", image: "/images/one.png", isAlternate: false },
  { title: "Scratcher", image: "/images/two.png", isAlternate: true },
  { title: "Ember", image: "/images/three.png", isAlternate: false },
  { title: "Liquid Soleil", image: "/images/four.png", isAlternate: true },
  { title: "Vacuum", image: "/images/five.png", isAlternate: false },
  { title: "Synthesis", image: "/images/six.png", isAlternate: true },
];

const config = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 13,
  CLEANUP_THRESHOLD: 50,
  MAX_VELOCITY: 120,
  SNAP_DURATION: 500,
};

const initialState: State = {
  currentY: 0,
  targetY: 0,
  lastY: 0,
  scrollVelocity: 0,
  isDragging: false,
  startY: 0,
  projects: new Map(),
  parallaxImages: new Map(),
  projectHeight: window.innerHeight,
  isSnapping: false,
  snapStartTime: 0,
  snapStartY: 0,
  snapTargetY: 0,
  lastScrollTime: Date.now(),
  isScrolling: false,
};

const ParallaxSnaps = () => {
  const stateRef = useRef({ ...initialState });
  const state = stateRef.current;
  const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor;

  const createParallaxImage = (elementImage: HTMLImageElement) => {
    let bounds: { top: number; bottom: number } | null = null;
    let currentTranslateY = 0;
    let targetTranslateY = 0;

    const updateBound = () => {
      if (elementImage) {
        const rect = elementImage.getBoundingClientRect();
        bounds = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    const update = (scroll: number) => {
      if (!bounds) return;
      const relativeScroll = -scroll - bounds.top;
      targetTranslateY = relativeScroll * 0.2;
      currentTranslateY = lerp(currentTranslateY, targetTranslateY, 0.1);
      if (Math.abs(currentTranslateY - targetTranslateY) > 0.01) {
        elementImage.style.transform = `translateY(${currentTranslateY}px) scale(1.5)`;
      }
    };

    updateBound();
    return { update, updateBound };
  };

  const getProjectData = (index: number) => {
    const dataIndex = ((Math.abs(index) % projectData.length) + projectData.length) % projectData.length;
    return projectData[dataIndex];
  };

  const createProjectElement = (index: number) => {
    if (state.projects.has(index)) return;

    const template = document.querySelector(".template")!;
    const project = template.cloneNode(true) as HTMLDivElement;
    project.style.display = "flex";
    project.classList.remove("template");

    const dataIndex = ((Math.abs(index) % projectData.length) + projectData.length) % projectData.length;
    const data = getProjectData(index)!;

    const projectNumber = (dataIndex + 1).toString().padStart(2, "0");

    project.innerHTML = data.isAlternate
      ? `<div class="size">
        <div class="img"><img src="${data.image}"  alt="${data.title}"/></div>
      </div>
      <div class="side">
        <div class="title">
          <h1>${data.title}</h1>
          <h1>${projectNumber}</h1>
        </div>
      </div>`
      : `<div class="side">
        <div class="title">
          <h1>${data.title}</h1>
          <h1>${projectNumber}</h1>
        </div>
      </div>
      <div class="side">
        <div class="img"><img src="${data.image}"  alt="${data.title}"/></div>
      </div>`;

    project.style.transform = `translateY(${index * state.projectHeight}px)`;
    document.querySelector(".project-list")!.appendChild(project);
    state.projects.set(index, project);

    const image = project.querySelector("img");
    if (image) {
      const parallaxImage = createParallaxImage(image);
      state.parallaxImages.set(index, parallaxImage);
    }
  };

  const createInitialProjects = () => {
    for (let i = -config.BUFFER_SIZE; i < config.BUFFER_SIZE; i++) {
      createProjectElement(i);
    }
  };

  const getCurrentIndex = () => Math.round(-state.targetY / state.projectHeight);

  const checkAndCreateProjects = () => {
    const currentIndex = getCurrentIndex();
    const minNeeded = currentIndex - config.BUFFER_SIZE;
    const maxNeeded = currentIndex + config.BUFFER_SIZE;
    for (let i = minNeeded; i <= maxNeeded; i++) {
      if (!state.projects.has(i)) {
        createProjectElement(i);
      }
    }

    state.projects.forEach((project, index) => {
      if (index < currentIndex - config.CLEANUP_THRESHOLD || index > currentIndex + config.CLEANUP_THRESHOLD) {
        project.remove();
        state.projects.delete(index);
        state.parallaxImages.delete(index);
      }
    });
  };

  const getClosetSnapPoint = () => {
    const currentIndex = Math.round(-state.targetY / state.projectHeight);
    return -currentIndex * state.projectHeight;
  };

  const initialSnap = () => {
    state.isSnapping = true;
    state.snapStartTime = Date.now();
    state.snapStartY = state.targetY;
    state.snapTargetY = getClosetSnapPoint();
  };

  const updateSnap = () => {
    const snaped = Date.now() - state.snapStartTime;
    const progress = Math.min(snaped / config.SNAP_DURATION, 1);

    const t = 1 - Math.pow(1 - progress, 3);

    state.startY = state.snapStartY + (state.snapTargetY - state.snapStartY) * t;

    if (progress >= 1) {
      state.isSnapping = false;
      state.targetY = state.snapTargetY;
    }
  };

  const animate = () => {
    const now = Date.now();
    const timeSinceLastScroll = now - state.lastScrollTime;

    if (!state.isSnapping && timeSinceLastScroll > 100 && !state.isDragging) {
      const snapPoint = getClosetSnapPoint();
      if (Math.abs(state.targetY - snapPoint) > 1) {
        initialSnap();
      }
    }

    if (state.isSnapping) {
      updateSnap();
    }

    if (!state.isDragging) {
      state.currentY += (state.targetY - state.currentY) * config.LERP_FACTOR;
    }

    checkAndCreateProjects();

    state.projects.forEach((project, index) => {
      const y = index * state.projectHeight + state.currentY;
      project.style.transform = `translateY(${y}px)`;
      const parallaxImage = state.parallaxImages.get(index);
      if (parallaxImage) {
        parallaxImage.update(state.currentY);
      }
    });

    requestAnimationFrame(animate);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    state.isSnapping = false;
    state.lastScrollTime = Date.now();

    const scrollData = e.deltaY * config.SCROLL_SPEED;
    state.targetY -= Math.max(Math.min(scrollData, config.MAX_VELOCITY), -config.MAX_VELOCITY);
  };

  const handleTouchStart = (e: TouchEvent) => {
    state.isDragging = true;
    state.isSnapping = false;
    state.startY = e.touches[0]!.clientY;
    state.lastY = state.targetY;
    state.lastScrollTime = Date.now();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!state.isDragging) return;
    const dataY = (e.touches[0]!.clientY - state.startY) * 1.5;
    state.targetY = state.lastY + dataY;
    state.lastScrollTime = Date.now();
  };

  const handleTouchEnd = () => {
    state.isDragging = false;
  };

  const handleResize = () => {
    state.projectHeight = window.innerHeight;

    state.projects.forEach((project, index) => {
      project.style.transform = `translateY(${index * state.projectHeight}px)`;
      const parallaxImage = state.parallaxImages.get(index);
      if (parallaxImage) parallaxImage.updateBound();
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    createInitialProjects();
    animate();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='w-full h-full fixed'>
      <ul className='project-list absolute w-full will-change-transform list-none'>
        <div className='template w-screen h-screen flex overflow-hidden absolute left-0 will-change-transform' style={{ display: "none" }}>
          <div className='flex-1 h-full overflow-hidden'>
            <div className='flex justify-between items-center'>
              <h1 className='uppercase font-medium p-5 text-4xl'>Euphoria</h1>
              <h1 className='uppercase font-medium p-5 text-4xl'>01</h1>
            </div>
          </div>
          <div className='flex-1 h-full overflow-hidden'>
            <div className='w-full h-full overflow-hidden'>
              <Image src='/images/one.png' alt='' fill className='relative h-full w-full object-cover will-change-transform translate-x-0 scale-150' />
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ParallaxSnaps;
