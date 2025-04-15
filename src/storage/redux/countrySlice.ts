import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Country } from '@/interfaces';

export const initialCountriesState: Country[] = [];

export const countrySlice = createSlice({
  name: 'countryAuth',
  initialState: initialCountriesState,
  reducers: {
    setCountries: (_, action: PayloadAction<Country[]>): Country[] => {
      return action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
