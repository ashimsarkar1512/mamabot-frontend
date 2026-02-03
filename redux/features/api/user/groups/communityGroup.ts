import { baseApi } from "../../baseApi";


const communityGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all community groups
    getGroup: builder.query({
      query: () => ({
        url: "/community-groups",
        method: "GET",
      }),
      providesTags: ["CommunityGroups"],
    }),

    // POST join community group
    joinGroup: builder.mutation({
      query: (body) => ({
        url: "/groups/join",
        method: "POST",
        body, // { group_id: number }
      }),
      invalidatesTags: ["CommunityGroups"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGroupQuery,
  useJoinGroupMutation,
} = communityGroupsApi;

export default communityGroupsApi;
