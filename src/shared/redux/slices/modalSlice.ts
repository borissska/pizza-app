import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TAPizza, TThePizza } from '../../@types/pizza_types';
import { TTheIngr } from '../../@types/ingridient_types';

export interface IPizzaSliceState {
  active: boolean;
  apizza: TAPizza | null;
  thepizza: TThePizza;
}

const initialState: IPizzaSliceState = {
  active: false,
  apizza: null,
  thepizza: {
    id: 0,
    title: '',
    info: '',
    ingr: [
      {
        ingr_name: '',
        ingr_url: '',
        price: 0,
      },
    ],
    imageUrl: '',
    price: 0,
    size: 0,
    type: 0,
    count: 0,
  },
};

const updateState = (state: IPizzaSliceState) => {
  let sum = 0;
  if (state.apizza) {
    state.thepizza.ingr.forEach((the_el) => {
      if (state.apizza) {
        let new_value = {
          ingr_name: '',
          ingr_url: '',
          price: 0,
        };
        state.apizza.ingr.forEach((a_el) => {
          if (the_el.ingr_name === a_el.ingr_name) {
            new_value = { ingr_name: a_el.ingr_name, ingr_url: a_el.ingr_url, price: a_el.price[state.thepizza.size] };
          }
        });
        for (let i = 0; i < state.thepizza.ingr.length; i++) {
          if (state.thepizza.ingr[i].ingr_name === new_value.ingr_name) {
            state.thepizza.ingr[i] = new_value
          }
        }
      }
    });
    state.thepizza.ingr.forEach((el) => {
      sum += el.price;
    });
    state.thepizza.price = state.apizza.price[state.thepizza.size] + sum;
  }
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<TAPizza>) {
      state.apizza = action.payload;
      state.thepizza.id = state.apizza.id;
      state.thepizza.title = state.apizza.title;
      state.thepizza.info = state.apizza.info;
      state.thepizza.imageUrl = state.apizza.imageUrl;
      state.thepizza.price = state.apizza.price[0];
      state.thepizza.size = state.apizza.sizes[0];
      state.thepizza.type = state.apizza.types[0];
      state.thepizza.count = 0;
      state.active = true;
    },
    setInactive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
      state = initialState;
    },
    setSize(state, action: PayloadAction<number>) {
      state.thepizza.size = action.payload;
      updateState(state);
    },
    setType(state, action: PayloadAction<number>) {
      state.thepizza.type = action.payload;
    },
    addIngr(state, action: PayloadAction<TTheIngr>) {
      state.thepizza.ingr.push(action.payload);
      updateState(state);
    },
    deleteIngr(state, action: PayloadAction<string>) {
      state.thepizza.ingr = state.thepizza.ingr.filter(
        (obj: TTheIngr) => obj.ingr_name !== action.payload,
      );
      updateState(state);
    },
    clearIngr(state) {
      state.thepizza.ingr = initialState.thepizza.ingr;
    }
  },
});

export const selectPizza = (state: RootState) => state.modal;

export const { setActive, setInactive, addIngr, deleteIngr, setSize, setType, clearIngr } = modalSlice.actions;

export default modalSlice.reducer;
