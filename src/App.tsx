import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout, HomePage, Login, PageNotFound, Pricing, Product } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='login' element={<Login />} />
        <Route path='product' element={<Product />}></Route>
        <Route path='pricing' element={<Pricing />}></Route>
        <Route path='app' element={<AppLayout />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
