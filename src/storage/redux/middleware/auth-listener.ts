import {
  clearAuth,
  setAccessToken,
  setRefreshToken,
  setUser,
} from '@/storage/redux/authSlice';
import { RootState } from '@/storage/redux/store';
import { authStorage } from '@/utils/auth-storage';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: isAnyOf(setUser, setAccessToken, setRefreshToken),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { accessToken, refreshToken, user } = state.auth;

    if (accessToken) {
      authStorage.setAccessToken(accessToken);
    }

    if (refreshToken) {
      authStorage.setRefreshToken(refreshToken);
    }

    if (user) {
      authStorage.setUser(user);
    }
  },
});

authListenerMiddleware.startListening({
  actionCreator: clearAuth,
  effect: () => {
    authStorage.clearAll();
  },
});
