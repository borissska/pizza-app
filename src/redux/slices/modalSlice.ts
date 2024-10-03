import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TAPizza } from './pizzasSlice';

export interface IPizzaSliceState {
  active: boolean;
  pizza: TAPizza | null;
}

const initialState: IPizzaSliceState = {
  active: false,
  pizza: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<TAPizza>) {
      state.pizza = action.payload;
      state.active = true;
    },
    setInactive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
      state = initialState;
    }
  }
});

export const selectPizza = (state: RootState) => state.modal;

export const { setActive, setInactive } = modalSlice.actions;

export default modalSlice.reducer;
