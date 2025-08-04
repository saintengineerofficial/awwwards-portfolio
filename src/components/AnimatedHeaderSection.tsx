'use client'
import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge';
import AnimatedTextLines from './AnimatedTextLines';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Props = {
  subTitle: string;
  title: string;
  text: string;
  textColor: string;
};

const AnimatedHeaderSection = ({ subTitle, title, text, textColor }: Props) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(contextRef.current, {
      y: '50vh',
      duration: 1,
      ease: 'circ.out'
    })
    tl.from(headerRef.current, {
      opacity: 0,
      y: '200',
      duration: 1,
      ease: 'circ.out'
    }, '<+0.2')
  }, [])

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div ref={headerRef} className='flex flex-col justify-center gap-12 pt-16 sm:gap-16'>
          <p className={twMerge('text-sm font-light tracking-[0.5rem]', textColor)}>{subTitle}</p>
          <div className='px-10'>
            <h1 className={twMerge('flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block', textColor)}>
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={twMerge('relative px-10', textColor)}>
        <div className='absolute inset-x-0 border-t-2'></div>
        <div className='py-12 sm:py-16 text-end'>
          <AnimatedTextLines
            text={text}
            className={twMerge('font-light uppercase value-text-responsive', textColor)}
          />
        </div>
      </div>
    </div>
  )
}

export default AnimatedHeaderSection