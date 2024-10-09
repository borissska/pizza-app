import { TAIngr, TTheIngr } from './ingridient_types';

export type TThePizza = {
  id: number;
  title: string;
  info: string;
  ingr: TTheIngr[];
  price: number;
  imageUrl: string;
  size: number;
  type: number;
  count: number;
};

export type TAPizza = {
  id: number;
  title: string;
  info: string;
  ingr: TAIngr[];
  imageUrl: string;
  price: number[];
  sizes: number[];
  types: number[];
  count: number;
};
