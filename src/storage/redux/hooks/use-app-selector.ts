import { type RootState } from '@/storage/redux/store';
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
