import LoveBgImage from "@/public/images/user/LoveBg.png";
import LeafBgImage from "@/public/images/user/LeafBg.png";
import WomenModel from "@/public/images/user/Model.png";
import Community from "@/public/images/user/community.png";

import Image from "next/image";
import { Search, User } from "lucide-react";

const CommunityLanding = () => {
  return (
    <section className="w-full px-4 py-4">
      <div className="w-full relative bg-[#FBE9F240] border-[3px] border-white! rounded-[32px] overflow-hidden h-[500px] md:h-[250px] lg:h-[380px] xl:h-[480px] flex items-center">
        {/* Left: Leaf/Flower Background */}
        <div className="absolute bottom-0 left-0 w-1/3 h-full z-0 opacity-80 pointer-events-none">
          <Image
            src={LeafBgImage}
            alt="Floral Background"
            className="h-full w-full object-contain object-bottom md:object-bottom-left"
          />
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full z-0 pointer-events-none">
          <Image
            src={LoveBgImage}
            alt="Hearts Background"
            className="h-full w-full object-cover object-bottom-right"
          />
        </div>

        <div className="absolute bottom-0 right-0 md:right-10 lg:right-50 xl:right-65 w-[85%] md:w-[55%] lg:w-[28%] h-[90%] z-10 pointer-events-none">
          <Image
            src={WomenModel}
            alt="Happy Pregnant Woman"
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        <div className="container ml-0 lg:ml-15 relative z-20 h-full">
          <div className="flex flex-col justify-start md:justify-center h-full max-w-2xl px-6 md:px-12 py-6 md:py-10">
            <div className="">
              <div className="mb-2 flex items-center gap-3">
                <div className="shrink-0">
                  <Image src={Community} alt="" height={50} width={50} />
                </div>
                <div className="">
                  <h1 className="text-xl md:text-3xl xl:text-4xl font-medium text-[#2D88C8]">
                    Mamma&apos;s Community
                  </h1>
                  <p className="text-gray-500 font-medium text-xs xl:text-lg mb-2">
                    A supportive space to connect, learn, and grow together
                  </p>
                </div>
              </div>

              {/* Subtitles */}

              <p className="text-gray-800 font-medium text-xs xl:text-lg mb-8">
                Join discussions, share your journey, and get expert-backed
                advice.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/2 lg:w-sm xl:w-xl">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-transparent border border-gray-400 overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-400">
                  <Search size={18} />
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent placeholder-gray-400"
                  type="text"
                  id="search"
                  placeholder="Search, Posts, Groups, Chats & Persons"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityLanding;
