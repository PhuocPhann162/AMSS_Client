import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout, Home, PageNotFound, Pricing, Product } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='product' element={<Product />}></Route>
        <Route path='pricing' element={<Pricing />}></Route>
        <Route path='app' element={<AppLayout />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
