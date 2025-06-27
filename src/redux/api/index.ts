import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://kbeauty-touch-server.vercel.app/api",
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: [
    "category",
    "product",
    "brand",
    "general",
    "banner",
    "facebook-reveiw",
    "combo-Offer",
  ],

  endpoints: (builder) => ({
    // ======================== Brand ========================

    // Get all brands
    getBrands: builder.query({
      query: ({ offset, limit }) =>
        `/brand/get?offset=${offset}&limit=${limit}`,
      providesTags: ["brand"],
    }),

    // Get brand by ID
    getBrandById: builder.query({
      query: (id) => `/brand/get/${id}`,
      providesTags: ["brand"],
    }),

    // Create brand
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    // Update brand
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    // Delete brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),

    // ======================== Category ========================

    // Get all categories
    getCategories: builder.query({
      query: ({ offset, limit }) =>
        `/category/get?offset=${offset}&limit=${limit}`,
      providesTags: ["category"],
    }),

    // Get category by ID
    getCategoryById: builder.query({
      query: (id) => `/category/get/${id}`,
      providesTags: ["category"],
    }),

    // Create category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),

    // ======================== Product ========================

    // Get all products
    getProduct: builder.query({
      query: (query) => {
        const queryString = Object.entries(query)
          .map((item) => item.join("="))
          .join("&");

        return `/product/get?${queryString}`;
      },
      providesTags: ["product"],
    }),

    // Get product by ID
    getProductById: builder.query({
      query: (id) => `/product/get/${id}`,
      providesTags: ["product"],
    }),

    // Create product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // ======================== General Settings ========================

    // Get general settings
    getGeneral: builder.query({
      query: () => `/general/get`,
      providesTags: ["general"],
    }),

    // Update general settings
    updateGeneral: builder.mutation({
      query: (data) => ({
        url: `/general/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["general"],
    }),

    // ======================== Banner ========================

    // Get general settings
    getBanner: builder.query({
      query: () => `/banner/get`,
      providesTags: ["banner"],
    }),

    // Update general settings
    updateBanner: builder.mutation({
      query: (data) => ({
        url: `/banner/update/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["banner"],
    }),
    // Create product
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/banner/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    // ======================== Facebook reviews ========================

    // Get facebook reviews
    getFacebookReviews: builder.query({
      query: () => `/facebook-review/get`,
      providesTags: ["facebook-reveiw"],
    }),

    // Update general settings
    deleteFacebookReview: builder.mutation({
      query: ({ id }) => ({
        url: `/facebook-review/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facebook-reveiw"],
    }),
    // Create product
    createFacebookReview: builder.mutation({
      query: (data) => ({
        url: "/facebook-review/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["facebook-reveiw"],
    }),

    // ======================== Offers ========================

    // Get facebook reviews
    getComboOffers: builder.query({
      query: ({ offset, limit }) =>
        `/offer/combo-offer/get?offset=${offset}&limit=${limit}`,
      providesTags: ["combo-Offer"],
    }),

    // delete general settings
    deleteCombo: builder.mutation({
      query: (id) => ({
        url: `/offer/combo-offer/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["combo-Offer"],
    }),

    // Create combo-offer
    createComboOffer: builder.mutation({
      query: (data) => ({
        url: "/offer/combo-offer/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["combo-Offer"],
    }),

    // Create percentage-offer
    createPercentageOffer: builder.mutation({
      query: ({ percentage, ...rest }) => ({
        url: `/offer/percentageOffer/create?percentage=${percentage}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["product"],
    }),

    // delete percentege-offer
    deletePercentageOffer: builder.mutation({
      query: (id) => ({
        url: `offer/percentageOffer/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // Create free gift offer
    creteFreeOfferGift: builder.mutation({
      query: (body) => ({
        url: `/offer/freeGift/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["general"],
    }),

    // delete free gift offer
    deleteFreeOfferGift: builder.mutation({
      query: () => ({
        url: `/offer/freeGift/update`,
        method: "PUT",
        body: { applicable: false },
      }),
      invalidatesTags: ["general"],
    }),
  }),
});

// Export hooks
export const {
  // Brand
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,

  // Category
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Product
  useGetProductQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // General
  useGetGeneralQuery,
  useUpdateGeneralMutation,

  // Banner
  useGetBannerQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,

  // facebook-review
  useGetFacebookReviewsQuery,
  useCreateFacebookReviewMutation,
  useDeleteFacebookReviewMutation,

  // offer
  useGetComboOffersQuery,
  useCreateComboOfferMutation,
  useDeleteComboMutation,
  useCreatePercentageOfferMutation,
  useDeletePercentageOfferMutation,
  useCreteFreeOfferGiftMutation,
  useDeleteFreeOfferGiftMutation,
} = baseApi;
