import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Bookmark } from "lucide-react";

const animations = [
  { link: "/timelineScroll", title: "TimelineScroll" },
  { link: "/cardsStack", title: "CardsStack" },
  { link: "/scrollMagic", title: "ScrollMagic" },
  { link: "/minimap", title: "Minimap" },
  { link: "/parallaxSnaps", title: "ParallaxSnaps" },
  { link: "/landingPageReveal", title: "LandingPageReveal" },
];

const Fantastic = () => {
  return (
    <div className='bg-[#f7f7f7] py-10'>
      <div className='max-w-1500px mx-auto w-full px-10'>
        <section></section>
        <section className='grid grid-cols-3 gap-5'>
          {animations.map(a => (
            <div key={a.title}>
              <Link href={`fantastic/${a.link}`}>
                <div className='relative group overflow-hidden'>
                  <div
                    className='absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 
                  group-hover:opacity-100 flex items-center justify-center rounded-3xl shadow-lg'>
                    <div className='text-black bg-white px-5 py-3 rounded-lg flex items-center gap-1 transition-all duration-300  hover:bg-[#313131] hover:text-white'>
                      <ArrowRight className='size-5' />
                      <span className='text-sm'>点击预览</span>
                    </div>
                    <div className='absolute bottom-12 w-full px-8 flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='text-sm'>CASE</span>
                        <p className='font-semibold text-xl'>{a.title}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <ArrowUpRight className='size-8' />
                        <Bookmark className='size-7' />
                      </div>
                    </div>
                  </div>
                  <iframe src={`fantastic/${a.link}`} title='页面预览' className='w-full h-[400px] rounded-3xl overflow-hidden pointer-events-none ' />
                </div>
                <div className='flex items-center gap-2 text-black mt-4'>
                  <h3 className='text-xl font-semibold'>{a.title}</h3>
                  <div className='flex items-center gap-2'>
                    <small>by</small>
                    <div className='flex items-center gap-2'>
                      <Image src='/images/as.png' alt='as' width={32} height={32} className='rounded-full' />
                      <strong
                        className='text-xl font-semibold relative before:transition-all before:duration-300 
                      before:absolute before:left-0 before:-bottom-1 before:w-full before:h-[2px] before:bg-gray-300 before:scale-x-0 before:origin-left
                      hover:before:bg-gray-900 hover:before:scale-x-100'>
                        Saint Engineer Official
                      </strong>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Fantastic;
