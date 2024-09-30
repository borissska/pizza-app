import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export enum EStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
}

export type TFetchPizzasArgs = {
  categoryIf: string;
  search: string;
  sortIf: string;
  currentPage: number;
  sortType: string;
}

interface IPizzaSliceState {
  pizzas: TPizza[];
  status: EStatus;
}

const initialState: IPizzaSliceState = {
  pizzas: [],
  status: EStatus.LOADING,
};

export const fetchPizzas = createAsyncThunk<TPizza[], TFetchPizzasArgs>('pizza/fetchPizzas', async (params: TFetchPizzasArgs) => {
  const { categoryIf, sortIf, search, currentPage, sortType } = params;
  const { data } = await axios.get<TPizza[]>(
    `https://66bb5ce96a4ab5edd6383355.mockapi.io/pizzas?page=${currentPage}&limit=8&${categoryIf}&sortBy=${sortType.replace(
      '-',
      '',
    )}&order=${sortIf}${search}`,
  );

  return data;
});

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TPizza[]>) {
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
        ;
        state.pizzas = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
