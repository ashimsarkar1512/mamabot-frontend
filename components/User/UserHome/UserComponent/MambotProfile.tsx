"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import {Camera, Upload,Save,Trash2, X,ChevronDown,SquarePen,ArrowLeft, Loader2,
} from "lucide-react";
import Image from "next/image";
import {
  useGetMyProfileQuery,
  useGetUserDashboardQuery,
  usePostMyProfileMutation,
} from "@/redux/features/api/user/profile";
import { toast } from "sonner"; // Assuming you use sonner or similar for feedback
import Loading from "@/components/Loading";
import { IUpdateProfilePayload } from "@/types/user/profile";
import ChangePasswordModal from "./ChangePasswordModal";
import { useChangePasswordMutation, useDeleteUserMutation } from "@/redux/features/api/user/PasswordAndUserdelete";
import { handleError, handleSuccess } from "@/lib/data/handdleError";
import Swal from "sweetalert2";

type ToggleState = {
  kickReminders: boolean;
  hydrationGoals: boolean;
  weightTracking: boolean;
  twoFactor: boolean;
};

const MamabotProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/avatar.png");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { data: userProfile } = useGetUserDashboardQuery(undefined);

  const [deleteUser]=useDeleteUserMutation()
  // RTK Query Hooks
  const {data: profileResponse,isLoading,refetch,} = useGetMyProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = usePostMyProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const [toggles, setToggles] = useState<ToggleState>({
    kickReminders: true,
    hydrationGoals: true,
    weightTracking: false,
    twoFactor: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    language: "English",
    pregnancyStatus: "pregnancy",
    dueDate: "",
    currentWeek: "Week 1",
    babyNickname: "",
    doctor: "",
    clinic: "",
    toneOfAI: "Empathetic",
    supportType: "Balanced",
    productInterest: "Eco-Friendly",
    dietaryPreferences: "No Restriction",
    deliveryType: "vaginal_delivery",
    postpartumDay: 0,
  });
  useEffect(() => {
    if (userProfile?.data) {
      const u = userProfile.data;
      setFormData((prev) => ({
        ...prev,
        firstName: u.first_name || "",
        lastName: u.last_name || "",
        email: u.email || "",
        phone: u.phone || "",
      }));
    }
  }, [userProfile]);

  // Sync state with API data
  useEffect(() => {
    if (profileResponse?.success && profileResponse.data) {
      const d = profileResponse.data;
      const u = d.user;
      if (!u) return;

      setFormData((prev) => ({
        ...prev,
        firstName: u.first_name || prev.firstName,
        lastName: u.last_name || prev.lastName,
        email: u.email || prev.email,
        phone: u.phone || prev.phone,
        address: d.address || prev.address,
        language: d.language || prev.language,
        pregnancyStatus: d.pregnancy_status || prev.pregnancyStatus,
        dueDate: d.due_date || prev.dueDate,
        currentWeek: `Week ${d.current_week || 1}`,
        babyNickname: d.baby_nickname || prev.babyNickname,
        doctor: d.doctor_name || prev.doctor,
        clinic: d.hospital_name || prev.clinic,
        toneOfAI: d.AI_tone || prev.toneOfAI,
        supportType: d.support_type || prev.supportType,
        productInterest: d.product_interest || prev.productInterest,
        dietaryPreferences: d.dietary_preferences || prev.dietaryPreferences,
        deliveryType: d.delivery_type || prev.deliveryType,
        postpartumDay: d.postpartum_day || prev.postpartumDay,
      }));

      setToggles({
        kickReminders: d.isKickRemind ?? true,
        hydrationGoals: d.isHydrationGoal ?? true,
        weightTracking: d.isWeightTrack ?? false,
        twoFactor: d.two_factor_auth ?? false,
      });

      setProfileImage("/images/avatar.png"); // Replace if real profile image exists
    }
  }, [profileResponse]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // Handle invalid date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  // --- SAVE LOGIC ---
  const handleSave = async () => {
    try {
      // 1. Clean the week string "Week 5" -> 5
      const weekNumber = parseInt(
        formData.currentWeek.replace("Week ", ""),
        10,
      );

      // 2. Build the payload carefully
      const payload: IUpdateProfilePayload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || undefined, // Send undefined instead of ""
        address: formData.address,
        language: formData.language,
        pregnancy_status: formData.pregnancyStatus,
        // Ensure date is in YYYY-MM-DD format for the server
        due_date: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : undefined,
        current_week: isNaN(weekNumber) ? 1 : weekNumber,
        baby_nickname: formData.babyNickname,
        doctor_name: formData.doctor,
        hospital_name: formData.clinic,
        AI_tone: formData.toneOfAI,
        support_type: formData.supportType,
        product_interest: formData.productInterest,
        dietary_preferences: formData.dietaryPreferences,
        delivery_type: formData.deliveryType as any,
        postpartum_day: Number(formData.postpartumDay) || 0,
        isKickRemind: toggles.kickReminders,
        isHydrationGoal: toggles.hydrationGoals,
        isWeightTrack: toggles.weightTracking,
        two_factor_auth: toggles.twoFactor,
      };

      console.log("Sending Payload:", payload); // Debug this!

      await updateProfile(payload).unwrap();
      setIsEditing(false);
      toast.success("Profile updated!");
      refetch();
    } catch (error: any) {
      // This will help you see the server's specific error message
      const errorMsg = error?.data?.message || "Internal Server Error";
      toast.error(`Update Failed: ${errorMsg}`);
      console.error("Server Error Detail:", error);
    }
  };
  if (isLoading) return <Loading />;

  const handlePasswordChange = async (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {

const payload = {
  current_password: passwords.currentPassword,
  new_password: passwords.newPassword,
  new_password_confirmation: passwords.confirmPassword, // Backend needs this!
};

      const res = await changePassword(payload).unwrap();
      handleSuccess(res.message || "Password changed successfully!");
    } catch (error: any) {
      handleError(error, "Failed to change password");
    }
  };
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      html: `
        <div style="text-align: left; padding: 20px;">
          <p style="color: #666; margin-bottom: 20px;">
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </p>
          <div style="background: #FFF5F5; border-left: 4px solid #E91E63; padding: 15px; border-radius: 8px;">
            <p style="color: #E91E63; font-weight: 600; margin: 0;">
              ⚠️ Warning: All your data will be permanently deleted
            </p>
            <ul style="color: #666; margin: 10px 0 0 20px; font-size: 14px;">
              <li>Profile information</li>
              <li>Pregnancy tracking data</li>
              <li>Chat history</li>
              <li>Saved preferences</li>
            </ul>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E91E63",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Delete My Account",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-6 py-3 rounded-lg font-semibold",
        cancelButton: "px-6 py-3 rounded-lg font-semibold",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser(undefined).unwrap();
      localStorage.clear();
      window.location.replace("/login");
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete account.",
        icon: "error",
        confirmButtonColor: "#E91E63",
        confirmButtonText: "OK",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-3 rounded-lg font-semibold",
        },
      });
    }
  };

  return (
    <div className="py-10 text-gray-700">
      <div className="container mx-auto space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-white/25 rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
          <div className="flex md:items-center gap-5">
            <div className="relative">
              <Image
                src={profileImage}
                alt="profile"
                width={96}
                height={96}
                className="rounded-full h-14 w-14 md:h-24 md:w-24 object-cover shadow-sm"
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
              <h1 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-[#E91E63] font-semibold text-sm">
                {formData.currentWeek} of Pregnancy
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Due Date: {formatDate(formData.dueDate)}
              </p>
            </div>
          </div>

          <button
            disabled={isUpdating}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex items-center gap-2 px-3 md:px-6 py-2.5 rounded-xl border border-pink-100 bg-[#FFF5F8] text-gray-700 font-semibold text-sm cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 size={18} className="animate-spin text-pink-500" />
            ) : isEditing ? (
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
              options={["English", "Bengali", "Spanish", "German"]}
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
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {formData.pregnancyStatus === "pregnancy" && (
              <Select
                label="Current Week"
                name="currentWeek"
                value={formData.currentWeek}
                onChange={handleChange}
                disabled={!isEditing}
                options={Array.from({ length: 45 }, (_, i) => `Week ${i + 1}`)}
              />
            )}
            {formData.pregnancyStatus === "postpartum" && (
              <>
                <Select
                  label="Delivery Type"
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  disabled={!isEditing}
                  options={["vaginal_delivery", "cesarean_delivery"]}
                />
                <Input
                  label="Postpartum Day"
                  name="postpartumDay"
                  type="number"
                  value={formData.postpartumDay}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </>
            )}
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
              onClick={() => isEditing && toggleSwitch("kickReminders")}
            />
            <Toggle
              label="Enable Hydration Goals"
              subLabel="Track daily water intake"
              active={toggles.hydrationGoals}
              onClick={() => isEditing && toggleSwitch("hydrationGoals")}
            />
            <Toggle
              label="Enable Weight Tracking"
              subLabel="Monitor healthy weight gain"
              active={toggles.weightTracking}
              onClick={() => isEditing && toggleSwitch("weightTracking")}
            />
          </div>

          <h3 className="text-[#E91E63] text-sm font-bold uppercase tracking-wide mb-4">
            AI Preferences
          </h3>
          <p className="text-gray-400 text-xs -mt-3 mb-5">
            Customize how Mamabot AI interacts with you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Select
              label="Tone of AI"
              name="toneOfAI"
              value={formData.toneOfAI}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "Friendly Mama",
                "Empathetic",
                "Clinical",
                "Motivational",
                "Calm & Reassuring",
                "Spiritual & Mindful",
              ]}
            />
            <Select
              label="Support Type"
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "Medical Focused",
                "Balanced",
                "Emotional Support",
                "Lifestyle-Focused",
                "Holistic/Wellness",
                "Natural Remedies First",
              ]}
            />
            <Select
              label="Product Interest"
              name="productInterest"
              value={formData.productInterest}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "Eco-Friendly",
                "Budget-Friendly",
                "Premium & Luxury Brands",
                "Doctor-Recommended",
                "Organic / Chemical-Free",
                "Vegan",
                "Minimalist Essentials",
              ]}
            />
            <Select
              label="Dietary Preferences"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "No Restriction",
                "Vegetarian",
                "Vegan",
                "Pescatarian",
                "Gluten-Free",
                "Lactose-Free",
                "Halal",
                "Kosher",
                "Low-Sodium",
                "Show All",
                "Gestational",
              ]}
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
             onClick={handleDeleteAccount}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-50 bg-[#FFF5F5] text-[#E91E63] font-semibold text-sm hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 size={16} /> Delete My Account
            </button>
          </div>
          <Toggle
            label="Two-Factor Authentication"
            subLabel="Add an extra layer of security"
            active={toggles.twoFactor}
            onClick={() => isEditing && toggleSwitch("twoFactor")}
          />
        </Section>
      </div>
      <ChangePasswordModal
  isOpen={isPasswordModalOpen}
  onClose={() => setIsPasswordModalOpen(false)}
  onSubmit={handlePasswordChange}
/>
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
      type="button"
      onClick={onClick}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ease-in-out cursor-pointer ${active ? "bg-[#3EB1E4]" : "bg-gray-300"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${active ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  </div>
);

export default MamabotProfile;
