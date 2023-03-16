import { TAppState } from '@/types/t-app-state';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;