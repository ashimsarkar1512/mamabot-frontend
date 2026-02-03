"use client";
import { Users } from "lucide-react";
import React from "react";
import RecentDiscussion from "./RecentDiscussion";
import WhatUserSay from "./WhatUserSay";

const YoureNotAlone = () => {
  return (
    <div className="px-4 md:px-40 py-8 md:py-16 text-center bg-[#ffffff]/25 rounded-xl shadow-md">
      <div className="bg-[#FCE7F3] text-start md:text-center rounded-full flex justify-center mb-3 items-center mx-auto text-xs w-48 gap-1 px-4 py-2 text-primary">
        <Users width={16} height={16} /> 10,000+ Active Members
      </div>
      <h2 className="text-xl text-start md:text-center md:text-[40px] font-bold mb-3 md:mb-6">
        You're Not Alone
      </h2>
      <p className="text-[#4A5565] text-start md:text-center text-sm md:text-lg mb-7 md:mb-14">
        Join a supportive community of mothers, experts, and mentors across
        Germany, Austria, and Switzerland
      </p>

      <RecentDiscussion />
      <WhatUserSay />
    </div>
  );
};

export default YoureNotAlone;
