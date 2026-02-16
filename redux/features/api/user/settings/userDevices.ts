import { baseApi } from "../../baseApi";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserDevice {
  id: number;
  user_id: number;
  device_type: string;
  device_name: string;
  last_active_at: string;
  is_active: number;
  user: User;
}

export interface UserDevicesResponse {
  success: boolean;
  message: string;
  data: UserDevice[];
}

export const userDevicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDevices: builder.query<UserDevicesResponse, void>({
      query: () => ({
        url: "/user-devices",
        method: "GET",
      }),
      providesTags: ["UserDevices"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserDevicesQuery } = userDevicesApi;
