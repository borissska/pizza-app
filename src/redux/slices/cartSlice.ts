import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TPizza } from './pizzasSlice';

interface ICartSliceState {
  totalPrice: number;
  totalCount: number;
  pizzas: TPizza[];
}

const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  let answer: TPizza[] = [];
  let totalPrice: number = 0;
  let totalCount: number = 0;
  if (data) {
    answer = JSON.parse(data);
    totalPrice = answer.reduce((sum: number, obj: TPizza) => sum + obj.price * obj.count, 0);
    totalCount = answer.reduce((sum: number, obj: TPizza) => sum + obj.count, 0);
  }
  return { 
    pizzas: answer, 
    price: totalPrice, 
    count: totalCount 
  };
};

const initialState: ICartSliceState = {
  totalPrice: getCartFromLS().price,
  totalCount: getCartFromLS().count,
  pizzas: getCartFromLS().pizzas,
};

const updateTotal = (state: ICartSliceState) => {
  state.totalPrice = state.pizzas.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalCount = state.pizzas.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<TPizza>) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }

      updateTotal(state);
    },
    removePizza(state, action: PayloadAction<string>) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload);

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.pizzas = state.pizzas.filter((obj) => obj.id !== findItem.id);
        }
      }

      updateTotal(state);
    },
    removePizzas(state, action: PayloadAction<string>) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);

      updateTotal(state);
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartPizzaById = (id: string) => (state: RootState) =>
  state.cart.pizzas.find((obj) => obj.id === id);

export const { addPizza, removePizza, removePizzas, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
