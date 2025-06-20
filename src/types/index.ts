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

