export type CarDTO = {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: string;
    price: number;
  };
  fuel_type: "gasoline" | "electric";
  thumbnail: string;
  accessories: {
    type: string;
    name: string;
  }[];
  photos: string[];
};
