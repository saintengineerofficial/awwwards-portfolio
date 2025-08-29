"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const constant = [
  { signal: "X01-842", url: "/fantastic/one.png" },
  { signal: "X031-81", url: "/fantastic/two.png" },
  { signal: "X31-822", url: "/fantastic/three.png" },
  { signal: "X111-82", url: "/fantastic/four.png" },
  { signal: "Y21-842", url: "/fantastic/five.png" },
  { signal: "C01-842", url: "/fantastic/six.png" },
];

const CardsStack = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef(0);
  const totalImages = constant.length;

  const handleImageLoad = () => {
    imagesRef.current += 1;
    if (imagesRef.current === totalImages) {
      setImagesLoaded(true);
    }
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    // 注册ScrollTrigger插件，使GSAP能够使用滚动触发功能
    gsap.registerPlugin(ScrollTrigger);

    // 创建Lenis平滑滚动实例
    const lenis = new Lenis();
    // 当Lenis滚动时更新ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    // 将Lenis的requestAnimationFrame与GSAP的ticker同步
    gsap.ticker.add(time => {
      lenis.raf(time * 1000);
    });
    // 禁用GSAP的延迟平滑功能，确保动画更准确地跟随滚动
    gsap.ticker.lagSmoothing(0);

    // 获取所有带有"card"类的元素并转换为数组
    const cards: HTMLDivElement[] = gsap.utils.toArray(".card");

    // 为每张卡片定义不同的初始旋转角度，使它们看起来更自然
    const rotations = [-12, 10, -5, 5, -5, -2];

    // 设置每张卡片的初始位置和旋转
    cards.forEach((card, index) => {
      // 将所有卡片初始位置设置在屏幕下方（y值等于窗口高度），并应用不同旋转角度
      gsap.set(card, { y: window.innerHeight, rotate: rotations[index] });
    });

    // 创建ScrollTrigger实例来控制滚动动画
    ScrollTrigger.create({
      // 指定触发元素
      trigger: ".sticky-cards",
      // 动画开始于触发元素顶部对齐视口顶部时
      start: "top top",
      // 动画结束于滚动窗口高度的6倍（为每张卡片提供足够的滚动距离）
      end: `+=${window.innerHeight * 6}px`,
      // 固定触发元素在视口中
      pin: true,
      // 保持固定元素的空间
      pinSpacing: true,
      // 启用平滑滚动动画，值为1表示中等平滑度
      scrub: 1,
      // 滚动更新时执行的回调函数
      onUpdate: self => {
        // 获取当前滚动进度（0到1之间）
        const progress = self.progress;

        // 计算卡片总数和每张卡片分配的进度比例
        const totalCards = cards.length;
        const progressPerCard = 1 / totalCards;

        // 为每张卡片计算和应用变换
        cards.forEach((card, index) => {
          // 计算当前卡片动画开始的进度点
          const cardStart = index * progressPerCard;
          // 计算当前卡片的进度（0到1之间）
          let cardProgress = (progress - cardStart) / progressPerCard;
          // 确保进度值在0到1之间
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          // 根据卡片进度计算垂直位置（从屏幕底部移动到中心）
          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = 0;

          // 当卡片完全进入视图且不是最后一张卡片时
          if (cardProgress === 1 && index < totalCards - 1) {
            // 计算剩余进度（用于将已完全显示的卡片向左上角移动）
            const remainProgress = (progress - (cardStart + progressPerCard)) / (1 - (cardStart + progressPerCard));

            // 如果有剩余进度，开始将卡片移向左上角
            if (remainProgress > 0) {
              // 计算距离乘数（较早的卡片移动更远）
              const distanceMultiplier = 1 - index * 0.15;
              // 计算水平位置（负值表示向左移动）
              xPos = -window.innerWidth * 0.3 * distanceMultiplier * remainProgress;
              // 计算垂直位置（负值表示向上移动）
              yPos = -window.innerHeight * 0.3 * distanceMultiplier * remainProgress;
            }
          }

          // 应用计算出的位置变换到卡片
          gsap.to(card, {
            y: yPos,
            x: xPos,
            // 立即应用变换（无过渡动画）
            duration: 0,
            ease: "none",
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imagesLoaded]);

  return (
    <>
      <section className='relative w-screen h-screen overflow-hidden flex items-center justify-center text-center text-white bg-[#202020] p-[1em]'>
        <h1 className='text-3xl font-normal leading-none'>Future threads for a fractured world</h1>
      </section>
      <section className='sticky-cards relative w-screen h-screen overflow-hidden bg-#e3e3e3'>
        {constant.map(item => (
          <div
            key={item.signal}
            className='card absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 will-change-transform box-border w-1/4 h-1/2 p-2 flex flex-col gap-2 bg-orange-400 text-white'>
            <div className='relative w-full flex-1 min-h-0'>
              <Image src={item.url} alt={item.signal} fill className='object-cover w-full h-full' onLoad={handleImageLoad} />
            </div>
            <div className='basis-[12px] flex items-center'>
              <p className='uppercase text-sm'>{item.signal}</p>
            </div>
          </div>
        ))}
      </section>
      <section className='relative w-screen h-screen overflow-hidden flex items-center justify-center text-center text-white bg-[#202020] p-[1em]'>
        <h1 className='text-3xl font-normal leading-none'>Tomorrow,tailored</h1>
      </section>
    </>
  );
};

export default CardsStack;
