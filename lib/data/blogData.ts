export interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  slug?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Nutrition",
    title: "Essential Nutrients for a Healthy Pregnancy",
    slug: "essential-nutrients-for-a-healthy-pregnancy",
    description:
      "Discover the vital folic acid and iron you need during pregnancy support your baby's development and how to get them through diet.",
    image: "/images/blog/blog1.png",
    buttonText: "Read Now",
  },
  {
    id: 2,
    category: "Baby Care",
    title: "Understanding Baby Sleep Patterns: A Month-by-Month Guide",
    slug: "understanding-baby-sleep-patterns-a-month-by-month-guide",
    description:
      "Baby sleep can be confusing for new parents. This comprehensive guide breaks down what to expect each month, from newborn sleep cycles to establishing healthy sleep habits.",
    image: "/images/blog/blog2.png",
    buttonText: "Read Now",
  },
  {
    id: 3,
    category: "Exercise",
    title: "Safe Exercise Routines for Each Trimester",
    slug: "safe-exercise-routines-for-each-trimester",
    description:
      "Staying active during pregnancy offers numerous benefits for both you and your baby. Discover trimester-specific exercises that are safe, effective, and help prepare your body for labor.",
    image: "/images/blog/blog3.png",
    buttonText: "Read Now",
  },
  {
    id: 4,
    category: "Baby Care",
    title: "Bonding with Your Newborn: The First 6 Weeks",
    slug: "bonding-with-your-newborn-the-first-6-weeks",
    description:
      "The postpartum period is a time of profound adjustment and connection. Learn practical techniques for bonding with your baby, understanding their cues, and building secure attachment.",
    image: "/images/blog/blog4.png",
    buttonText: "Read Now",
  },
  {
    id: 5,
    category: "Mental Health",
    title: "Managing Pregnancy Anxiety: Expert-Approved Strategies",
    slug: "managing-pregnancy-anxiety-expert-approved-strategies",
    description:
      "Feeling anxious during pregnancy is completely normal. Discover evidence-based techniques to manage worry, reduce stress, and maintain emotional well-being throughout your journey.",
    image: "/images/blog/blog5.png",
    buttonText: "Read Now",
  },
  {
    id: 6,
    category: "Pregnancy",
    title: "First Trimester Survival Guide: Tips from Real Moms",
    slug: "first-trimester-survival-guide-tips-from-real-moms",
    description:
      "The first trimester brings unique challenges from morning sickness to fatigue. Real mothers share their tested strategies for navigating weeks 1-12 with more comfort and confidence.",
    image: "/images/blog/blog6.png",
    buttonText: "Read Now",
  },
];
