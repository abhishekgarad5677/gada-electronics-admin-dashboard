// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://prodapi-gadaelectronics.tmkocplay.com/api/Event/",
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().auth.token;  // Getting the token directly from getState
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/user",
        }),
        getPosts: builder.query({
            query: () => "/posts",
        }),
        getallstudentsinfo: builder.mutation({
            query: (data) => ({
                url: "Students/user/getallstudentsinfo",
                method: "POST",
                body: data,
            }),
        }),
        getallcategories: builder.mutation({
            query: (data) => ({
                url: "Category/admin/getallcategories",
                method: "POST",
                body: data,
            }),
        }),
        getLeaderBoard: builder.mutation({
            query: (data) => ({
                url: "admin/get-leaderboard",
                method: "POST",
                body: data,
            }),
        }),
        addEvent: builder.mutation({
            query: (data) => ({
                url: "add-event",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetPostsQuery,
    useGetallstudentsinfoMutation,
    useGetallcategoriesMutation,
    useGetLeaderBoardMutation,
    useAddEventMutation
} = apiSlice;
