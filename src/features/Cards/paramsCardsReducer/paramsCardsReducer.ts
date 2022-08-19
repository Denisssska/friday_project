import {cardsAPI, GetCardsPayloadType} from '../../../api/cardsDeskAPI';
import {AppThunk} from '../../../reduxStore/reduxStore';
import {initTable} from '../../../app/appReducer';
import {handlerError} from '../../../common/utils/handlerError';
import {getCardsAC} from '../cardsReducer/cardsReducer';

export enum PARAMS_CARDS_TYPE {
    SET_PARAMS = 'SET_PARAMS'
}

const initState = {
    pageCount: 110,
    dirValue: true,
    cardQuestion: ''
} as GetCardsPayloadType;

export const paramsCardsReducer = (state: GetCardsPayloadType = initState, action: ParamsCardsAction): GetCardsPayloadType => {
    switch (action.type) {
        case PARAMS_CARDS_TYPE.SET_PARAMS:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

///Action
export type ParamsCardsAction = ReturnType<typeof setCardsParamsAC>;

export const setCardsParamsAC = (payload: GetCardsPayloadType) => ({
    type: PARAMS_CARDS_TYPE.SET_PARAMS, payload
} as const);


///Thunk

export const setCardsParamsTC = (cardsPack_id: string | undefined): AppThunk => async (dispatch, getState) => {
    dispatch(initTable('initializing'));
    const payload = getState().cardParams;
    try {
        const resp = await cardsAPI.getCards({...payload, cardsPack_id});
        dispatch(getCardsAC(resp.data));
    } catch (e) {
        handlerError(e, dispatch);
    } finally {
        dispatch(initTable('successfully'));
    }
};