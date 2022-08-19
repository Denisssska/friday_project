import {InitStateType} from './authReducer';

export const authState = {
    isLogin (state: { authState: InitStateType }) {
        return state.authState.isLogin;
    },
    error (state: { authState: InitStateType }) {
        return state.authState.error;
    },
    state (state: { authState: InitStateType }) {
        return state.authState;
    },
    isRegistration (state: { authState: InitStateType }) {
        return state.authState.isRegistration;
    },
    id (state: { authState: InitStateType }) {
        return state.authState._id
    },
    publicCardPacksCount (state: { authState: InitStateType }) {
        return state.authState.publicCardPacksCount;
    }
}