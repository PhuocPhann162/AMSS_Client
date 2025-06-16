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
import { AntStyleConfigProviders } from '@/contexts/ant-style-config/ant-style-config-providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AntStyleConfigProviders>
        <AntMessageProvider>
          <App />
          <ToastContainer />
        </AntMessageProvider>
      </AntStyleConfigProviders>
    </Provider>
  </StrictMode>,
);
