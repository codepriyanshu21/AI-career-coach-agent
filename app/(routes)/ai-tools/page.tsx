import React from 'react';
import AiTools from '../dashboard/_components/AiTools';
// import Image from 'next/image';

const page = () => {
  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg mb-10 overflow-hidden">
        <div className="z-10 relative">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Welcome to AI Career Chat Agents 👋</h1>
          <p className="text-sm md:text-base max-w-xl">
            Discover powerful AI tools designed to guide your career journey. Whether you're a beginner or exploring a specialization, our agents are here to assist you!
          </p>
        </div>
        {/* Decorative image or icon */}
        {/* <div className="absolute right-4 bottom-2 md:right-8 md:bottom-4 opacity-30 md:opacity-70 z-0">
          <Image
            src="/ai-banner.png" // <-- Add this image to your public folder or change the path
            alt="AI Tools"
            width={150}
            height={150}
            className="object-contain"
          />
        </div> */}
      </div>

      {/* Tools Section */}
      <AiTools />
    </div>
  );
};

export default page;
