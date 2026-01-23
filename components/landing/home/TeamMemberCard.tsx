import Image from "next/image";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { TeamMember } from "@/lib/data/meetoutteamdata";


const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl shadow-md px-6 py-8 text-center hover:shadow-lg transition">
      {/* Image */}
      <div className="flex justify-center mb-5">
        <div className="w-24 h-24 rounded-full overflow-hidden  shadow">
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold text-gray-900">{member.name}</h3>

      {/* Role */}
      <p className="text-sm text-[#677381] mt-1">{member.role}</p>

      {/* Social icons */}
      <div className="flex justify-center gap-4 mt-5 text-gray-400">
        {member.social.twitter && (
          <a href={member.social.twitter} className="hover:text-primary">
            <Twitter size={16} />
          </a>
        )}
        {member.social.facebook && (
          <a href={member.social.facebook} className="hover:text-primary">
            <Facebook size={16} />
          </a>
        )}
        {member.social.linkedin && (
          <a href={member.social.linkedin} className="hover:text-primary">
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
