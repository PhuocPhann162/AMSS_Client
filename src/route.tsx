import { AuthenticationLayout } from '@/layouts';
import { HomeLayout } from '@/layouts/home-layout';
import { CartPage } from '@/pages/cart/cart-page';
import { CommodityDetailPage } from '@/pages/Commodities/commodity-detail-page';
import { LogisticsPage } from '@/pages/logistics/logistics-page';
import { OrderDetailPage } from '@/pages/Orders/order-detail-page';
import { OrdersPage } from '@/pages/Orders/orders-page';
import { HomeProfilePage } from '@/pages/Users/home-profile-page';
import { type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Map, WeatherMap } from './components/Page/Maps';
import PaymentSuccess from './components/Page/Payment/PaymentSuccess';
import EnhancedDefaultAppLayout from './layouts/default-app-layout';
import {
  AccessDenied,
  AllUsers,
  CropDetail,
  CropTypeList,
  DashBoard,
  FarmList,
  FieldList,
  FieldSuggestion,
  FieldWeather,
  GPASearch,
  HomePage,
  ImportData,
  Login,
  OnlineStore,
  PageNotFound,
  Permission,
  PlantDetail,
  Profile,
  Register,
  RegisterCustomer,
  Schedule,
  Settings,
  StorePage,
  UpdateField,
  WeatherSearch,
} from './pages';
import { CommodityManagement } from './pages/Commodities/CommodityManagement';
import { CreateCommodity } from './pages/Commodities/CreateCommodity';
import { GrowLocation } from './pages/Crops/GrowLocation';
import PlantIdentificationViewer from './pages/Crops/Identification';
import { PaymentPage } from './pages/payment/payment-page';
import { CommoditySuppliers } from './pages/Suppliers/Commodities';
import { OwnerFarmSuppliers } from './pages/Suppliers/OwnerFarm';
import { SeedCropSuppliers } from './pages/Suppliers/SeedCrops';

export interface Route {
  name: string;
  path: string;
  hidden?: boolean;
  element?: ReactNode;
  protected?: boolean;
  children?: Route[];
}

export interface RouteHandle {
  hasHeaderOffset?: boolean;
}

export const router = createBrowserRouter(
  [
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'store',
          children: [
            {
              index: true,
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              element: <StorePage />,
            },
            {
              path: 'commodity/:id',
              element: <CommodityDetailPage />,
            },
            {
              path: 'cart',
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              element: <CartPage />,
            },
            {
              path: 'payment',
              element: <PaymentPage />,
            },
          ],
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              element: <OrdersPage />,
            },
            {
              path: ':id',
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              element: <OrderDetailPage />,
            },
          ],
        },
        {
          path: 'profile',
          element: <HomeProfilePage />,
          handle: {
            hasHeaderOffset: true,
          } as RouteHandle,
        },
      ],
    },
    {
      path: 'logistics',
      element: <LogisticsPage />,
    },
    {
      path: '',
      element: <AuthenticationLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <RegisterCustomer />,
        },
      ],
    },
    // Payment Routes
    {
      path: 'payment',
      children: [
        {
          path: ':orderId/success',
          element: <PaymentSuccess />,
        },
      ],
    },
    {
      path: 'accessDenied',
      element: <AccessDenied />,
    },
    {
      path: 'app',
      element: <EnhancedDefaultAppLayout />,
      children: [
        {
          path: 'dashBoard',
          element: <DashBoard />,
        },
        // User Routes
        {
          path: 'user/profile',
          element: <Profile />,
        },
        {
          path: 'user/settings',
          element: <Settings />,
        },
        {
          path: 'user/register',
          element: <Register />,
        },
        {
          path: 'user/allUsers',
          element: <AllUsers />,
        },
        {
          path: 'user/allUsers/updateRole/:userId',
          element: <Permission />,
        },
        // Schedule Routes
        {
          path: 'schedule',
          element: <Schedule />,
        },
        // Crop Routes
        {
          path: 'crop/myCrops',
          element: <CropTypeList />,
        },
        {
          path: 'crop/myCrops/cropDetail/:id',
          element: <CropDetail />,
        },
        {
          path: 'crop/grow-location',
          element: <GrowLocation />,
        },
        {
          path: 'crop/identification',
          element: <PlantIdentificationViewer />,
        },
        // Map Routes
        {
          path: 'map',
          element: <Map />,
        },
        {
          path: 'map/weather',
          element: <WeatherMap />,
        },
        // Farm Routes
        {
          path: 'land/farm/allFarms',
          element: <FarmList />,
        },
        // Field Routes
        {
          path: 'land/field/allFields',
          element: <FieldList />,
        },
        {
          path: 'land/field/suggestion/:id',
          element: <FieldSuggestion />,
        },
        {
          path: 'land/field/updateField/:id',
          element: <UpdateField />,
        },
        {
          path: 'land/field/weather/:id',
          element: <FieldWeather />,
        },
        {
          path: 'land/field/suggestion/plantDetail/:id',
          element: <PlantDetail />,
        },
        // Weather
        {
          path: 'weatherSearch',
          element: <WeatherSearch />,
        },
        // GPA Routes
        {
          path: 'gpaSearch',
          children: [
            {
              path: 'home',
              element: <GPASearch />,
            },
            {
              path: 'home/:id',
              element: <GPASearch />,
            },
            {
              path: 'importData',
              element: <ImportData />,
            },
          ],
        },
        // Market Routes
        {
          path: 'market',
          children: [
            {
              path: 'dashboard',
              element: <GPASearch />,
            },
            {
              path: 'onlineStore',
              element: <OnlineStore />,
            },
            {
              path: 'orders',
              element: <OnlineStore />,
            },
          ],
        },
        //Supplier Routes
        {
          path: 'supplier',
          children: [
            {
              path: 'seedCrop',
              element: <SeedCropSuppliers />,
            },
            {
              path: 'owner-farm',
              element: <OwnerFarmSuppliers />,
            },
            {
              path: 'commodity',
              element: <CommoditySuppliers />,
            },
          ],
        },
        // Commodity Routes
        {
          path: 'commodity',
          children: [
            {
              path: 'managment',
              element: <CommodityManagement />,
            },
            {
              path: 'create',
              element: <CreateCommodity />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  },
);
