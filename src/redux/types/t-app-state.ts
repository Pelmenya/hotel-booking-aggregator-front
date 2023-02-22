import { Action, ThunkAction } from '@reduxjs/toolkit';
import { TAppStore } from '../store/store';

export type TAppState = ReturnType<TAppStore['getState']>;

export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TAppState,
  unknown,
  Action
>;