"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
          {/* You can also use a placeholder video from the web */}
          <source src="https://www.youtube.com/watch?v=ujmEo-tFrsI&list=RDujmEo-tFrsI&start_radio=1" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40"></div>
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-800/30 to-orange-600/30"></div>
      </div>

      {/* Fallback background if video doesn't load */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-800/30 to-orange-600/30"></div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
          RAVE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            REDEFINED
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
          Design that breaks boundaries and defines rebellion
        </p>
        <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-200 transition-colors shadow-lg">
          SHOP NOW
        </button>
      </div>
    </section>
  );
}
