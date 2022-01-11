export type CarDTO = {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: "gasoline" | "electric";
  thumbnail: string;
  accessories: {
    id: string;
    type: string;
    name: string;
  }[];
  photos: {
    id: string;
    photo: string;
  }[];
};
