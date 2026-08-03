
import AboutHighlight from "@/components/home/AboutHighlight"
import ClinicLocations from "@/components/home/ClinicLocations"
import Hero from "@/components/home/Hero"
import { ServicesHighlight } from "@/components/home/services-highlight"
// import { ThreeCanvas } from "@/components/ThreeCanvas"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f4f1ea] text-[#18312b]">
      <main className="  flex flex-col w-screen min-h-screen">
        <Hero />
        
        <AboutHighlight />
        <ClinicLocations />
        <ServicesHighlight />
        
      </main>
      {/* <div className=" absolute flex w-screen h-screen z-50 top-0 inset-0">
        <ThreeCanvas />
      </div> */}
    </div>
  )
}
