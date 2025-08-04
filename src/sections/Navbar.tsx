'use client'
import Link from "next/link";
import { socials } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link as ScrollLink } from 'react-scroll';

type Props = {};

const Navbar = (props: Props) => {
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const topLineRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline>(null);
  const iconTl = useRef<gsap.core.Timeline>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowMenuIcon, setIsShowMenuIcon] = useState(true);

  // 初始化
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 }) //表示元素的 transform: translateX(100%)，基于自身宽度的 100%
    gsap.set([linksRef.current, contactRef.current], { autoAlpha: 0, x: -20 }) // 设置元素的透明度为 0，x 坐标为 -20

    // { paused: true }它一开始是暂停状态，不会自动播放，直到你手动 .play()
    tl.current = gsap.timeline({ paused: true })
      .to(navRef.current, { xPercent: 0, duration: 1, ease: "power3.inOut", })
      // stagger: 0.1 表示每个元素的动画之间有一个 0.1 秒的延迟
      // "<"：跟上一个动画 同时 开始,">"：等上一个动画 结束后再开始
      .to(linksRef.current, { autoAlpha: 1, x: 0, stagger: 0.1, duration: 1, ease: "power2.inOut" }, "<")
      // "<+0.2"：等上一个动画结束后再开始，延迟 0.2 秒
      .to(contactRef.current, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, "<+0.2")

    // 菜单图标动画
    iconTl.current = gsap.timeline({ paused: true })
      .to(topLineRef.current, { rotate: 45, y: 3.3, duration: 0.3, ease: "power2.inOut", })
      .to(bottomLineRef.current, { rotate: -45, y: -3.3, duration: 0.3, ease: "power2.inOut", }, "<")
  }, [])

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse()
      iconTl.current?.reverse()
    } else {
      tl.current?.play()
      iconTl.current?.play()
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsShowMenuIcon(currentScrollY <= lastScrollY || currentScrollY < 10)
      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav ref={navRef} className='fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2'>
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["home", "services", "about", "work", "contact"].map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <ScrollLink className='transition-all duration-300 cursor-pointer hover:text-white' to={section} smooth offset={0} duration={2000}>
                {section}
              </ScrollLink>
            </div>
          ))}
        </div>
        <div ref={contactRef} className='flex flex-col flex-wrap justify-between gap-8 md:flex-row'>
          <div className='font-light'>
            <p className='tracking-wider text-white/50'>E-mail</p>
            <p className='text-xl tracking-widest lowercase text-pretty'>
              saintengineerofficial@gmail.com
            </p>
          </div>
          <div className='font-light'>
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className='flex flex-col flex-wrap md:flex-row gap-x-2'>
              {socials.map((social, index) => (
                <Link key={index} href={social.href} target='_blank' className='text-sm leading-loose tracking-widest uppercase transition-colors duration-300 hover:text-white'>
                  {`{ ${social.name} }`}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className='fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10'
        onClick={toggleMenu}
        style={isShowMenuIcon ? { clipPath: 'circle(50% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}>
        <span ref={topLineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
        <span ref={bottomLineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
      </div >
    </>
  );
};

export default Navbar;
