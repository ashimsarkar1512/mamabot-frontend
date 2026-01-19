// import Button from "@/components/ui/Button";
// import { ChevronRight } from "lucide-react";

// export function HeroSection() {
//   return (
//     <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
//       <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
//         {/* Badge */}
//         <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
//           <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
//           AI Automation for Enterprise
//         </div>

//         {/* Main Heading */}
//         <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
//           <span className="text-foreground">Elevate your</span>
//           <br />
//           <span className="inline-flex items-center justify-center flex-wrap gap-2 mt-4 sm:mt-6 md:mt-8">
//             <span className="text-foreground">Business</span>
//           </span>
//         </h1>

//         {/* Subheading */}
//         <p className="text-base sm:text-xl md:text-2xl text-white text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
//           Cliste helps Irish businesses save time and boost revenue with smart
//           chat, workflows and automations, fully managed for you.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
//           <Button text="Learn More" href="/services" variant="outline" />
//           <Button text="Contact Us" variant="common" href="/contact" />
//           <Button
//             text="Get Started"
//             icon={<ChevronRight className="w-6 h-6" />}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }



'use client'

import Image from 'next/image'

// Replace these with your imported images
const LEFT_IMAGE = '/images/left-decoration.png'
const RIGHT_IMAGE = '/images/right-decoration.png'

export default function HeroSection() {
  return (
    <main className="min-h-screen  max-w-7xl mx-auto">
      {/* Content Container */}
      <div className="relative flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-16">
        
        {/* Left Decoration Image */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/5 max-w-xs">
          <Image
            src="/images/home/right.png"
            alt="Pregnancy illustration"
            width={300}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center max-w-2xl text-center z-10 py-12 md:py-0">
          
          {/* Trust Badge */}
          <div className="mb-8 inline-block">
            <p className="text-sm font-medium text-pink-600 tracking-wide">
              ❤️ Trusted by 5,000+ mothers
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI companion of
            <br />
            Pregnancy &{' '}
            <span className="text-pink-600">Motherhood</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Mamabot combines medical expertise, personalized product recommendations, 
            and a supportive community to guide you through every step of your journey.
          </p>

          {/* CTA Button */}
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Ask Mamabot
          </button>
        </div>

        {/* Right Decoration Image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/5 max-w-xs">
          <Image
            src="/images/home/left.png"
            alt="Motherhood illustration"
            width={300}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  )
}
