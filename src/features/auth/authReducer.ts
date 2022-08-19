import {AppThunk} from '../../reduxStore/reduxStore';
import {initializedSuccess} from '../../app/appReducer';
import {handlerError} from '../../common/utils/handlerError';
import {PayLoadType, profileAPI, registrationAPI} from '../../api/profileAPI';

export enum AUTH_TYPE {
    SET_LOGIN_DATA = 'SET_LOGIN_DATA',
    LOG_OUT = 'LOG_OUT',
    ERROR = 'ERROR',
    UPDATE = 'UPDATE',
    IS_REGISTRATION = 'IS_REGISTRATION'
}

export type InitStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string | null
    isLogin: boolean
    isRegistration?: boolean
}

export const initState = {
    error: null,
    isRegistration: false
} as InitStateType;

export const authReducer = (state: InitStateType = initState, action: AuthAction): InitStateType => {
    switch (action.type) {
        case AUTH_TYPE.SET_LOGIN_DATA:
            return {...state, ...action.loginACData};
        case AUTH_TYPE.LOG_OUT:
            return {} as InitStateType;
        case AUTH_TYPE.ERROR:
            return {...state, error: action.error};
        case AUTH_TYPE.UPDATE:
            return {...state, ...action.payLoad};
        case AUTH_TYPE.IS_REGISTRATION:
            return {...state, isRegistration: action.isRegistration};
        default:
            return state;
    }
};

////Action

export type AuthAction =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logOutAC>
    | ReturnType<typeof errorAC>
    | ReturnType<typeof updateMeAC>
    | ReturnType<typeof isRegistrationAC>;

export const loginAC = (loginACData: InitStateType) => ({type: AUTH_TYPE.SET_LOGIN_DATA, loginACData} as const);

export const logOutAC = () => ({type: AUTH_TYPE.LOG_OUT} as const);

export const errorAC = (error: string | null) => ({type: AUTH_TYPE.ERROR, error} as const);

export const updateMeAC = (payLoad: PayLoadType) => ({type: AUTH_TYPE.UPDATE, payLoad} as const)

export const isRegistrationAC = (isRegistration: boolean) => ({
    type: AUTH_TYPE.IS_REGISTRATION, isRegistration
} as const);

/////Thunk

export const authMeTC = (): AppThunk => async (dispatch) => {
    try {
        const resp = await profileAPI.authMe();
        const data = {...resp.data, isLogin: true}
        dispatch(loginAC(data));
    } catch (e) {
        console.error(e);
    } finally {
        dispatch(initializedSuccess(true));
    }

};

export const setLoginData = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    try {
        const resp = await profileAPI.login(email, password, rememberMe);
        const data = {...resp.data, isLogin: true};
        dispatch(loginAC(data));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const logOutTC = (): AppThunk => async (dispatch) => {
    try {
        await profileAPI.logOut();
        dispatch(logOutAC());
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const updateMeTC = (payLoad: PayLoadType): AppThunk => async (dispatch) => {
    try {
        const resp = await profileAPI.updateMe(payLoad);
        dispatch(updateMeAC(resp.data.updatedUser));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const setRegistrationDataTC = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        await registrationAPI.registration(email, password);
        dispatch(isRegistrationAC(true));
    } catch (e) {
        handlerError(e, dispatch);
    }
};