import { Route, Routes } from 'react-router-dom';
import { AppLayout, HomePage, Login, PageNotFound, Pricing, Product } from './pages';
import { NavPage } from './components';

function App() {
  return (
    <div>
      <header>
        <NavPage />
      </header>
      <main className='h-screen bg-gradient-to-br from-gray-800 to-gray-700'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='login' element={<Login />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
