import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { EStatus } from '../../@types/enum_types';

export type TAPizza = {
  id: number;
  title: string;
  info: string;
  additives_ingr: string[];
  additives_price: number[][];
  imageUrl: string;
  price: number[];
  sizes: number[];
  types: number[];
  count: number;
};

export type TThePizza = {
  id: number;
  title: string;
  info: string;
  additives_ingr: string[];
  additives_price: number[][];
  price: number;
  imageUrl: string;
  size: number;
  type: number;
  count: number;
};

export type TFetchPizzasArgs = {
  categoryIf: string;
  search: string;
  sortIf: string;
  currentPage: number;
  sortType: string;
};

interface IPizzaSliceState {
  pizzas: TAPizza[];
  status: EStatus;
}

const initialState: IPizzaSliceState = {
  pizzas: [],
  status: EStatus.LOADING,
};

export const fetchPizzas = createAsyncThunk<TAPizza[], TFetchPizzasArgs>(
  'pizza/fetchPizzas',
  async (params: TFetchPizzasArgs) => {
    const { categoryIf, sortIf, search, currentPage, sortType } = params;
    const { data } = await axios.get<TAPizza[]>(
      `https://66bb5ce96a4ab5edd6383355.mockapi.io/pizzas?page=${currentPage}&limit=8&${categoryIf}&sortBy=${sortType.replace(
        '-',
        '',
      )}&order=${sortIf}${search}`,
    );

    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TAPizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = EStatus.LOADING;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = EStatus.SUCCESS;
        state.pizzas = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = EStatus.ERROR;
        state.pizzas = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
