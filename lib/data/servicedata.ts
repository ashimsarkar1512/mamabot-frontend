export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  learnMoreLink: string;
  imagePosition: "left" | "right";
}

export const services: Service[] = [
  {
    id: 1,
    title: "Baby Care Tips",
    description:
      "Our expert team provides detailed baby care guidance and tips to help you navigate every stage of your baby's development. From feeding and sleep routines to developmental milestones, we cover everything you need to ensure your baby thrives in a nurturing environment.",
    image: "/images/service1.png",
    learnMoreLink: "#",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Product Recommendations",
    description:
      "We use our expert network and parenting expertise to test and recommend the best products for you and your baby. From essential baby gear to nursery items, we help you make informed decisions about the products that will support your parenting journey in the best possible way.",
    image: "/images/service2.png",
    learnMoreLink: "#",
    imagePosition: "right",
  },
  {
    id: 3,
    title: "Community Forum",
    description:
      "Our team is available to connect you with a supportive community of parents. We understand that your journey is unique, so we work to build connections that ensure you're never alone in your parenting experience, providing the support and community you deserve.",
    image: "/images/service3.png",
    learnMoreLink: "#",
    imagePosition: "left",
  },
];
