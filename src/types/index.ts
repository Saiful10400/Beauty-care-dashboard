 

 
export interface TtableData {
  mode?: "admin" | "vendor";
  name: string;
  tittle: string;
  createRoute: string;
  keyValue: {
    [key: string]: string;
  };
}

