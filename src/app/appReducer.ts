export enum APP_TYPE {
    INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS',
    INIT_TABLE = 'INIT_TABLE'
}

export type InitStateType = {
    isInitialized: boolean
    initTable: initTableType
};
export type initTableType = 'idle' | 'initializing' | 'successfully';
export type InitAppActionsType = ReturnType<typeof initializedSuccess> | ReturnType<typeof initTable>;

export const initState: InitStateType = {
    isInitialized: false,
    initTable: 'idle'
};

export const appReducer = (state: InitStateType = initState, action: InitAppActionsType): InitStateType => {
    switch (action.type) {
        case APP_TYPE.INITIALIZED_SUCCESS:
            return {...state, isInitialized: action.init};
        case APP_TYPE.INIT_TABLE:
            return {...state, initTable: action.init};
        default:
            return state;
    }
};

/////Actions

export const initializedSuccess = (init: boolean) => ({type: APP_TYPE.INITIALIZED_SUCCESS, init} as const);
export const initTable = (init: initTableType) => ({type: APP_TYPE.INIT_TABLE, init} as const);
