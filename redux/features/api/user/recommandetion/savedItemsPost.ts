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

export const savedItemsPostApi = baseApi.injectEndpoints({
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

export const { useSaveItemMutation } = savedItemsPostApi;

export default savedItemsPostApi;
