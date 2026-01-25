"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import {
  Camera,
  Upload,
  Save,
  Trash2,
  X,
  ChevronDown,
  SquarePen,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
type ToggleState = {
  kickReminders: boolean;
  hydrationGoals: boolean;
  weightTracking: boolean;
  twoFactor: boolean;
};

const MamabotProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const{data}=useGetMyProfileQuery(undefined)
  console.log(data,"user profile ")

  const [toggles, setToggles] = useState<ToggleState>({
    kickReminders: true,
    hydrationGoals: true,
    weightTracking: false,
    twoFactor: true,
  });

  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Collins",
    email: "sarah@mamabot.com",
    phone: "+49 123 456 789",
    address: "1240 Raintree Boulevard, Blaine, Minnesota.",
    language: "English",
    pregnancyStatus: "Pregnancy Phase",
    dueDate: "24-10-25",
    currentWeek: "Week 1",
    babyNickname: "James",
    doctor: "",
    clinic: "",
    toneOfAI: "Empathetic",
    supportType: "Balanced",
    productInterest: "Eco-Friendly",
    dietaryPreferences: "No Restriction",
  });

  const profileRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleSwitch = (key: keyof ToggleState) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAccount = () => {
    // Logic for actual deletion would go here
    setIsDeleteModalOpen(false);
    setIsDeleted(true);
  };

  if (isDeleted) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="bg-white/25 rounded-xl p-10 md:p-16 max-w-3xl w-full shadow-sm border border-gray-100 text-center relative">
          <button
            onClick={() => window.location.reload()}
            className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>

          <div className="w-24 h-24 bg-[#E91E63] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <X size={48} className="text-white stroke-[3px]" />
          </div>

          <h1 className="text-[#E91E63] text-2xl md:text-3xl font-bold mb-2">
            Your Profile Is Permanently Deleted
          </h1>
          <p className="text-gray-400 font-semibold text-lg">
            No Longer Available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-10  text-gray-700">
      <div className="container mx-auto space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-white/25 rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src="/images/avatar.png"
                alt="profile"
                width={96}
                height={96}
                className="rounded-full object-cover shadow-sm"
                priority
              />

              {isEditing && (
                <button
                  onClick={() => profileRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 text-gray-500 hover:text-pink-500 transition-colors"
                >
                  <Camera size={16} />
                </button>
              )}
              <input
                ref={profileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                Sarah Collins
              </h1>
              <p className="text-[#E91E63] font-semibold text-sm">
                Week 3 of Pregnancy
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Due Date: July 15, 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-pink-100 bg-[#FFF5F8] text-gray-700 font-semibold  text-sm cursor-pointer"
          >
            {isEditing ? (
              <>
                <Save size={18} className="text-pink-500" /> Save Changes
              </>
            ) : (
              <>
                <SquarePen size={18} className="text-pink-500" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* PERSONAL INFORMATION */}
        <Section title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div className="relative">
              <Input
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <span className="absolute right-3 bottom-2.5 bg-[#00A651] text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
                Verified
              </span>
            </div>

            <Input
              label="Phone number (optional)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* Address + Language same row */}
            <Input
              label="Address Line"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Select
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              disabled={!isEditing}
              options={["English", "Spanish", "German"]}
            />
          </div>
        </Section>

        {/* PREGNANCY INFORMATION */}
        <Section title="Pregnancy Information" hasUpload>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Select
              label="Pregnancy Status"
              name="pregnancyStatus"
              value={formData.pregnancyStatus}
              onChange={handleChange}
              disabled={!isEditing}
              options={["pregnancy", "postpartum"]}
            />
            <Input
              label="Due Date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="DD-MM-YY"
            />
            <Select
              label="Current Week"
              name="currentWeek"
              value={formData.currentWeek}
              onChange={handleChange}
              disabled={!isEditing}
               options={Array.from({ length: 45 }, (_, i) => `Week ${i + 1}`)}
            />
            <Input
              label="Baby Nickname (Optional)"
              name="babyNickname"
              value={formData.babyNickname}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Doctor Name"
            />
            <Input
              label="Clinic/Hospital"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Hospital Name"
            />
          </div>
        </Section>

        {/* SETTINGS & PREFERENCES */}
        <Section title="Settings & Preferences">
          <h3 className="text-[#E91E63] text-sm font-bold uppercase tracking-wide mb-4">
            Wellness & Health Tracking Preferences
          </h3>
          <p className="text-gray-400 text-xs -mt-3 mb-5">
            Customize your health tracking experience
          </p>

          <div className="space-y-3 mb-8">
            <Toggle
              label="Enable Daily Kick Reminders"
              subLabel="Get notified to track baby movements"
              active={toggles.kickReminders}
              onClick={() => toggleSwitch("kickReminders")}
            />
            <Toggle
              label="Enable Hydration Goals"
              subLabel="Track daily water intake"
              active={toggles.hydrationGoals}
              onClick={() => toggleSwitch("hydrationGoals")}
            />
            <Toggle
              label="Enable Weight Tracking"
              subLabel="Monitor healthy weight gain"
              active={toggles.weightTracking}
              onClick={() => toggleSwitch("weightTracking")}
            />
          </div>

          <h3 className="text-[#E91E63] text-sm font-bold uppercase tracking-wide mb-4">
            AI Preferences
          </h3>
          <p className="text-gray-400 text-xs -mt-3 mb-5">
            Customize how Mamabot AI interacts with you - this improves
            recommendations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Select
              label="Tone of AI"
              name="toneOfAI"
              value={formData.toneOfAI}
              onChange={handleChange}
              disabled={!isEditing}
              options={["Empathetic", "Professional"]}
            />
            <Select
              label="Support Type"
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              disabled={!isEditing}
              options={["Balanced", "Direct"]}
            />
            <Select
              label="Product Interest"
              name="productInterest"
              value={formData.productInterest}
              onChange={handleChange}
              disabled={!isEditing}
              options={["Eco-Friendly", "Premium"]}
            />
            <Select
              label="Dietary Preferences"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              disabled={!isEditing}
              options={["No Restriction", "Vegan", "Gluten-Free"]}
            />
          </div>
        </Section>

        {/* SECURITY & DATA */}
        <Section title="Security & Data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-blue-50 bg-[#F8FBFF] text-gray-700 font-medium text-sm hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Change Password
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-50 bg-[#FFF5F5] text-[#E91E63] font-semibold text-sm hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 size={16} /> Delete My Account
            </button>
          </div>
          <Toggle
            label="Two-Factor Authentication"
            subLabel="Add an extra layer of security"
            active={toggles.twoFactor}
            onClick={() => toggleSwitch("twoFactor")}
          />
        </Section>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-10 max-w-3xl w-full shadow-2xl border border-white/20">
              <h2 className="text-[#E91E63] text-3xl font-bold text-center mb-6">
                Are you absolutely sure?
              </h2>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers, including:
              </p>

              <ul className="space-y-3 mb-8 text-gray-500 text-sm font-medium">
                <li className="flex items-center gap-2">
                  • Your pregnancy journey records
                </li>
                <li className="flex items-center gap-2">
                  • Baby movement tracking history
                </li>
                <li className="flex items-center gap-2">
                  • AI chat conversations
                </li>
                <li className="flex items-center gap-2">
                  • Saved recommendations
                </li>
                <li className="flex items-center gap-2">
                  • Community posts and comments
                </li>
              </ul>

              <div className="mb-8">
                <label className="text-gray-700 text-sm font-bold block mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3.5 rounded-xl bg-white text-gray-800 font-bold border border-gray-100 shadow-sm hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-3.5 rounded-xl bg-[#E91E63] text-white font-bold shadow-lg hover:bg-pink-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD MODAL */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-10 max-w-3xl w-full shadow-2xl border border-white/20">
              <h2 className="text-[#E91E63] text-3xl font-bold text-center mb-6">
                Change Your Password
              </h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-gray-700 text-sm font-bold block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="************"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="************"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold block mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="************"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-3.5 rounded-xl bg-white text-gray-800 font-bold border border-gray-100 shadow-sm hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsPasswordModalOpen(false)} // Add your update logic here
                  className="flex-1 py-3.5 rounded-xl bg-[#E91E63] text-white font-bold shadow-lg hover:bg-pink-700 cursor-pointer"
                >
                  Save & Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* ===== REUSABLE UI SUB-COMPONENTS ===== */
const Section = ({ title, children, hasUpload }: any) => (
  <div className="bg-white/25 rounded-[32px] p-8 shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-[#3EB1E4] text-xl font-bold">{title}</h2>
      {hasUpload && (
        <button className="flex items-center gap-2 text-[#3EB1E4] text-xs font-bold border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <Upload size={14} /> Upload Document
        </button>
      )}
    </div>
    {children}
  </div>
);

const Input = ({ label, disabled, ...props }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-gray-500 text-sm font-medium ml-1">{label}</label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full px-4 py-2.5 rounded-xl border border-blue-50 bg-[#F8FBFF] text-gray-700 outline-none transition-all
        ${disabled ? "opacity-70 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-100 focus:border-blue-200"}
      `}
    />
  </div>
);

const Select = ({ label, options, disabled, ...props }: any) => (
  <div className="flex flex-col gap-1.5 relative">
    <label className="text-gray-500 text-sm font-medium ml-1">{label}</label>
    <div className="relative">
      <select
        {...props}
        disabled={disabled}
        className={`w-full appearance-none px-4 py-2.5 rounded-xl border border-blue-50 bg-[#F8FBFF] text-gray-700 outline-none transition-all
          ${disabled ? "opacity-70 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-100 focus:border-blue-200"}
        `}
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
);

const Toggle = ({ label, subLabel, active, onClick }: any) => (
  <div className="flex items-center justify-between p-4 bg-[#F8FBFF] border border-blue-50 rounded-2xl">
    <div className="flex flex-col">
      <span className="text-gray-800 font-bold text-sm">{label}</span>
      <span className="text-gray-400 text-xs mt-0.5">{subLabel}</span>
    </div>
    <button
      onClick={onClick}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ease-in-out cursor-pointer ${active ? "bg-[#3EB1E4]" : "bg-gray-300"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 cursor-pointery ${active ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  </div>
);

export default MamabotProfile;
