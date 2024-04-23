import { Route, Routes } from 'react-router-dom';

import DefaultAppLayout from './layout/DefaultAppLayout';
import { Map } from './components/Page/Maps';
import {
  AllUsers,
  Crop,
  CropTypeList,
  FarmList,
  FieldList,
  HomePage,
  Login,
  PageNotFound,
  Permission,
  Pricing,
  Product,
  Profile,
  Register,
  Schedule,
  UpdateField
} from './pages';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoggedInUser } from './storage/redux/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setLoggedInUser(JSON.parse(user)));
    }
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='login' element={<Login />} />
      <Route path='product' element={<Product />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='app' element={<DefaultAppLayout />}>
        {/* User Routes */}
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/register' element={<Register />} />
        <Route path='user/allUsers' element={<AllUsers />} />
        <Route path='user/allUsers/updateRole/:userId' element={<Permission />} />
        {/* Schedule Routes */}
        <Route path='schedule' element={<Schedule />} />
        {/* Crop Routes */}
        <Route path='crop/myCrops' element={<CropTypeList />} />
        <Route path='crop/growLocations' element={<Crop />} />
        {/* Map Routes */}
        <Route path='map' element={<Map />} />
        {/* Farm Routes  */}
        <Route path='land/farm/allFarms' element={<FarmList />} />
        {/* Field Routes */}
        <Route path='land/field/allFields' element={<FieldList />} />
        <Route path='land/field/updateField/:fieldId' element={<UpdateField />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
