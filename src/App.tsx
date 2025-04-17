import { RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import router from './route';
import { useGetCountriesQuery } from './api';
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
