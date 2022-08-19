import {AppThunk} from '../../reduxStore/reduxStore';
import {changePassword} from '../../api/changePasswordAPI';
import {handlerError} from '../../common/utils/handlerError';

export type ChangePasswordStateType = typeof initState;

export enum CHANGE_PASS_TYPE {
    SEND_NEW_PASSWORD = 'SEND_NEW_PASSWORD',
    SEND_CONFIRM_MAIL = 'SEND_CONFIRM_MAIL'
}

export const initState = {
    isNewPasswordSend: false,
    isConfirmationSend: false,
    sentEmail: ''
};

export const changePasswordReducer = (state: ChangePasswordStateType = initState, actions: CreateNewPassAction): ChangePasswordStateType => {
    switch (actions.type) {
        case CHANGE_PASS_TYPE.SEND_NEW_PASSWORD:
            return {...state, isNewPasswordSend: actions.isSend};
        case CHANGE_PASS_TYPE.SEND_CONFIRM_MAIL:
            return {...state, isConfirmationSend: actions.isConfirmationSend, sentEmail: actions.sentEmail};
        default:
            return state;
    }
};

export type CreateNewPassAction = ReturnType<typeof sendPass> | ReturnType<typeof sendConfirmMail>

export const sendPass = (isSend: boolean) => ({
    type: CHANGE_PASS_TYPE.SEND_NEW_PASSWORD, isSend
} as const);

export const sendConfirmMail = (isConfirmationSend: boolean, sentEmail: string) => ({
    type: CHANGE_PASS_TYPE.SEND_CONFIRM_MAIL, isConfirmationSend, sentEmail
} as const);


/////THUNK

export const sendNewPass = (password: string, token: string): AppThunk => async (dispatch) => {
    try {
        await changePassword.createPass(password, token);
        dispatch(sendPass(true));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const mailToRecover = (email: string): AppThunk => async (dispatch) => {
    try {
        await changePassword.forgotPass(email);
        dispatch(sendConfirmMail(true, email));
    } catch (e) {
        handlerError(e, dispatch);
    }
};