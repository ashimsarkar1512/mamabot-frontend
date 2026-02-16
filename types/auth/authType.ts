/* eslint-disable @typescript-eslint/no-explicit-any */
// Authentication-related types

// Login request payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Register request payload
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Verify OTP request payload
export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

// Verify OTP response
export interface VerifyOtpResponse {
  message: string;
  success: boolean;
}

// Login response
export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      "plan id"?: string;
      "subscription Plan"?: string;
    };
  };
}

// Register response
export interface RegisterResponse {
  message: string;
  data: {
    user: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
    };
  };
}

// Verify Email request payload
export interface VerifyEmailPayload {
  email: string;
}

// Verify Email response
export interface VerifyEmailResponse {
  message: string;
  success: boolean;
}

// Signup request payload
export interface SignupPayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  accepted_terms: number;
  consent_health_data: number;
  newsletter_opt_in: number;
  accepted_withdrawal_waiver: number;
  accepted_auto_renewal: number;
}

// Signup response
export interface SignupResponse {
  message: string;
  data: {
    user: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
    };
  };
}

// Logout response
export interface LogoutResponse {
  message: string;
  success: boolean;
}

// Forgot Password request payload
export interface ForgotPasswordPayload {
  email: string;
}

// Forgot Password response
export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

// Reset Password request payload
export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  otp?: string | null;
}

// Reset Password response
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}


// Auth state interface
export interface AuthState {
  user: import("../user/userType").User | null;
  userFullInfo?: any;
}

// API user interface (as received from API)
export interface ApiUser {
  _id: string;
  name: string;
  email: string;
}
