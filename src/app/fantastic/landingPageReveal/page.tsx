"use client";
import React, { useRef } from "react";
import { ArrowRight, Store } from "lucide-react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, useGSAP);
CustomEase.create("hop", "0.9,0,0.1,1");

const countsArr = [
  { front: 0, back: 0 },
  { front: 2, back: 7 },
  { front: 6, back: 5 },
  { front: 9, back: 8 },
  { front: 9, back: 9 },
];

const Page = () => {
  const countRef = useRef<(HTMLDivElement | null)[]>([]);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
    });

    countRef.current?.forEach((count, index) => {
      // 可以越层获取h1
      const digits = countRef.current[index]?.querySelectorAll<HTMLElement>("h1")!;
      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);

      if (index < countRef.current.length) {
        // index * 1 + 1 比上一个动画多一个延迟1s
        tl.to(digits, { y: "-100%", duration: 1, stagger: 0.075 }, index * 1 + 1);
      }
    });
    tl.to(spinnerRef.current, { opacity: 0, duration: 0.3 });

    const words = wordRef.current?.querySelectorAll<HTMLElement>("h1")!;
    console.log("🚀 ~ Page ~ words:", words)

    tl.to(words, { y: 0, duration: 0.6 }, "<");

    tl.to(dividerRef.current, {
      scaleY: "100%",
      duration: 1,
      onComplete: () => {
        gsap.to(dividerRef.current, { opacity: 0, duration: 0.4, delay: 0.3 });
      },
    });

    tl.to(words[0], { y: "-100%", duration: 0.6, delay: 0.2 });
    tl.to(words[1], { y: "100%", duration: 0.6, delay: 0.2 }, "<");

    const blocks = blocksRef.current?.querySelectorAll<HTMLElement>("div")!;
    tl.to(blocks, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1, // 与上一个动画间隔
      delay: 0.2,
      onStart: () => {
        gsap.to(heroImageRef.current, {
          scale: 1,
          duration: 1.4,
          ease: "hop", // 动画的缓动曲线
        });
      },
    });

    const headerH1 = headerRef.current?.querySelectorAll<HTMLElement>("h1")!;
    const headerP = headerRef.current?.querySelectorAll<HTMLElement>("p")!;

    tl.to([headerH1, headerP], { y: 0, duration: 1.5, stagger: 0.2 }, "<");

    const ctaDiv = ctaRef.current?.children[1]!;
    const ctaP = ctaRef.current?.querySelector<HTMLElement>("p")!;
    tl.to([ctaRef.current, ctaDiv], { scale: 1, duration: 1.5, stagger: 0.75, delay: 0.75 }, "<");
    tl.to(ctaP, { y: 0, duration: 1.5, delay: 0.5 }, "<");

  });

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-[100svh] overflow-hidden z-[2]">
        <div ref={blocksRef} className="absolute top-0 w-full h-full flex">
          <div className="w-full h-full bg-[#303030]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
          <div className="w-full h-full bg-[#303030]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
        </div>

        <div ref={wordRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
          <div className='px-2' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <h1 className="text-center text-white text-[2.5rem] font-medium leading-none relative -translate-y-[120%] will-change-transform">
              <span className="font-['PP_Neue_Montreal'] font-medium italic antialiased">Saint</span>
            </h1>
          </div>
          <div className='px-2' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <h1 className="text-center text-white text-[2.5rem] font-medium leading-none relative translate-y-[120%] will-change-transform">
              <span className="font-['PP_Neue_Montreal'] font-medium italic antialiased">Root</span>
            </h1>
          </div>
        </div>

        <div ref={dividerRef} className="absolute top-0 left-1/2 -translate-x-1/2 origin-top w-px h-full bg-white scale-y-0"></div>

        <div ref={spinnerRef} className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
          <div className={`w-[100px] h-[100px] rounded-full border-[1.5px] border-white border-t-[#303030] animate-spin`}></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
          {countsArr.map((count, index) => (
            <div
              ref={(el) => { countRef.current[index] = el }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-white"
              key={index}
            >
              <div className="flex-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                <h1 className="text-[15rem] font-normal font-['PP_Neue_Montreal'] relative translate-y-[120%] will-change-transform">{count.front}</h1>
              </div>
              <div className="flex-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                <h1 className="text-[15rem] font-normal font-['PP_Neue_Montreal'] relative translate-y-[120%] will-change-transform">{count.back}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Container */}
      <div className="relative w-full h-[100svh] overflow-hidden">
        {/* Hero Image */}
        <div ref={heroImageRef} className="absolute top-0 w-screen h-[100svh] overflow-hidden z-[-1] scale-150 will-change-transform">
          <img
            className="w-full h-full object-cover"
            src="/fantastic/desktop9.jpg"
            alt="hero"
          />
        </div>

        {/* Navigation */}
        <div className="absolute top-0 w-full px-6 py-5 flex items-center gap-6 will-change-transform">
          <div className="flex-1">
            <a href="#" className="text-sm font-bold capitalize text-white">SaintRoot</a>
          </div>
          <div className="flex-1 hidden md:flex gap-6 justify-center uppercase text-xs text-white">
            <a href="#" className="no-underline uppercase text-white text-xs font-medium leading-none antialiased">Rituals</a>
            <a href="#" className="no-underline uppercase text-white text-xs font-medium leading-none antialiased">Products</a>
            <a href="#" className="no-underline uppercase text-white text-xs font-medium leading-none antialiased">About</a>
            <a href="#" className="no-underline uppercase text-white text-xs font-medium leading-none antialiased">Contact</a>
          </div>
          <div className="flex-1 flex justify-end">
            <a href="#" className="flex items-center justify-center w-[40px] h-[40px] rounded-[40%] bg-white text-black text-sm">
              <Store />
            </a>
          </div>
        </div>

        {/* Header Content */}
        <div ref={headerRef} className="w-full h-full pt-[25svh] flex flex-col items-center gap-6">
          <div className="text-center">
            <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
              <h1 className="text-center text-white text-[2.5rem] md:text-[5rem] font-medium leading-none relative translate-y-[120%] will-change-transform">
                <span className="font-['PP_Neue_Montreal'] font-medium italic antialiased">Rooted</span> in case,
              </h1>
            </div>
            <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
              <h1 className="py-3 text-center text-white text-[2.5rem] md:text-[5rem] font-medium leading-none relative translate-y-[120%] will-change-transform">
                grown with<span className="font-['PP_Neue_Montreal'] font-medium italic antialiased"> kindness</span>
              </h1>
            </div>
          </div>
          <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <p className="no-underline uppercase text-white text-xs font-medium leading-none antialiased relative translate-y-[120%] will-change-transform">
              Skincare that stays true to nature and to you
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="absolute left-1/2 bottom-12 w-[90%] md:w-1/2 h-[60px] p-2 flex justify-end bg-white rounded-[4rem] will-change-transform -translate-x-1/2 scale-0">
          <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform">
            <p className="text-black no-underline uppercase text-xs font-medium leading-none antialiased relative translate-y-[120%] will-change-transform">
              View all products
            </p>
          </div>
          <div className="relative h-full aspect-square flex justify-center items-center text-white bg-[#303030] rounded-[60px] will-change-transform scale-0">
            <ArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
