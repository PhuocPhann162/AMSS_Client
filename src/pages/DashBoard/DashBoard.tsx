import { useEffect, useState } from 'react';
import { useGeolocation } from '~/hooks';

export const DashBoard = () => {
  const [userPosition, setUserPosition] = useState<[number, number]>();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (!geolocationPosition || geolocationPosition.lat === 0 || geolocationPosition.lng === 0) {
      getPosition();
    }
  }, []);

  useEffect(() => {
    if (geolocationPosition) {
      setUserPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return <div>{userPosition}</div>;
};
