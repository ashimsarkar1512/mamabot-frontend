
import React from 'react';
import { Heart, MessageSquare, ShoppingBag, Users } from 'lucide-react';

const SupportSection: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: 'Ask Mamabot',
      description: 'Get instant, medically informed answers to your daily pregnancy questions.',
      position: 'left',
      // Specific colors from screenshot
      color: 'bg-sky-500' 
    },
    {
      id: 2,
      icon: ShoppingBag,
      title: 'Shop Smart',
      description: "Find personalised product recommendations suited to your baby's stage.",
      position: 'right',
      color: 'bg-cyan-700'
    },
    {
      id: 3,
      icon: Users,
      title: 'Join the Community',
      description: 'Connect with real parents and experts across Germany, Austria, and Switzerland.',
      position: 'left',
      color: 'bg-cyan-900'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white/25 rounded-2xl border border-white  my-10">
      
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-1 bg-[#FCE7F3] border border-pink-100 px-3 py-1 rounded-full mb-6">
          <span className="text-pink-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 "> <span><Heart size={16}/></span>Supports</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          How <span className="text-pink-500">Mamabot</span> Supports You
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Three powerful ways to navigate your pregnancy journey with confidence
        </p>
      </div>

      {/* Features Timeline */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* Vertical Connecting Line */}
       <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.75 bg-white transform -translate-x-1/2" />


        <div className="space-y-12 md:space-y-0">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`relative flex flex-col md:flex-row items-center ${
                feature.position === 'right' ? 'md:flex-row-reverse' : ''
              } md:mb-16 last:mb-0`}
            >
              {/* Feature Card */}
              <div className={`w-full md:w-[45%] group`}>
                <div className="bg-white rounded-2xl p-8  border border-gray-50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50/50 flex items-center justify-center ">
                      <feature.icon className="w-6 h-6 text-[#3FB1D3]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-[#6B7280] text-[15px] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Circle (Desktop) */}
              <div className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-11 h-11 rounded-full ${feature.color} items-center justify-center z-10 shadow-sm `}>
                <span className="text-white font-bold text-lg">
                  {feature.id}
                </span>
              </div>

              {/* Mobile Number Indicator */}
              <div className={`md:hidden mb-4 w-10 h-10 rounded-full ${feature.color} flex items-center justify-center text-white font-bold`}>
                {feature.id}
              </div>

              {/* Empty Spacer for alignment */}
              <div className="hidden md:block md:w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;