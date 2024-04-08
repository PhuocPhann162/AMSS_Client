import { Route, Routes } from 'react-router-dom';

import DefaultAppLayout from './layout/DefaultAppLayout';
import Map from './components/Page/Maps';
import {
  AllUsers,
  Crop,
  HomePage,
  Login,
  PageNotFound,
  Permission,
  Pricing,
  Product,
  Profile,
  Register,
  Schedule
} from './pages';

function App() {
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
        <Route path='crop/myCrops' element={<Crop />} />
        <Route path='crop/growLocations' element={<Crop />} />
        {/* Map Routes */}
        <Route path='map' element={<Map />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
