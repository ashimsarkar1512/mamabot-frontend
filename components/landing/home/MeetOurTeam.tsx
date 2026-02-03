"use client";

import React from "react";
import TeamCard from "./TeamMemberCard";
import { teamMembers } from "@/lib/data/meetoutteamdata";
import { useGetOurTeamQuery } from "@/redux/features/api/user/OurTeam/OurTeam";

const MeetOurTeam = () => {
  const { data, isLoading, isError } = useGetOurTeamQuery();

  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <p>Loading team members...</p>
      </section>
    );
  }

  if (isError || !data?.success || !data.data.teams.length) {
    return (
      <section className="py-16 text-center">
        <p>Failed to load team members.</p>
      </section>
    );
  }

  const teamMembers = data.data.teams;
  return (
    <section className="bg-[#ffffff]/25 px-5 py-12 border-2 !border-white rounded-xl md:px-10 md:py-24">
      <div className="text-center">
        <h2 className="text-xl mb-4 md:text-[40px]">
          Let's Meet <span className="text-primary">Our Team</span>
        </h2>
        <p className="text-base md:text-lg text-[#677381]">
          "Pregnant in fermentation and the stress of the difficult task ahead.
          Trouble arises from the scythe, but the education was pleasant."
        </p>
      </div>
      {/* team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mt-7 md:mt-14 gap-6">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
