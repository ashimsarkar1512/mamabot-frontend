export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Founder & Pediatrician",
    image: "/images/Team/team1.png",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    role: "Child Development Expert",
    image: "/images/Team/team2.png",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Nutrition Specialist",
    image: "/images/Team/team3.png",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Amanda Thompson",
    role: "Community Manager",
    image: "/images/Team/team4.png",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "Erica Milli",
    role: "Child Development Expert",
    image: "/images/Team/team5.png",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
];
