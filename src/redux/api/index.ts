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
        query: (id) => `/brand/get/${id}`,
        providesTags: ["brand"],
      }),

      // 3. create brand.
      createBrand: builder.mutation({
        query: (data) => ({
          url: "/brand/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["brand"],
      }),

      // 4. update brand.
      updateBrand: builder.mutation({
        query: ({ id, data }) => ({
          url: `/brand/update/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["brand"],
      }),

      // 5. delete brand.
      deleteBrand: builder.mutation({
        query: (id) => ({
          url: `/brand/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["brand"],
      }),

      // category.
      // 1. get categories.
      getCategories: builder.query({
        query: (payload) =>
          `/category/get?offset=${payload.offset}&limit=${payload.limit}`,
        providesTags: ["category"],
      }),
      // 2. create brand.
      createCategory: builder.mutation({
        query: (data) => ({
          url: "/category/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["brand"],
      }),

      // 3. get brand by id.
      getCategoryById: builder.query({
        query: (id) => `/category/get/${id}`,
        providesTags: ["brand"],
      }),
      // 4. update category.
      updateCategory: builder.mutation({
        query: ({ id, data }) => ({
          url: `/category/update/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["category"],
      }),

      // 5. delete category.
      deleteCategory: builder.mutation({
        query: (id) => ({
          url: `/category/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["category"],
      }),

      // product.
      // 1. get product.
      getProduct: builder.query({
        query: (payload) =>
          `/product/get?offset=${payload.offset}&limit=${payload.limit}`,
        providesTags: ["product"],
      }),
      // 2. create brand.
      createProduct: builder.mutation({
        query: (data) => ({
          url: "/product/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["product"],
      }),
      // 3. get product by id.
      getProductById: builder.query({
        query: (id) => `/product/get/${id}`,
        providesTags: ["product"],
      }),
      // 5. delete product.
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/product/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["product"],
      }),
      // 6. update category.
      updateProduct: builder.mutation({
        query: ({ id, data }) => ({
          url: `/product/update/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["product"],
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
  useGetProductQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = baseApi;
