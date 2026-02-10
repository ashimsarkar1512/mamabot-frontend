// @/types/user/profile.ts

// ========================================
// USER DASHBOARD TYPES (from useGetUserDashboardQuery)
// ========================================
export interface IUserDashboardData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  totalExaminees: number;
  totalCompletedQuizzes: number;
  upcomingAppointments?: string[];
  recentActivities?: string[];
  // Added fields based on API response
  plan_id?: number | null;
  subscription_plan?: string | null;
  status?: string | null;
  last_activity?: string | null;
  image?: string | null;
}

export interface IUserDashboardResponse {
  success: boolean;
  data: IUserDashboardData;
}

// ========================================
// FULL PROFILE TYPES (from useGetMyProfileQuery)
// ========================================

// Nested user object inside profile
export interface IProfileUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
  is_first_time: boolean;
  accepted_auto_renewal: number;
  accepted_terms: number;
  accepted_withdrawal_waiver: number;
  consent_health_data: number;
  newsletter_opt_in: number;
  email_verified_at: string | null;
  last_seen: string;
  created_at: string;
  updated_at: string;
  plan_id: number | null;
  subscription: any | null;
  subscription_plan: any | null;
  fcm_token: string | null;
  otp: string | null;
  otp_expire_at: string | null;
  deleted_at: string | null;
  image: string | null;
}

// Main profile data structure
export interface IProfileData {
  id: number;
  user_id: number;
  
  // Pregnancy/Postpartum status
  pregnancy_status: "pregnancy" | "postpartum";
  current_week: number;
  postpartum_day: number;
  
  // Medical information
  due_date: string;
  delivery_type: string;
  baby_nickname: string | null;
  doctor_name: string | null;
  hospital_name: string | null;
  address: string;
  
  // Preferences
  dietary_preferences: string;
  product_interest: string;
  support_type: string;
  AI_tone: string;
  language: string;
  
  // Feature flags
  isHydrationGoal: boolean;
  isKickRemind: boolean;
  isWeightTrack: boolean;
  two_factor_auth: boolean;
  
  // Documents
  pregnancy_document: string | null;
  image: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Nested user object
  user: IProfileUser;
}

// Response wrapper
export interface IProfileResponse {
  success: boolean;
  data: IProfileData;
}

// ========================================
// UPDATE PAYLOAD
// ========================================
export interface IUpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  language?: string;
  pregnancy_status?: string;
  due_date?: string;
  current_week?: number;
  baby_nickname?: string;
  doctor_name?: string;
  hospital_name?: string;
  AI_tone?: string;
  support_type?: string;
  product_interest?: string;
  dietary_preferences?: string;
  postpartum_day?: number;
  isKickRemind?: boolean;
  isHydrationGoal?: boolean;
  isWeightTrack?: boolean;
  two_factor_auth?: boolean;
  delivery_type?: "vaginal_delivery" | "cesarean_delivery";
  image?: File | string | null;
}

// ========================================
// HYDRATION TYPES
// ========================================
export interface IHydrationLog {
  id: number;
  user_id: number;
  glass_count: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface IHydrationData {
  glass_count: number;
  date: string;
  logs?: IHydrationLog[];
}

export interface IHydrationResponse {
  success: boolean;
  data: IHydrationData;
}