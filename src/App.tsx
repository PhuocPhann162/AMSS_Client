import { RouterProvider } from 'react-router-dom';

import { useGetCountriesQuery } from '@/api';
import { cancelFrame, frame } from 'framer-motion';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import router from './route';
import { setCountries } from './storage/redux/countrySlice';

function App() {
  const dispatch = useDispatch();
  const { data } = useGetCountriesQuery();

  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data.result));
    }
  }, [data]);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  );
}

export default App;
