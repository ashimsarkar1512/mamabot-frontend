import { baseApi } from "../baseApi";
import { setCredentials } from "../../slice/authSlice";
import { User } from "@/types/user/userType";
import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
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
            phone: (data.user as { phone?: string }).phone || data.user.email,
            email: data.user.email,
            roles: data.user.roles || ["USER"], // Use roles from API response
            createdAt: data.user.createdAt || new Date().toISOString(),
            updatedAt: data.user.updatedAt || new Date().toISOString(),
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
            phone: (data.user as { phone?: string }).phone || data.user.email,
            email: data.user.email,
            roles: data.user.roles || ["USER"], // Use roles from API response
            createdAt: data.user.createdAt || new Date().toISOString(),
            updatedAt: data.user.updatedAt || new Date().toISOString(),
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
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
