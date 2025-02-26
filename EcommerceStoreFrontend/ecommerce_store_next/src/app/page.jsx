'use client'
import Slider from "../../components/Slider/Slider";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-full">
        <video className="w-full h-full object-cover" src="video1.mp4" autoPlay loop muted/>
        <div></div>
      </div>
      <Slider/>
    </div>
  );
}
