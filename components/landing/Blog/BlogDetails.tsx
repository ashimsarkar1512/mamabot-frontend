"use client";
import { comfortaa } from "@/app/fonts";
import { blogPosts } from "@/lib/data/blogData";
import {
  ArrowLeft,
  Link2Icon,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import BlogCard from "./BlogCard";

interface BlogDetailsProps {
  post: {
    title: string;
    category: string;
    image: string;
    date?: string;
    author?: string;
    content?: string;
    description?: string;
  };
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ post }) => {
  const router = useRouter();

  return (
    <div className={`${comfortaa.className} min-h-screen pt-18`}>
      {/* Hero Section */}
      <div className="relative w-100 h-50 md:w-375 md:h-173.25  overflow-hidden">
        <Image
          src="/images/blog/blog-details.png"
          fill
          alt={post.title}
          className=" w-full h-full"
          priority
        />

        {/* Category Badge */}
        <div className="absolute top-15 left-40 md:top-70 md:mb-3 mb-6 md:left-178">
          <span className="bg-[#229ECF]/80 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-[10px] md:text-sm font-medium shadow-lg">
            {post.category}
          </span>
        </div>
        <h1 className="hidden md:block md:text-5xl absolute  md:top-85 md:right-30  md:max-w-2xl text-white  font-bold">
          {post.title}
        </h1>
      </div>
      <div className="border-l-2 border-l-black mr-3">
        <p className=" text-xs ml-3">{post.title}</p>
      </div>

      {/* Mobile title (sm only) */}
      <h1 className="block md:hidden text-2xl font-bold text-[#229ECF] mt-10 mb-4">
        {post.title}
      </h1>

      {/* Content Section */}
      <div className=" mx-auto mt-6 md:mt-12 relative z-10">
        {/* Article Content */}
        <div className=" rounded-2xl mb-12">
          <h2 className="text-xl md:text-[32px] text-[#229ECF] font-bold py-3 md:py-6">
            Introduction
          </h2>
          <div className="">
            {/* Main Content */}
            <div className="text-[#303030] space-y-6 text-base md:text-lg leading-relaxed">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <div>
                  <div className="hidden md:block transition-transform duration-300 hover:-translate-y-2 absolute -right-35 top-0 cursor-pointer hover:opacity-80 -translate-y-1/2 pr-10">
                    <Image
                      src="/images/mamabot.png"
                      alt="MamaBot"
                      width={80}
                      height={80}
                      className="drop-shadow-xl"
                    />
                  </div>
                  <div className="text-base md:text-lg ">
                    <p className="mb-5 md:mb-10">
                      Postpartum bleeding and cramping are natural parts of your
                      body’s healing process after giving birth. Whether you had
                      a vaginal delivery or a C-section, your uterus is working
                      to return to its pre-pregnancy size, shed excess tissue,
                      and regulate hormonal changes. These symptoms can feel
                      uncomfortable or even worrying, especially for first-time
                      mothers, but understanding what’s normal can help you
                      recover with confidence.
                    </p>

                    <p className="mb-5 md:mb-10">
                      During the first few weeks after birth, you’ll notice
                      bleeding known as lochia, along with mild to moderate
                      cramping caused by uterine contractions. These experiences
                      vary from mom to mom depending on your delivery type,
                      breastfeeding activity, and your body’s individual pace of
                      healing. Most symptoms gradually ease as the weeks
                      progress, but it’s important to recognize when something
                      doesn’t feel right. Recovering from childbirth takes time,
                      rest, hydration, and awareness of your body’s signals.
                      This guide walks you through what’s normal, what requires
                      attention, and helpful ways to support your healing
                      journey.
                    </p>
                  </div>
                  {/* <h2 className="text-2xl md:text-3xl font-bold text-[#303030] mt-8 mb-4">
                    Key Highlights
                  </h2> */}
                  <p className="font-bold text-lg md:text-xl py-5 ">
                    Cramping—also called afterpains—occurs as your uterus
                    contracts back to its pre-pregnancy size. This process
                    happens more intensely during the first 3–5 days and can
                    feel similar to menstrual cramps.
                  </p>
                  <div className="text-base md:text-lg mb-4">
                    The cramps tend to be stronger if:
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        You are breastfeeding (oxytocin stimulates
                        contractions).
                      </li>
                      <li>You’ve previously given birth.</li>
                      <li>
                        Your bladder is full, causing additional uterine
                        pressure.
                      </li>
                    </ul>
                    <p>
                      Mild to moderate cramping is normal, but severe,
                      persistent pain is not.
                    </p>
                  </div>
                  <div className="md:py-9 py-5  font-semibold text-xl md:text-2xl ">
                    <div className="border-l-3 border-l-black">
                      <p className="ml-3">
                        “Postpartum healing is a journey—slow, steady progress
                        is normal. Listen to your body and rest whenever you
                        need to.”
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xl md:text-[32px] text-[#229ECF] font-bold py-3 md:py-6">
                    How To Support Healing At Home
                  </h2>
                  <div className="text-base md:text-lg">
                    <div className="text-[#4CAF50] font-bold">Do these :</div>
                    <ul className="list-disc pl-6 space-y-2 mb-3 md:mb-6">
                      <li>Rest whenever your body asks for it</li>
                      <li>Stay hydrated to balance blood loss</li>
                      <li>Practice gentle walking to improve circulation</li>
                      <li>
                        Use warm compresses for cramping (avoid incision area)
                      </li>
                      <li>Empty your bladder often to reduce cramping</li>
                      <li>Track your bleeding and symptoms daily</li>
                    </ul>

                    <div className="text-[#FF9800] font-bold">Avoid : </div>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Heavy lifting</li>
                      <li>Strenuous exercise during the first weeks</li>
                      <li>Tampons until fully healed</li>
                      <li>Hot baths during early postpartum</li>
                      <li>Ignoring symptoms that worsen over time</li>
                    </ul>
                    <p>
                      Supporting your recovery ensures that your body heals
                      safely and steadily.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-xl md:text-[32px] text-[#229ECF] font-bold py-3 md:py-6">
                      Conclusion
                    </h2>
                    <p className="text-base md:text-lg">
                      Postpartum bleeding and cramping are normal but can feel
                      overwhelming when you’re recovering physically and
                      adjusting emotionally to life with a newborn.
                      Understanding what to expect and recognizing when symptoms
                      are unusual can help you stay healthy and confident
                      throughout your healing journey. Whether your delivery was
                      vaginal or via C-section, remember that progress is
                      gradual. Prioritize rest, hydration, and gentle care. If
                      something doesn’t feel right, don't hesitate to reach out
                      to a healthcare provider. Your well-being matters every
                      single day of this postpartum phase
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share Button */}
          <div className="flex flex-col gap-1 mt-8 md:mt-16 ">
            <button className="gap-2 text-[#229ECF]  hover:opacity-80 font-medium text-base md:text-xl transition-colors">
              <span>Share this post</span>
            </button>
            <div className="flex text-[#229ECF]  gap-2 items-center justify-center">
              <div className="bg-[#fff] flex justify-center items-center border rounded-full w-5 md:w-8 h-5 md:h-8">
                <Link2Icon width={24} height={24} />
              </div>
              <div className="bg-[#fff] flex justify-center items-center border rounded-full w-5 md:w-8 h-5 md:h-8">
                <Linkedin width={24} height={24} />
              </div>
              <div className="bg-[#fff] flex justify-center items-center border rounded-full w-5 md:w-8 h-5 md:h-8">
                <Twitter width={24} height={24} />
              </div>
              <div className="bg-[#fff] flex justify-center items-center border rounded-full w-5 md:w-8 h-5 md:h-8">
                <Facebook width={24} height={24} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 py-4 md:py-10 items-center">
              <p className="bg-[#DEF0F8] text-base px-2 py-1">
                Postpartum recovery
              </p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">
                Bleeding & Cramping
              </p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">Women's Health</p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">Baby Care</p>
            </div>
          </div>
        </div>

        <div className="mt-4 h-[2px] w-full mx-auto bg-[#BAE1F0]" />
      </div>

      <div className="pt-12 md:pt-24">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl md:text-[32px] font-bold text-[#229ECF]">
            Related Articles
          </h2>
          <button
            onClick={() => router.push("/blog")}
            className="text-base md:text-lg text-[#229ECF] cursor-pointer hover:opacity-80"
          >
            See more
          </button>
        </div>
        <div className="mt-4 mb-5 md:mb-10 h-[2px] w-full mx-auto bg-[#BAE1F0]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
