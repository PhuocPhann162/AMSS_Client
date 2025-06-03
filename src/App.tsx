import { RouterProvider } from 'react-router-dom';

import { useGetCountriesQuery } from '@/api';
import { router } from '@/route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCountries } from './storage/redux/countrySlice';

function App() {
  const dispatch = useDispatch();
  const { data } = useGetCountriesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data.result));
    }
  }, [data]);

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
