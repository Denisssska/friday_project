import {AppThunk} from '../../../reduxStore/reduxStore';
import {packsAPI, ResponseType} from '../../../api/cardsDeskAPI';
import {initTable} from '../../../app/appReducer';
import {handlerError} from '../../../common/utils/handlerError';
import {setParamsTC} from "../paramsReducer/paramsReducer";

export enum PACK_TYPE {
    GET_PACKS = 'GET_PACK',
    FILTRATION_PACKS = 'FILTRATION_PACKS'
}

export type InitStateType = typeof initState
export const initState = {} as ResponseType;

export const packsReducer = (state: InitStateType = initState, action: PackAction): InitStateType => {
    switch (action.type) {
        case PACK_TYPE.GET_PACKS:
            return {...state, ...action.cardPacks};
        case PACK_TYPE.FILTRATION_PACKS:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

////Action

export type PackAction =
    | ReturnType<typeof getPackAC>
    | ReturnType<typeof filtrationAC>;

export const getPackAC = (cardPacks: ResponseType) => ({type: PACK_TYPE.GET_PACKS, cardPacks} as const);
export const filtrationAC = (payload?: ResponseType) => ({type: PACK_TYPE.FILTRATION_PACKS, payload} as const);

/////Thunk

export const createPackTC = (namePack: string, privatePack: boolean,deckCover?:string): AppThunk => async (dispatch) => {
    dispatch(initTable('initializing'));
    try {
        await packsAPI.createPack(namePack, privatePack,deckCover);
        dispatch(setParamsTC());

    } catch (e) {
        handlerError(e, dispatch);
    } finally {
        dispatch(initTable('successfully'));
    }
};

export const updatePackTC = (packId: string, packName: string, privatePack: boolean,deckCover?:string): AppThunk => async (dispatch) => {
    dispatch(initTable('initializing'));
    try {
        await packsAPI.updatePack(packId, packName, privatePack,deckCover);
        dispatch(setParamsTC());
    } catch (e) {
        handlerError(e, dispatch);
    } finally {
        dispatch(initTable('successfully'));
    }
};

export const deletePackTC = (packId: string): AppThunk => async (dispatch) => {
    dispatch(initTable('initializing'));
    try {
        await packsAPI.deletePack(packId);
        dispatch(setParamsTC());
    } catch (e) {
        handlerError(e, dispatch);
    } finally {
        dispatch(initTable('successfully'));
    }
};

