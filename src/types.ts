export type Trip = {
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  unitPrice: number;
  maxCapacity: number;
  reservedCapacity: number;
  yourReservations: number;
  description: string;
  photoLink: string;
  rating: number;
};

export type Filter = {
  name: string;
  country: string[];
  startDate: string;
  endDate: string;
  priceFrom: number;
  priceTo: number;
  rating: number[];
};
