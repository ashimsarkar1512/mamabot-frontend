"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Smile, MoveLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="absolute top-8 left-8">
        <button className="border p-1 rounded-full  border-pink-600!">
          <MoveLeft className="w-4 h-4 text-pink-500" />
        </button>
      </div>

      <div className="w-full max-w-xl">

        
        <div className="flex flex-col items-center mb-10">
           <Link href="/" className="flex items-center gap-2 mb-6 ">
              <Image
                src="/images/icon.png"
                alt="Mamabot"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Login to Momabot
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* <Button
             
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg shadow-pink-500/30 transition-all duration-200"
            >
              Log In
            </Button> */}

            <CommonButton className=" w-full" text="Log In" />

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
            <Link href='/register'>
              <button
                type="button"
                className="text-pink-500 hover:text-pink-600 font-medium transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
