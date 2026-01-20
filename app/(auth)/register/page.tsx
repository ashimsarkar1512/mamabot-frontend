'use client';

import React from "react"

import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, X } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { formData, checkboxes });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Close Button */}
      <button className="absolute top-6 left-6 text-foreground/60 hover:text-foreground transition">
        <X size={24} />
      </button>

      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 mb-6 flex items-center justify-center">
          <div className="text-4xl">👋</div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Sing Up to Mamabot
        </h1>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
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
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
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

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Email"
                value={formData.username}
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
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
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
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4  pt-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={checkboxes.privacyPolicy}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded border-border mt-0.5 accent-primary"
              />
              <label htmlFor="privacyPolicy" className="text-sm text-foreground/80">
                I have read and accept the{' '}
                <a href="#" className="text-primary font-medium hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary font-medium hover:underline">
                  Terms & Conditions
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="healthData"
                name="healthData"
                checked={checkboxes.healthData}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded border-border mt-0.5 accent-primary"
              />
              <label htmlFor="healthData" className="text-sm text-foreground/80">
                I consent to Mamabot processing my health data (pregnancy week, baby&apos;s age, chat history) to provide me with personalized advice. I can withdraw this consent at any time.{' '}
                <a href="#" className="text-primary font-medium hover:underline">
                  Learn more
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={checkboxes.newsletter}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded  mt-0.5 accent-primary"
              />
              <label htmlFor="newsletter" className="text-sm text-foreground/80">
                I would like to receive the Mamabot newsletter with tips for parents
              </label>
            </div>

            <div className="mt-6 pt-4 ">
              <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                Premium Subscription Checkout:
              </p>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="rightOfWithdrawal"
                  name="rightOfWithdrawal"
                  checked={checkboxes.rightOfWithdrawal}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-border mt-0.5 accent-primary"
                />
                <label htmlFor="rightOfWithdrawal" className="text-sm text-foreground/80">
                  I have read the{' '}
                  <a href="#" className="text-primary font-medium hover:underline">
                    Right of Withdrawal
                  </a>{' '}
                  and expressly waive my right of withdrawal so I can use the Premium subscription immediately.
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  name="autoRenewal"
                  checked={checkboxes.autoRenewal}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-border mt-0.5 accent-primary"
                />
                <label htmlFor="autoRenewal" className="text-sm text-foreground/80">
                  I accept that the subscription will renew automatically unless I cancel.
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition mt-8"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-foreground/80">
            Already have an account?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
