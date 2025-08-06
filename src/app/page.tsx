"use client";
import Navbar from "@/sections/Navbar";
import Services from "@/sections/Services";
import ServiceSummary from "@/sections/ServiceSummary";
import ReactLenis from "lenis/react";
import About from "@/sections/About";
import Works from "@/sections/Works";
import ContactSummary from "@/sections/ContactSummary";
import Contact from "@/sections/Contact";
import ProgressGuard from "@/components/ProgressGuard";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <ProgressGuard>
      <ReactLenis root className='tracking-wider'>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </ReactLenis>
    </ProgressGuard>
  );
}
