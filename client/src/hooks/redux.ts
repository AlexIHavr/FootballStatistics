import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { dispatchType, storeType } from '../redux/store';

export const useAppDispatch = () => useDispatch<dispatchType>();
export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector;
