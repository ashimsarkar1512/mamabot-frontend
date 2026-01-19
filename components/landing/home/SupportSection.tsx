import React from 'react';
import { MessageSquare, ShoppingBag, Users } from 'lucide-react';

const SupportSection: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: 'Ask Mamabot',
      description: 'Get instant, medically informed answers to your daily pregnancy questions',
      position: 'left'
    },
    {
      id: 2,
      icon: ShoppingBag,
      title: 'Shop Smart',
      description: "Find personalized product recommendations suited to your baby's stage",
      position: 'right'
    },
    {
      id: 3,
      icon: Users,
      title: 'Join the Community',
      description: 'Connect with real parents and experts across Germany, Austria, and Switzerland',
      position: 'left'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-pink-500 text-sm font-medium">Mamabot</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-pink-500">Mamabot</span> Supports You
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Three powerful ways to navigate your pregnancy journey with confidence
          </p>
        </div>

        {/* Features */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 transform -translate-x-1/2" />

          <div className="space-y-8 md:space-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  feature.position === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Feature Card */}
                <div
                  className={`w-full md:w-5/12 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    feature.position === 'right' ? 'md:ml-auto' : 'md:mr-auto'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Number Circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">
                    {feature.id}
                  </span>
                </div>

                {/* Mobile Number */}
                <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">
                    {feature.id}
                  </span>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;