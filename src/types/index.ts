 export interface TtableData {
  mode?: "admin" | "vendor";
  name: string;
  tittle: string;
  createRoute: string;
  keyValue: {
    [key: string]: string;
  };
}


export type TBanner = {
  _id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  type: "page" | string; // adjust if there are other possible types
  asset: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};



export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brandId: {
    _id: string;
    name: string;
    description: string;
    logoUrl: string;
    websiteUrl: string;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
  };
  categoryIds: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    isFeatured: boolean;
    imageUrl: string;
  };
  price: number;
  discountPrice: number;
  inStock: boolean;
  images: string[];
  tags: string[];
  rating: number;
  gender: string;
  createdAt: string;
  updatedAt: string;
  haveOffer: boolean;
};


export type TGeneral = {
  _id: string;
  __v: number;
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  aboutUs: string;
  createdAt: string;
  updatedAt: string;
  socialLinks: {
    facebook: string;
    instagram: string;
  };
  freeGift: {
    applicable: boolean;
    buyAbove: number;
    product: {
      _id: string;
      name: string;
      slug: string;
      description: string;
      shortDescription: string;
      brandId: string;
      categoryIds: string;
      price: number;
      discountPrice: number;
      inStock: boolean;
      images: string[];
      tags: string[];
      rating: number;
      createdAt: string;
      updatedAt: string;
      haveOffer: boolean;
    };
  };
};
