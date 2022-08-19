import {packsAPI, RequestPayloadType} from '../../../api/cardsDeskAPI';
import {AppThunk} from '../../../reduxStore/reduxStore';
import {handlerError} from '../../../common/utils/handlerError';
import {initTable} from '../../../app/appReducer';
import {getPackAC} from "../packsReducer/packsReducer";

export enum PARAMS_TYPE {
    SET_PARAMS = 'SET_PARAMS',
    RESET_SETTINGS = 'RESET_SETTINGS'
}

const initState = {
    pageCount: 5,
    nameOfButton:'ALL',
    packName: ''
} as RequestPayloadType;

export const paramsReducer = (state: RequestPayloadType = initState, action: ParamsAction): RequestPayloadType => {
    switch (action.type) {
        case PARAMS_TYPE.SET_PARAMS:
            return {...state, ...action.payload};
        case PARAMS_TYPE.RESET_SETTINGS:
            return {};
        default:
            return state;
    }
};

///Action
export type ParamsAction =
    | ReturnType<typeof setParamsAC>
    | ReturnType<typeof resetSettingsAC>;

export const setParamsAC = (payload: RequestPayloadType) => ({
    type: PARAMS_TYPE.SET_PARAMS, payload
}as const);

export const resetSettingsAC = () => ({type: PARAMS_TYPE.RESET_SETTINGS} as const);

///Thunk

export const setParamsTC = (): AppThunk => async (dispatch, getState) => {
    dispatch(initTable('initializing'));
    const payload = getState().params;
    try {
        const resp = await packsAPI.getPacks(payload);
        dispatch(getPackAC(resp.data));
    } catch (e) {
        handlerError(e, dispatch);
    } finally {
        dispatch(initTable('successfully'));
    }
};