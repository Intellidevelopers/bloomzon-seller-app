import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bloomzon-backend-1-q2ud.onrender.com/api/",
  }),
  refetchOnReconnect: true,
  refetchOnFocus: true,
  keepUnusedDataFor: 60,
  tagTypes: ["Chats"],

  endpoints: (build) => ({
    messageView: build.query({
      query: (id) => ({
        url: `/message_view/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Chats", id: "LIST" }],
    }),

    Mymessages: build.query({
      query: () => ({
        url: `/my_messages`,
        method: "GET",
      }),
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Chats", id })),
              { type: "Chats", id: "LIST" },
            ]
          : [{ type: "Chats", id: "LIST" }],
    }),

    send: build.mutation({
      query: ({ body, id }) => ({
        url: `/send_message/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chats", id: "LIST" }],
    }),
  }),
});

export const { useMessageViewQuery, useSendMutation, useMymessagesQuery } =
  ApiSlice;
