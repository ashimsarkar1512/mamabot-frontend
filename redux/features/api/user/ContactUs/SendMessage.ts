import { baseApi } from "../../baseApi";

export interface SendMessagePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  agreed_to_privacy: number;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    message: string;
    agreed_to_privacy: boolean;
    submitted_at: string;
  };
}

export const sendMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendMessageResponse, SendMessagePayload>({
      query: (body) => ({
        url: "/contact/message",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = sendMessageApi;
