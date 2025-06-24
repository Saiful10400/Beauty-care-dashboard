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


