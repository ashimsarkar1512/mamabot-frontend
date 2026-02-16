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
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    roles?: string[];
  };
}

// Register response
export interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    roles?: string[];
  };
}

// Verify Email request payload
export interface VerifyEmailPayload {
  token: string;
}

// Verify Email response
export interface VerifyEmailResponse {
  message: string;
  success: boolean;
}

// Signup request payload (alias for RegisterPayload)
export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Signup response
export interface SignupResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    roles?: string[];
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
  token: string;
  password: string;
  confirmPassword?: string;
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
