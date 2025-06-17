import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://deshi-mart-server.vercel.app/api",
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["category", "product", "brand"],
  endpoints: (builder) => {
    return {
      // all apis here.

      // brand.

      // 1. get brands.
      getBrands: builder.query({
        query: (payload) =>
          `/brand/get?offset=${payload.offset}&limit=${payload.limit}`,
        providesTags: ["brand"],
      }),

      // 2. get brand by id.
      getBrandById: builder.query({
        query: (id) => `/brands/${id}`,
        providesTags: ["brand"],
      }),

      // 3. create brand.
      createBrand: builder.mutation({
        query: (data) => ({
          url: "/brands",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["brand"],
      }),

      // 4. update brand.
      updateBrand: builder.mutation({
        query: ({ id, data }) => ({
          url: `/brands/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["brand"],
      }),

      // 5. delete brand.
      deleteBrand: builder.mutation({
        query: (id) => ({
          url: `/brands/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["brand"],
      }),


      // category.
      // 1. get categories.
      getCategories:builder.query({
        query: (payload) =>
          `/category/get?offset=${payload.offset}&limit=${payload.limit}`,
        providesTags: ["category"],
      }),



      // product.
      // 1. get product.
      getProduct:builder.query({
        query: (payload) =>
          `/product/get?offset=${payload.offset}&limit=${payload.limit}`,
        providesTags: ["product"],
      }),
    };
  },
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetCategoriesQuery,
  useGetProductQuery
} = baseApi;
