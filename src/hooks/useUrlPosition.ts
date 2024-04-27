import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const fieldId = searchParams.get('fieldId');
  const polygonId = searchParams.get('polygonId');
  return [fieldId, polygonId, lat, lng];
}
