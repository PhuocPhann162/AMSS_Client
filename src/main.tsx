import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/styles/globals.css';
import '@/styles/satoshi.css';
import { Provider } from 'react-redux';
import { store } from './storage/index.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { ConfigProvider } from 'antd';
import { themeConfig } from './configs/ant.configs.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <App />
        <ToastContainer />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
