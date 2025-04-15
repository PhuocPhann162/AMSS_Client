import { createBrowserRouter } from 'react-router-dom';
import { Map, WeatherMap } from './components/Page/Maps';
import {
  AccessDenied,
  AllUsers,
  Crop,
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
  Pricing,
  Product,
  Profile,
  Register,
  RegisterCustomer,
  Schedule,
  Settings,
  StorePage,
  UpdateField,
  WeatherSearch,
} from './pages';
import EnhancedDefaultAppLayout from './layouts/DefaultAppLayout';
import { AuthenticationLayout, HomeLayout } from '@/layouts';
import { SeedCropSuppliers } from './pages/Suppliers/SeedCrops';

const router = createBrowserRouter(
  [
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'product',
          element: <Pricing />,
        },
        {
          path: 'about',
          element: <Product />,
        },
        {
          path: 'store',
          element: <StorePage />,
        },
      ],
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
          path: 'crop/growLocations',
          element: <Crop />,
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

export default router;
