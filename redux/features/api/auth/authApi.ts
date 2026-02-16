import { baseApi } from "../baseApi";
import { setCredentials } from "../../slice/authSlice";
import { User } from "@/types/user/userType";
import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  SignupPayload,
  SignupResponse,
  LogoutResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/types/auth/authType";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Transform API user to match User type
          const transformedUser: User = {
            _id: data.user._id,
            name: data.user.name,
            phone: (data.user as any).phone || data.user.email,
            email: data.user.email,
            roles: (data.user.roles as ("ADMIN" | "USER")[]) || ["USER"],
            createdAt: (data.user as any).createdAt || new Date().toISOString(),
            updatedAt: (data.user as any).updatedAt || new Date().toISOString(),
          };
          dispatch(
            setCredentials({
              user: transformedUser,
            })
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // Register
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Transform API user to match User type
          const transformedUser: User = {
            _id: data.user._id,
            name: data.user.name,
            phone: (data.user as any).phone || data.user.email,
            email: data.user.email,
            roles: (data.user.roles as ("ADMIN" | "USER")[]) || ["USER"],
            createdAt: (data.user as any).createdAt || new Date().toISOString(),
            updatedAt: (data.user as any).updatedAt || new Date().toISOString(),
          };
          // Note: Registration response typically doesn't return an access token
          // In a real app, you might want to redirect to login after registration
          // For demo purposes, we're not setting credentials after registration
          // dispatch(setCredentials({ accessToken: data.message, user: transformedUser }));
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    // Verify OTP
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),

    // Verify Email
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailPayload>({
      query: (credentials) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: credentials,
      }),
    }),

    // Signup (alias for register)
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useVerifyEmailMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

