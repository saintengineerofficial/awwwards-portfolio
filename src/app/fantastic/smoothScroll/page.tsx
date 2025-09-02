"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ReactLenis, { type LenisRef } from 'lenis/react'
import React, { useCallback, useMemo, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Props = {}

const Page = (props: Props) => {
  const lenisRef = useRef<LenisRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const captionBackgroundRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  function update(time: number) {
    lenisRef.current?.lenis?.raf(time * 1000)
  }

  const cloneInfinite = () => {
    const sec = document.createElement('section')
    sec.classList.add('relative', 'w-full', 'h-screen', 'overflow-hidden', 'z-100')
    sec.style.height = '100vh'

    const clone = heroRef.current?.cloneNode(true) as HTMLDivElement
    sec.appendChild(clone)
    containerRef.current?.appendChild(sec)
  }


  useGSAP(() => {

    lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    cloneInfinite()

    const textArr = Array.from(captionRef.current?.querySelectorAll('span')!)
    const spliceTextArr = textArr.splice(1)
    console.log("🚀 ~ Page ~ spliceTextArr:", spliceTextArr)

    const captiontl = gsap.timeline({
      scrollTrigger: {
        trigger: captionRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    })
    gsap.set(captionBackgroundRef.current, { width: 0 })
    gsap.set(spliceTextArr, { display: 'none' })

    captiontl
      .to(captionBackgroundRef.current, { width: 'calc(100% - 4rem)', duration: 1 }, 0)
      .to(textArr, { color: '#fff' }, '<')
      .to(spliceTextArr, { display: 'inline-block', duration: 1, stagger: 0.1, color: '#fff' }, 0)
      .to(captionBackgroundRef.current, { scale: 1.2 }, 0.5)

    const gridWrapper = gridRef.current?.children[0]!
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    })

    gsap.set(gridWrapper, { yPercent: 50, autoAlpha: 0 })

    gridTl.to(gridWrapper, { yPercent: 0, autoAlpha: 1 }, 0.2).to(gridWrapper, { scale: 3.2 }, 0.5)

    lenisRef.current?.lenis?.scrollTo(0)

    return () => gsap.ticker.remove(update)
  })

  return (
    <ReactLenis ref={lenisRef} options={{ lerp: 0.05, infinite: true }} root className='tracking-wider'>
      <div ref={containerRef}>
        <section ref={heroRef} className='relative w-full h-screen overflow-hidden z-100'>
          <div className='flex items-center p-8 w-full h-full'>
            <div className='flex flex-wrap items-center h-max gap-2 text-white/80 leading-none'>
              <div className='mix-blend-overlay pl-60'><h1 className='text-[13rem] uppercase'>We</h1></div>
              <div className='flex-[0_0_22vw]'><span className='text-xl'>A community-driven brand focused on empowering developers and designers to create modern and efficient websites</span></div>
              <div className='mix-blend-overlay'><h1 className='text-[13rem] uppercase'>Are</h1></div>
              <div className='mix-blend-overlay'><h1 className='text-[13rem] uppercase'>Digital</h1></div>
              <div className='mix-blend-overlay pl-40'><h1 className='text-[13rem] uppercase'>Makers</h1></div>
            </div>
            <div className='absolute left-0 top-0 w-full h-full -z-1 after:content-[""] after:absolute after:left-0 
          after:top-0 after:w-full after:h-full after:bg-black/40'>
              <img className='w-full h-full object-cover hue-rotate-30' src="/fantastic/desktop9.jpg" alt="" />
            </div>
          </div>
        </section>
        <section ref={captionRef} className='relative w-full h-screen overflow-hidden z-100'>
          <div className='w-full h-full relative z-10'>
            <div className='flex items-center justify-center w-[60vw] mx-auto h-full mix-blend-difference text-black'>
              <div className='inline-flex flex-wrap justify-center gap-3 text-black'>
                <span className='text-5xl'>"Unlock</span>
                <span className='text-5xl'>Brand</span>
                <span className='text-5xl'>Success</span>
                <span className='text-5xl'>Through</span>
                <span className='text-5xl'>Community</span>
                <span className='text-5xl'>&Insight"</span>
              </div>
            </div>
            <div ref={captionBackgroundRef} className='absolute left-2 top-2 w-0 h-full bg-black z-[-1] rounded-4xl'></div>
          </div>
        </section>
        <section ref={gridRef} className='relative w-full h-screen overflow-hidden z-100 bg-black'>
          <div>
            <div className='grid grid-cols-3 grid-rows-3 h-screen justify-center gap-2'>
              <img className='object-cover w-full h-full' src="/fantastic/desktop1.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop2.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop3.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop4.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop5.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop6.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop7.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop8.jpg" alt="" />
              <img className='object-cover w-full h-full' src="/fantastic/desktop9.jpg" alt="" />
            </div>
          </div>
        </section>
        <section className='relative w-full h-[75vh] flex items-center justify-center'>
          <h1 className='text-[13rem] uppercase'>+0134441233</h1>
        </section>
      </div>
    </ReactLenis>
  )
}

export default Page