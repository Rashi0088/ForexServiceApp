import { createReducer, on, Action } from '@ngrx/store';
import * as PopupActions from '../actions/popup.actions';

interface PopupState {
    showAddBankDetailsPopup: boolean;
}

export const initialState: PopupState = {
    showAddBankDetailsPopup: false
};

const _popupReducer = createReducer(
    initialState,
    on(PopupActions.openAddBankDetailsPopup, state => ({ ...state, showAddBankDetailsPopup: true })),
    on(PopupActions.closeAddBankDetailsPopup, state => ({ ...state, showAddBankDetailsPopup: false }))
);

export function popupReducer(state: PopupState | undefined, action: Action): PopupState {
    return _popupReducer(state, action);
}
