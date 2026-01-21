"use client";

import {
  Heart,
  Users,
  MessageCircle,
  Droplet,
  Activity,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function UserHomeDashboard() {
  return (
    <div className="min-h-screen mt-8">
      {/* ================= Header ================= */}
     <div className="mx-auto container py-6 px-4">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Section: Profile & Greeting */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-full  shadow-sm">
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
              Hi <span className="text-sky-500 font-semibold">Sarah</span>, 
              Welcome back to <span className="text-pink-500 font-semibold">Mamabot!</span> 👋
            </h1>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              You are in week 22 of pregnancy
            </p>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Postpartum Mode */}
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-50/50 border border-cyan-100 text-cyan-600 hover:bg-cyan-100 transition-colors cursor-pointer">
            <div className="p-1 bg-white rounded-md shadow-sm">
              <MessageSquare size={18} className="text-cyan-400" />
            </div>
            <span className="font-medium text-sm">Postpartum Mode</span>
          </button>

          {/* Recommendations with Floating Icon */}
          <div className="relative">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="p-1 bg-white rounded-md shadow-sm">
                 <Star size={18} className="text-pink-300 fill-pink-300" />
              </div>
              <span className="font-medium text-sm">Recommendations</span>
            </button>
            {/* Floating Chat Bubble Decor */}
            <span className="absolute -top-3 -right-2 text-sky-300">
              <MessageSquare size={20} className="fill-sky-100" />
            </span>
          </div>

          {/* Community with Flower Decor */}
          <div className="relative">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-50/30 border border-pink-100 text-slate-700 hover:bg-pink-50 transition-colors cursor-pointer">
              <div className="p-1 bg-pink-100 rounded-md shadow-sm">
                <Users size={18} className="text-pink-500" />
              </div>
              <span className="font-medium text-sm">Community</span>
            </button>
            {/* Floating Flower Decor */}
            <span className="absolute -top-2 -right-2 text-pink-300 animate-pulse">
              🌸
            </span>
          </div>
          
        </div>
      </div>
    </div>

      {/* ================= Main Content ================= */}
      <main className="mx-auto container py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ========== Left Column ========== */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            {/* Insight */}
            <Card className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-11">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Today's Insight</h3>
                  <p className="text-sm text-muted-foreground">
                    At week 22, your baby's senses are developing rapidly. They
                    can now hear your voice and respond to sounds!
                  </p>
                </div>
              </div>
            </Card>

            {/* Daily Tasks */}
            <Card className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-semibold">Daily Tasks</h3>
              </div>

              <div className="space-y-4">
                {/* Hydration */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b pb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Droplet className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">Mom’s Hydration Goal</p>
                      <p className="text-xs text-muted-foreground">
                        8 of 10 glasses
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={80} className="h-2" />
                  </div>
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary"
                  >
                    Drink
                  </Button>
                </div>

                {/* Baby Movement */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b pb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-5 w-5 rounded-full bg-linear-to-br from-orange-200 to-orange-300" />
                    <div>
                      <p className="font-medium">Monitor Baby Movement</p>
                      <p className="text-xs text-muted-foreground">
                        Count kicks today
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-700"
                  >
                    Monitor
                  </Button>
                </div>

                {/* Health */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Health Status</p>
                      <p className="text-xs text-muted-foreground">
                        Baby’s health according movement
                      </p>
                    </div>
                  </div>
                  <Button className="bg-accent text-white">Healthy</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* ========== Right Column ========== */}
          <div className="space-y-3">
            {/* AI Usage */}
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI Chat Usage</h3>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Queries</span>
                  <span className="font-semibold">4/10</span>
                </div>
                <Progress value={40} className="h-2" />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Upgrade for Unlimited
                </p>
              </div>
            </Card>

            {/* Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Profile Summary</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">Sarah</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stage</p>
                  <p className="font-medium">Week 22</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="font-medium">Free</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs">
                    Free
                  </span>
                </div>
              </div>

              <Button className="w-full mt-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
                ✏️ Edit Profile
              </Button>
            </Card>
          </div>
        </div>

        {/* ================= Articles ================= */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Top <span className="text-primary">Articles</span> For You Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 px-4">
                  {/* ================= Article Image ================= */}
                  <div className="relative w-full h-44 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    <Image
                      src="/images/user/userarticle.png"
                      alt="Pregnancy article"
                      fill
                      priority
                      className=""
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>

                  {/* ================= Content ================= */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">
                        Latest Article
                      </p>
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        5 Ways to Stay Active in the 2nd Trimester
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        Staying active during pregnancy is crucial for both you
                        and your baby. Learn safe and effective exercises...
                      </p>
                    </div>

                    <button className="mt-3 text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="h-10 w-10 rounded-full border hover:bg-muted">
              ↓
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
