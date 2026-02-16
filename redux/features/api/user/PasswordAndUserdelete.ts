import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/change-password",
        method: "POST", 
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/delete-user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteUserMutation,
} = authApi;

export default authApi;
