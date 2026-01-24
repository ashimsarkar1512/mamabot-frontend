import { Users, MessageSquare, UserStar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GreetingHeader = () => {
  return (
    <>
      <div className="mx-auto container py-6 px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section: Profile & Greeting */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-full shadow-sm">
              <Image
                src="/images/avatar.png"
                alt="User avatar"
                fill
                className="object-cover rounded-full"
                sizes="56px"
                priority
              />
              {/* Green Status Indicator */}
              <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white"></span>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-medium text-slate-800">
                Hi <span className="text-pink-600 font-semibold">Sarah</span>,
                Welcome back to{" "}
                <span className="text-pink-600 font-semibold">Mamabot!</span> 👶
              </h1>
              <p className="text-sm md:text-base text-slate-500 mt-1">
                You are at week 4 of postpartum
              </p>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Pregnancy Period */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors cursor-pointer">
              <div className="p-1 bg-pink-200 rounded-md shadow-sm">
                <UserStar size={18} className="text-pink-500 fill-pink-500" />
              </div>
              <span className="font-medium text-sm">Pregnancy Period</span>
            </button>

            {/* Recovery Tips with Floating Chat Bubble */}
            <div className="relative">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 transition-colors cursor-pointer">
                <div className="p-1 bg-cyan-100 rounded-md shadow-sm">
                  <MessageSquare
                    size={18}
                    className="text-cyan-600 fill-cyan-600"
                  />
                </div>
                <span className="font-medium text-sm">Recovery Tips</span>
              </button>
              {/* Floating Chat Bubble Decor */}
              <span className="absolute -top-3 -right-2 text-sky-300">
                <MessageSquare size={20} className="fill-sky-100" />
              </span>
            </div>

            {/* Community with Baby Decor */}
            <div className="relative">
              <Link
                href="/user-dashboard/community"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 transition-colors cursor-pointer"
              >
                <div className="p-1 bg-pink-100 rounded-md shadow-sm">
                  <Users size={18} className="text-pink-600" />
                </div>
                <span className="font-medium text-sm">Community</span>
              </Link>
              {/* Floating Baby Decor */}
              <span className="absolute -top-2 -right-2 text-pink-300 animate-pulse">
                🌸
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreetingHeader;
