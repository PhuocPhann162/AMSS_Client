import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/interfaces';

export interface AuthState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    clearAuth: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const { setUser, setAccessToken, setRefreshToken, clearAuth } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
