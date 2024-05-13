import { Route, Routes } from 'react-router-dom';

import DefaultAppLayout from './layout/DefaultAppLayout';
import { Map, WeatherMap } from './components/Page/Maps';
import {
  AllUsers,
  Crop,
  CropTypeList,
  DashBoard,
  FarmList,
  FieldList,
  FieldSuggestion,
  FieldWeather,
  HomePage,
  Login,
  PageNotFound,
  Permission,
  PlantDetail,
  Pricing,
  Product,
  Profile,
  Register,
  Schedule,
  Settings,
  UpdateField,
  WeatherSearch
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
        {/* DashBoard */}
        <Route path='dashBoard' element={<DashBoard />} />
        {/* User Routes */}
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/settings' element={<Settings />} />
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
        <Route path='map/weather' element={<WeatherMap />} />
        {/* Farm Routes  */}
        <Route path='land/farm/allFarms' element={<FarmList />} />
        {/* Field Routes */}
        <Route path='land/field/allFields' element={<FieldList />} />
        <Route path='land/field/suggestion/:id' element={<FieldSuggestion />} />
        <Route path='land/field/updateField/:id' element={<UpdateField />} />
        <Route path='land/field/weather/:id' element={<FieldWeather />} />
        <Route path='land/field/suggestion/plantDetail/:id' element={<PlantDetail />} />
        {/* Weather */}
        <Route path='weatherSearch' element={<WeatherSearch />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
