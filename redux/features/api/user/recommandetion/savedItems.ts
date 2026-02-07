import { baseApi } from "../../baseApi";

export type SavedItemType = "post" | "product" | "article";

export interface SaveItemRequest {
  item_type: SavedItemType;
  item_id: number;
}

export interface SaveItemResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    item_type: SavedItemType;
    item_id: number;
  };
}

export const savedItemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveItem: builder.mutation<SaveItemResponse, SaveItemRequest>({
      query: (body) => ({
        url: "/save-item",
        method: "POST",
        body,
      }),

      invalidatesTags: ["savedItems"],
    }),
  }),
  overrideExisting: false,
});

export const { useSaveItemMutation } = savedItemsApi;

export default savedItemsApi;
