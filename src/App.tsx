import { Route, Routes } from 'react-router-dom';

import DefaultAppLayout from './layout/DefaultAppLayout';
import Map from './components/Page/Maps';
import { Crop, HomePage, Login, PageNotFound, Pricing, Product, Register, Schedule } from './pages';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='login' element={<Login />} />
      <Route path='product' element={<Product />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='app' element={<DefaultAppLayout children={undefined} />}>
        <Route path='register' element={<Register />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='crop' element={<Crop />} />
        <Route path='map' element={<Map />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
