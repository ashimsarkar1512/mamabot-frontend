"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/api/auth/authApi";
import { handleError, handleSuccess } from "@/lib/data/handdleError";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/slice/authSlice";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await login(formData).unwrap();
      handleSuccess(res.message || "Login successful");

      console.log(res, "response");
      dispatch(setUser(res.data.user));

      Cookies.set("token", res.data.token, { path: "/" }); // Optional: for API calls
      Cookies.set("role", res.data.user.role, { path: "/" }); // "Admin" or "User"

      console.log(res,"res")
    

  if (res.data.user.role === "Admin") {
  router.push("/admin-dashboard");
} else if (res.data.user.role === "User") {
  if (res.data.user.subscriptionPlan) {
    router.push("/user-dashboard");
  } else {
    router.push("/pricing");
  }
} else {
  router.push("/");
}

  } catch (error) {
    handleError(error, "Login failed");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    <div onClick={handleBack} className="absolute top-8 left-8">
            <button className="border p-1 rounded-full border-pink-600! cursor-pointer">
              <ArrowLeft className="text-pink-500" size={18} />
            </button>
          </div>

      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/images/icon.png"
              alt="Mamabot"
              width={48}
              height={48}
            />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Login to Momabot
          </h1>
        </div>

        <div className="bg-white/5 rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end ">
                <Link href="/forgot-password">
                  <button
                    type="button"
                    className="text-sm  hover:text-gray-700 transition-colors cursor-pointer underline text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </Link>
              </div>
            </div>

            <CommonButton
              className="w-full"
              text={isLoading ? "Logging in..." : "Log In"}
            />

            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/register" className="text-pink-500 font-medium">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
