import { RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoggedInUser } from './storage/redux/authSlice';
import router from './route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setLoggedInUser(JSON.parse(user)));
    }
  }, []);

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
