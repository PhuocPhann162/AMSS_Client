import { createSlice } from '@reduxjs/toolkit/react';
import { userModel } from '~/interfaces';

export const emptyUserState: userModel = {
  id: '',
  fullName: '',
  userName: '',
  phoneNumber: '',
  streetAddress: '',
  city: '',
  state: '',
  country: '',
  avatar: '',
  refreshToken: '',
  isActive: true,
  role: '',
  createdAt: '',
  updatedAt: ''
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.userName = action.payload.userName;
      state.phoneNumber = action.payload.phoneNumber;
      state.streetAddress = action.payload.streetAddress;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.country = action.payload.country;
      state.avatar = action.payload.avatar;
      state.refreshToken = action.payload.refreshToken;
      state.isActive = action.payload.isActive;
      state.role = action.payload.role;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    }
  }
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
