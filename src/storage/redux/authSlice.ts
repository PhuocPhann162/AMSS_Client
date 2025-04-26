import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/interfaces';

export interface AuthState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  user: (function () {
    const user = localStorage.getItem('user');

    if (!user) return undefined;

    try {
      return JSON.parse(user) as User;
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      return undefined;
    }
  })(),
  accessToken: localStorage.getItem('accessToken') || undefined,
  refreshToken: localStorage.getItem('refreshToken') || undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    clearAuth: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUser, setAccessToken, setRefreshToken, clearAuth } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
