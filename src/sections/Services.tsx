'use client'
import AnimatedHeaderSection from '@/components/AnimatedHeaderSection'
import { servicesData } from '@/constants';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge';

const text = `I build secure, high-performance full-stack apps
              with smooth UX to drive growth 
              not headaches.`;

const Services = () => {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDesktop = useIsDesktop(768);

  useGSAP(() => {
    serviceRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // 滚动到距离 viewport 80% 时触发
        },
        duration: 1,
        ease: "circ.out",
      })
    })
  }, [])

  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => { serviceRefs.current[index] = el }}
          key={index}
          className={twMerge('sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30')}
          style={isDesktop ? {
            top: `calc(10vh + ${index * 5}em)`,
            marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
          } : { top: 0 }}
        >
          <div className='flex items-center justify-between gap-4 font-light'>
            <div className='flex flex-col gap-6'>
              <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              <div className='flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/60'>
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className='flex'>
                      <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {/* 实现最后一个item的不要分割线 */}
                    {itemIndex < service.items.length - 1 && <div className="w-full h-px my-2 bg-white/30" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Services