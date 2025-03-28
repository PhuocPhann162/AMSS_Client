import { createSlice } from '@reduxjs/toolkit';
import { userModel } from '@/interfaces';

export const emptyUserState: userModel = {
  id: '',
  fullName: '',
  userName: '',
  email: '',
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
  initialState: (JSON.parse(localStorage.getItem('user')!) as userModel) || emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
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
