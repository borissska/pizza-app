import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TTheIngr } from '../../@types/ingridient_types';
import { TThePizza } from '../../@types/pizza_types';

interface ICartSliceState {
  totalPrice: number;
  totalCount: number;
  pizzas: TThePizza[];
}

const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  let answer: TThePizza[] = [];
  let totalPrice: number = 0;
  let totalCount: number = 0;
  if (data) {
    answer = JSON.parse(data);
    totalPrice = answer.reduce((sum: number, obj: TThePizza) => sum + obj.price * obj.count, 0);
    totalCount = answer.reduce((sum: number, obj: TThePizza) => sum + obj.count, 0);
  }
  return {
    pizzas: answer,
    price: totalPrice,
    count: totalCount,
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
    addPizza(state, action: PayloadAction<TThePizza>) {
      const findItem = state.pizzas.find((obj) => (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size &&
          obj.ingr.toString() === action.payload.ingr.toString()
        ));

      if (findItem) {
        findItem.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }

      updateTotal(state);
    },
    removePizza(state, action: PayloadAction<TThePizza>) {
      const findItem = state.pizzas.find((obj) => (
        obj.id === action.payload.id &&
        obj.type === action.payload.type &&
        obj.size === action.payload.size &&
        obj.ingr.toString() === action.payload.ingr.toString()
      ));

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.pizzas = state.pizzas.filter((obj) => (obj !== findItem));
        }
      }

      updateTotal(state);
    },
    removePizzas(state, action: PayloadAction<TThePizza>) {
      const findItem = state.pizzas.find((obj) => (
        obj.id === action.payload.id &&
        obj.type === action.payload.type &&
        obj.size === action.payload.size &&
        obj.ingr.toString() === action.payload.ingr.toString()
      ));
      state.pizzas = state.pizzas.filter((obj) => (obj !== findItem));

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
export const selectCartPizza =
  (id: number, size: number, type: number, ingr: TTheIngr[]) => (state: RootState) => {
    return state.cart.pizzas.find(
      (obj) => obj.id === id && obj.type === type && obj.size === size && obj.ingr === ingr,
    );
  };

export const { addPizza, removePizza, removePizzas, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
