import { createReducer, on } from '@ngrx/store';
import { UIState } from '../../models/ui-state.interface';
import * as UiActions from './ui.actions';

const initialState: UIState = {
  modalVisible: false,
};

export const UIReducers = createReducer(
  initialState,
  on(UiActions.toggleNewInvoiceModal, (state) => ({
    ...state,
    modalVisible: !state.modalVisible,
  }))
);
