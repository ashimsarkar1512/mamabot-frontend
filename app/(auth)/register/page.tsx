"use client";
import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/redux/features/api/auth/authApi";
import { handleError, handleSuccess } from "@/lib/data/handdleError";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [checkboxes, setCheckboxes] = useState({
    privacyPolicy: false,
    healthData: false,
    newsletter: false,
    rightOfWithdrawal: false,
    autoRenewal: false,
  });

  const [signup, { isLoading }] = useSignupMutation();

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      accepted_terms: checkboxes.privacyPolicy,
      consent_health_data: checkboxes.healthData,
      newsletter_opt_in: checkboxes.newsletter,
      accepted_withdrawal_waiver: checkboxes.rightOfWithdrawal,
      accepted_auto_renewal: checkboxes.autoRenewal,
    };

    try {
      const res = await signup(payload).unwrap();
      handleSuccess(res.message || "Registration successful!");

      // Optional: redirect after short delay so user can see toast
      setTimeout(() => {
        router.push("/emailVerification");
      }, 1000);
    } catch (err) {
      handleError(err, "Registration failed. Please try again.");
    }
  };

  //  Button is enabled if any checkbox is true
  const isFormValid = Object.values(checkboxes).some((v) => v);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div onClick={handleBack} className="absolute top-8 left-8">
        <button className="border p-1 rounded-full border-pink-600! cursor-pointer">
          <ArrowLeft className="text-pink-500" size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <Link href="/" className="flex items-center gap-2 mb-6">
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

      <div className="w-full max-w-3xl bg-white/5 rounded-2xl shadow-xl p-8 border">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  size={20}
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Sarah"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  size={20}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Johnson"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                placeholder="01584569874"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  size={20}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/*  Checkboxes keeping design */}
          <div className="space-y-2 pt-3">
            {/* Privacy Policy */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={checkboxes.privacyPolicy}
                onChange={handleCheckboxChange}
                className="w-3 h-3 rounded border-border mt-0.5 accent-primary"
              />
              <label
                htmlFor="privacyPolicy"
                className="text-sm text-foreground/80"
              >
                I have read and accept the{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Terms & Conditions
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Health Data */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="healthData"
                name="healthData"
                checked={checkboxes.healthData}
                onChange={handleCheckboxChange}
                className="w-3 h-3 rounded border-border mt-0.5 accent-primary"
              />
              <label
                htmlFor="healthData"
                className="text-sm text-foreground/80"
              >
                I consent to Mamabot processing my health data (pregnancy week,
                babys age, chat history) to provide personalized advice. I can
                withdraw this consent at any time.{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Learn more
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Newsletter */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={checkboxes.newsletter}
                onChange={handleCheckboxChange}
                className="w-3 h-3 rounded mt-0.5 accent-primary"
              />
              <label
                htmlFor="newsletter"
                className="text-sm text-foreground/80"
              >
                I would like to receive the Mamabot newsletter with tips for
                parents
              </label>
            </div>

            {/* Right of Withdrawal */}
            <div className=" pt-3">
              <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                Premium Subscription Checkout:
              </p>
              <div className=" flex items-start gap-3">
                <input
                  type="checkbox"
                  id="rightOfWithdrawal"
                  name="rightOfWithdrawal"
                  checked={checkboxes.rightOfWithdrawal}
                  onChange={handleCheckboxChange}
                  className="w-3 h-3 rounded border-border mt-1 accent-primary"
                />
                <label
                  htmlFor="rightOfWithdrawal"
                  className="text-sm text-foreground/80"
                >
                  I have read the{" "}
                  <a
                    href="#"
                    className="text-primary font-medium hover:underline"
                  >
                    Right of Withdrawal
                  </a>{" "}
                  and waive my right of withdrawal so I can use the Premium
                  subscription immediately.
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Auto Renewal */}
              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  name="autoRenewal"
                  checked={checkboxes.autoRenewal}
                  onChange={handleCheckboxChange}
                  className="w-3 h-3 rounded border-border mt-0.5 accent-primary"
                />
                <label
                  htmlFor="autoRenewal"
                  className="text-sm text-foreground/80"
                >
                  I accept that the subscription will renew automatically unless
                  I cancel.
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full font-semibold py-3 rounded-lg transition mt-8 ${
              isFormValid
                ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-foreground/80">
            Already have an account?{" "}
            <Link
              className="text-primary font-medium hover:underline"
              href="/login"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
