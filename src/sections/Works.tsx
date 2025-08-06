'use client'
import AnimatedHeaderSection from '@/components/AnimatedHeaderSection'
import { projects } from '@/constants';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

const Works = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);
  const mouse = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  useGSAP(() => {
    // quickTo用于需要频繁、实时、快速地更新某个值（如鼠标跟随），使用内部缓存的动画实例，性能更高，返回一个设置目标值的函数
    // 而to用于一次性设置目标值
    moveX.current = gsap.quickTo(previewRef.current, 'x', {
      duration: 1.5,
      ease: 'power3.out',
    })
    moveY.current = gsap.quickTo(previewRef.current, 'y', {
      duration: 2,
      ease: 'power3.out',
    })

    // from代码从下面描述的动画开始->设置的样式
    gsap.from('#project', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out',
      scrollTrigger: { // 当 #project 元素进入视口时，触发这段动画。
        trigger: '#project',
      },
    })
  })


  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return
    setCurrentIndex(index);


    const el = overlayRefs.current[index];
    if (!el) return

    gsap.killTweensOf(el); // 停止该元素上所有的动画
    // fromTo 用于设置动画的开始和结束状态,元素从 fromVars 状态 过渡 到 toVars 状态。
    gsap.fromTo(el, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 0.15,
      ease: 'power2.out',
    })

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }
  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return
    setCurrentIndex(null);

    gsap.to(overlayRefs.current, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      duration: 0.2,
      ease: 'power2.in',
    })

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
  }

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className='relative flex flex-col font-light' onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <div
            id='project'
            key={project.id}
            className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0'
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}>
            {/* overlay */}
            <div
              ref={(el) => { overlayRefs.current[index] = el }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className='lg:text-[32px] text-[26px] leading-none'>{project.name}</h2>
              <ArrowUpRight className='md:size-6 size-5' />
            </div>
            <div className="w-full h-0.5 bg-black/80" />
            <div className='flex px-10 text-xs leading-loose uppercase translate-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12'>
              {project.frameworks.map((framework) => (
                <p key={framework.id} className='text-black transition-colors duration-500 md:group-hover:text-white'>{framework.name}</p>
              ))}
            </div>
            {/* mobile preview image */}
            <div className='relative flex items-center justify-center px-10 md:hidden h-[400px]'>
              <Image src={project.bgImage} alt='bg-image' fill sizes='100vw' priority={false} className='object-cover rounded-md brightness-50' />
              <Image src={project.image} alt='image' width={1024} height={1024} className='absolute bg-center px-14 rounded-xl' />
            </div>
          </div>
        ))}
        {/* desktop Flaoting preview image */}
        <div ref={previewRef} className='fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[500px] md:block hidden opacity-0'>
          {currentIndex !== null && <Image src={projects[currentIndex].image} alt='preview' width={500} height={500} className='object-cover' />}
        </div>
      </div>
    </section>
  )
}

export default Works