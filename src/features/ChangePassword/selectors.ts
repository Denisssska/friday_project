import {ChangePasswordStateType} from './changePasswordReducer';

export const passwordState = {
    isConfirmationSend (state: { changePasswordState: ChangePasswordStateType } ) {
        return state.changePasswordState.isConfirmationSend;
    },
    isNewPasswordSend (state: { changePasswordState: ChangePasswordStateType }) {
        return state.changePasswordState.isNewPasswordSend;
    },
    sentEmail (state: { changePasswordState: ChangePasswordStateType }) {
        return state.changePasswordState.sentEmail;
    }
}

