
import { baseApi } from "../baseApi";
import { IUser } from "../auth/authApi";
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, void>({
      query: () => ({
        url: "/my-profile", 
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyProfileQuery } = profileApi;
export default profileApi;
