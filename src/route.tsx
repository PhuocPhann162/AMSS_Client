import { AuthenticationLayout } from '@/layouts';
import { HomeLayout } from '@/layouts/home-layout';
import { CareLogsPage } from '@/pages/CareLogs/care-logs-page';
import { CartPage } from '@/pages/cart/cart-page';
import { CommodityDetailPage } from '@/pages/Commodities/commodity-detail-page';
import { LogisticsPage } from '@/pages/logistics/logistics-page';
import { OrderDetailPage } from '@/pages/Orders/order-detail-page';
import { OrdersPage } from '@/pages/Orders/orders-page';
import { HomeProfilePage } from '@/pages/Users/home-profile-page';
import { type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Map, MapboxDirections, WeatherMap } from './components/Page/Maps';
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
import { OrdersManagement } from './pages/Orders/orders-admin-page';
import { PaymentPage } from './pages/payment/payment-page';
import { CommoditySuppliers } from './pages/Suppliers/Commodities';
import { OwnerFarmSuppliers } from './pages/Suppliers/OwnerFarm';
import { SeedCropSuppliers } from './pages/Suppliers/SeedCrops';
import { CouponManagment } from './pages/coupons/coupon-management';

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
      Component: HomeLayout,
      children: [
        { index: true, Component: HomePage },
        {
          path: 'store',
          children: [
            {
              index: true,
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              Component: StorePage,
            },
            {
              path: 'commodity/:id',
              Component: CommodityDetailPage,
            },
            {
              path: 'cart',
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              Component: CartPage,
            },
            {
              path: 'payment',
              Component: PaymentPage,
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
              Component: OrdersPage,
            },
            {
              path: ':id',
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              Component: OrderDetailPage,
            },
            {
              path: ':id/tracking',
              handle: {
                hasHeaderOffset: true,
              } as RouteHandle,
              element: <MapboxDirections />,
            },
          ],
        },
        {
          path: 'profile',
          Component: HomeProfilePage,
          handle: {
            hasHeaderOffset: true,
          } as RouteHandle,
        },
      ],
    },
    {
      path: 'logistics',
      Component: LogisticsPage,
    },
    {
      Component: AuthenticationLayout,
      children: [
        {
          path: 'login',
          Component: Login,
        },
        {
          path: 'register',
          Component: RegisterCustomer,
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
          path: 'crop',
          children: [
            {
              path: 'myCrops',
              children: [
                { index: true, Component: CropTypeList },
                {
                  path: 'cropDetail/:id',
                  Component: CropDetail,
                },
              ],
            },

            {
              path: 'grow-location',
              Component: GrowLocation,
            },
            {
              path: 'identification',
              Component: PlantIdentificationViewer,
            },
            {
              path: 'care-logs',
              Component: CareLogsPage,
            },
          ],
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
              element: <OrdersManagement />,
            },
            {
              path: 'orders/:id',
              element: <OrderDetailPage />,
            },
            {
              path: 'orders/:id/tracking',
              element: <MapboxDirections />,
            },
            {
              path: 'coupons',
              element: <CouponManagment />,
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
