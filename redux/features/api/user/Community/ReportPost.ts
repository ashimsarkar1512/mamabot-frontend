import { baseApi } from "../../baseApi";


export interface IReportPostPayload {
  post_id: number;
  report_cause: "spam" | "sexual_content" | "harassment" | "other";
  comment?: string;
}

export interface IReportPostResponse {
  success: boolean;
  message: string;
  total_reports: number;
}

export const reportPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reportPost: builder.mutation<IReportPostResponse, IReportPostPayload>({
      query: (payload) => ({
        url: "/community/posts/report",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Community", "ReportPost"],
    }),
  }),
  overrideExisting: true,
});

export const { useReportPostMutation } = reportPostApi;
