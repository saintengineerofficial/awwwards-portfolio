import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import ServiceSummary from "@/sections/ServiceSummary";

export default function Home() {
  return (
    <div className='tracking-wider'>
      <Navbar />
      <Hero />
      <ServiceSummary />
    </div>
  );
}
