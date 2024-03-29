import { Route, Routes } from 'react-router-dom';
import { HomePage, Login, PageNotFound, Pricing, Product, ProtectedRoute } from './pages';
import DefaultAppLayout from './layout/DefaultAppLayout';
import { Map } from './components';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='login' element={<Login />} />
      <Route path='product' element={<Product />} />
      <Route path='pricing' element={<Pricing />} />
      <Route
        path='app'
        element={
          <ProtectedRoute>
            <DefaultAppLayout children={undefined} />
          </ProtectedRoute>
        }
      >
        <Route path='map' element={<Map />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
