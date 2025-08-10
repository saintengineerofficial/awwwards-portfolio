"use client";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const colors = ["#493d9e", "#b2a5ff", "#ffb4a2", "#D2665a", "#2973b2", "#5b913b", "#212121", "#e0305a"];

gsap.registerPlugin(ScrollTrigger);

const ScrollMagic = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    const items = document.querySelectorAll(".grid-item");

    // 遍历每个网格项
    items.forEach((item, index) => {
      // 对每个网格项应用两个动画：
      // 1. 将元素移动到初始位置，并添加圆角
      tl.to(
        item,
        {
          transform: "translate(0,0)", // 移动到初始位置
          borderRadius: "1rem", // 添加圆角
        },
        0 // 动画同时开始
      )
        // 2. 为每个网格项设置特定颜色
        .to(item, {
          backgroundColor: `${colors[index]}`, // 使用预定义颜色数组
        });
    });

    // 对标题应用淡出和缩小效果
    tl.to(".headingone", { opacity: 0, scale: 0.5 }, 0);

    ScrollTrigger.create({
      trigger: ".scroll-section", // 触发元素
      start: "top top", // 开始触发的位置
      end: "bottom bottom", // 结束触发的位置
      scrub: 1, // 平滑滚动效果
      toggleActions: "restart none reverse", // 滚动时的动画行为
      pin: ".scroll-wrapper", // 固定滚动包装器
      animation: tl, // 应用的动画时间线
      // markers: { fontSize: "2rem" }, // 调试用的可视化标记
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className=''>
      <section className='scroll-section h-[300vh] overflow-hidden'>
        <div className='scroll-wrapper flex flex-col justify-center items-center w-full h-screen'>
          <h1 className='headingone absolute font-semibold left-0 right-0 text-center text-4xl bg-orange-600 bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent'>
            Scroll Magic
          </h1>
          <div className='w-[90vw] relative gap-[1vw] grid grid-cols-[25vw_15vw_27vw_20vw] group'>
            {new Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className={`bg-white flex flex-col items-start justify-between w-full h-80 p-8 box-border font-medium relative grid-item
                ${index === 0 ? "translate-x-[-10vh] translate-y-[-30vh]" : ""}
                ${index === 1 ? "translate-x-[0vh] translate-y-[-20vh]" : ""}
                ${index === 2 ? "translate-x-[5vh] translate-y-[-25vh]" : ""}
                ${index === 3 ? "translate-x-[10vh] translate-y-[-30vh]" : ""}
                ${index === 4 ? "translate-x-[-15vh] translate-y-[30vh]" : ""}
                ${index === 5 ? "translate-x-[-10vh] translate-y-[20vh]" : ""}
                ${index === 6 ? "translate-x-[-5vh] translate-y-[15vh]" : ""}
                ${index === 7 ? "translate-x-[4vh] translate-y-[25vh]" : ""}
          `}></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScrollMagic;
