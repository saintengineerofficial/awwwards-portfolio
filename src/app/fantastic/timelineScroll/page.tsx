import React from "react";
import Image from "next/image";

const timelineData = [
  {
    timeSignal: "January 2010",
    url: "/fantastic/one.png",
    description: "Tesla introduces its first electric car, the Roadster, showing the world the potential of electric vehicles with a range of over 200 miles",
  },
  { timeSignal: "March 2015", url: "/fantastic/two.png", description: "Tesla launches the Model S, revolutionizing the luxury electric sedan market with enhanced range and performance" },
  { timeSignal: "July 2020", url: "/fantastic/three.png", description: "Major automakers announce significant investments in EV technology as global demand continues to rise" },
  { timeSignal: "February 2021", url: "/fantastic/four.png", description: "Several countries introduce legislation to phase out combustion engines within the next decade" },
  { timeSignal: "October 2022", url: "/fantastic/five.png", description: "Battery technology breakthroughs enable more affordable electric vehicles with longer ranges" },
  { timeSignal: "May 2024", url: "/fantastic/six.png", description: "Electric vehicle sales surpass traditional combustion engine vehicles in major global markets" },
];

const TimelineScroll = () => {
  return (
    <div className='relative'>
      <div className='bg-gray-950'>
        <div className='container mx-auto px-4'>
          <div className='py-32 relative bg-gray-950 z-10'>
            <div className='text-white text-center mx-auto max-w-[640px]'>
              <div className='mb-8'>
                <h2 className='md:text-5xl text-4xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600'>The Rise of Electric Vehicles</h2>
              </div>
              <p className='text-xl tracking-tight'>
                The electric vehicles (EV) revolution began with small incremental steps.
                <br />
                This timeline tracks key moments in the development of electric cars and the global push towards sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-950'>
        <div className='container mx-auto px-4 relative'>
          <div className='flex flex-col justify-center items-center mx-auto relative max-w-[1120px]'>
            {/* Timeline center line */}
            <div className='bg-gray-500 w-1 h-full absolute z-0 hidden sm:flex'>
              <div className='bg-gradient-to-b from-orange-500 to-pink-600 w-1 h-[50vh] fixed inset-[0_auto_50vh] z-10'></div>
            </div>

            {/* Timeline items */}
            {timelineData.map(item => (
              <div key={item.timeSignal} className='relative py-20 grid sm:grid-cols-[1fr_180px_1fr] grid-cols-1 gap-0'>
                {/* Date section */}
                <div className='text-right sm:text-center justify-end items-stretch'>
                  <div className='text-white tracking-tight text-5xl font-medium sticky top-[50vh] leading-tight'>{item.timeSignal}</div>
                </div>

                {/* Center dot */}
                <div className='hidden justify-center sm:flex'>
                  <div className='bg-white rounded-full w-4 h-4 sticky top-[50vh] shadow-md'></div>
                </div>

                {/* Content section */}
                <div>
                  <div className='mb-14'>
                    <div className='text-white text-2xl font-medium leading-normal'>{item.description}</div>
                  </div>
                  <div>
                    <Image src={item.url} alt={`${item.timeSignal} - EV milestone`} width={480} height={200} className='align-middle inline-block max-w-full rounded-lg shadow-lg' />
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom gradient effect */}
            <div className='h-20 absolute inset-[auto_0_0] bg-gradient-to-t from-gray-950 to-transparent'></div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className='h-[50vh]'></div>
      </div>
    </div>
  );
};

export default TimelineScroll;
