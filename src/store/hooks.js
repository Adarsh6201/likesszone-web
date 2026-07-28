import { useDispatch, useSelector } from 'react-redux';

/** Pre-typed dispatch hook — use this instead of plain useDispatch */
export const useAppDispatch = () => useDispatch();

/** Pre-typed selector hook — use this instead of plain useSelector */
export const useAppSelector = useSelector;
