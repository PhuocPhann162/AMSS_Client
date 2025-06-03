import App from '@/App.tsx';
import '@/styles/globals.css';
import '@/styles/satoshi.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './storage/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>,
);
