import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state.interface';
import { UIState } from '../../models/ui-state.interface';

const selectUIState = createFeatureSelector<AppState, UIState>('ui');

export const selectModalVisibility = createSelector(
  selectUIState,
  (state) => state.modalVisible
);
