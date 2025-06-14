import App from '@/App.tsx';
import '@/styles/globals.css';
import '@/styles/satoshi.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './storage/index.ts';
import { StrictMode } from 'react';
import { AntMessageProvider } from '@/contexts/ant-message/ant-message-provider.tsx';
import ConfigProvider from 'antd/es/config-provider/index';
import { themeConfig } from '@/configs/ant.configs.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <AntMessageProvider>
          <App />
          <ToastContainer />
        </AntMessageProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
