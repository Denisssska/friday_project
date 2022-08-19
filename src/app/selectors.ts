import {InitStateType} from './appReducer';

export const initApp = {
    initTable (state: {initApp: InitStateType}) {
        return state.initApp.initTable;
    },
    isInitialized (state: {initApp: InitStateType}) {
        return state.initApp.isInitialized;
    }
}