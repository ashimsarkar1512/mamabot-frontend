import React from "react";
import Image from "next/image";
import { ChevronRight, ArrowDown } from "lucide-react";

// --- MOCK DATA ---
const ARTICLES_DATA = [
  {
    id: 1,
    title: "How to Speed Up Vaginal Delivery Recovery",
    description: "Expert tips for faster healing after natural birth...",
    category: "Recovery",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", // Placeholder for Recovery Tips graphic
  },
  {
    id: 2,
    title: "Pelvic Floor Care After Birth",
    description: "Essential exercises to strengthen your pelvic floor...",
    category: "Exercise",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400", // Placeholder for Anatomy graphic
  },
  {
    id: 3,
    title: "Managing Postpartum Bleeding and Cramping",
    description: "What's normal and when to seek medical help...",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400", // Placeholder for medical/health context
  },
  {
    id: 4,
    title: "When to Start Light Exercises",
    description: "Safe timeline for resuming physical activity...",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400", // Placeholder for yoga/fitness
  },
  {
    id: 5,
    title: "Understanding Newborn Sleep Patterns",
    description: "Learn about your baby's sleep cycles and needs...",
    category: "Baby Care",
    image:
      "https://images.unsplash.com/photo-1523294587484-5b553497b2c9?auto=format&fit=crop&q=80&w=400", // Placeholder for baby sleeping
  },
  {
    id: 6,
    title: "How to Stay Emotionally Balanced",
    description: "Managing the emotional rollercoaster of new motherhood...",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1494173853114-8a1768853a47?auto=format&fit=crop&q=80&w=400", // Placeholder for emotional support
  },
];

const ArticleCard = ({ article }: { article: (typeof ARTICLES_DATA)[0] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-sky-100 rounded-[24px] hover:shadow-md transition-shadow">
      {/* Article Image */}
      <div className="relative w-full md:w-[160px] h-[140px] flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-col justify-between py-1">
        <div>
          <span className="inline-block px-3 py-1 bg-[#E1F3FB] text-[#2D88C8] text-[10px] font-bold rounded-full mb-2">
            {article.category}
          </span>
          <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {article.description}
          </p>
        </div>

        <button className="flex items-center gap-1 text-[#2D88C8] text-sm font-semibold mt-3 hover:translate-x-1 transition-transform w-fit">
          Read More <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const VaginalDeliveryArticles = () => {
  return (
    <section className="w-full bg-[#F8FBFE] px-6 py-10 rounded-[40px] border border-white! my-8">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold mb-8 px-2">
          Top Articles For Vaginal Delivery
        </h2>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ARTICLES_DATA.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <div className="w-10 h-10 rounded-full border border-sky-200 flex items-center justify-center bg-white shadow-sm hover:bg-sky-50 cursor-pointer transition-colors">
            <ArrowDown className="w-5 h-5 text-sky-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaginalDeliveryArticles;
