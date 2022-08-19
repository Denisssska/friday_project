import {AppThunk} from '../../../reduxStore/reduxStore';
import {
    cardsAPI,
    GetCardsResponseType,
    RequestPayloadCardType
} from '../../../api/cardsDeskAPI';
import {setCardsParamsTC} from "../paramsCardsReducer/paramsCardsReducer";
import {handlerError} from "../../../common/utils/handlerError";

export enum CARD_TYPE {
    GET_CARDS = 'GET_CARDS',
    UPDATE_GRADE = 'UPDATE_GRADE'
}

type initStateType = typeof initState
export const initState = {} as GetCardsResponseType;

export const cardsReducer = (state: initStateType = initState, action: CardAction): initStateType => {
    switch (action.type) {
        case CARD_TYPE.GET_CARDS:
            return {...state, ...action.cards};
        case CARD_TYPE.UPDATE_GRADE:
            return {
                ...state,
                cards: state.cards.map(el => el._id === action.card_id
                    ? {...el, grade: action.grade, shots: action.shots}
                    : el)
            }
        default:
            return state;
    }
};


////Action

export type CardAction = ReturnType<typeof getCardsAC> | ReturnType<typeof updateCardGradeAC>;


export const getCardsAC = (cards: GetCardsResponseType) => ({type: CARD_TYPE.GET_CARDS, cards} as const);
export const updateCardGradeAC = (grade: number, shots: number, card_id: string) => ({
    type: CARD_TYPE.UPDATE_GRADE, grade, shots, card_id
} as const);

/////Thunk

export const createCardTC = (card: RequestPayloadCardType): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.createCard(card);
        dispatch(setCardsParamsTC(card.cardsPack_id));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const updateCardTC = (card: RequestPayloadCardType, cardsPack_id: string | undefined): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.updateCard(card);
    dispatch(setCardsParamsTC(cardsPack_id));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const deleteCardTC = (id: string, cardsPack_id: string | undefined): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.deleteCard(id);
        dispatch(setCardsParamsTC(cardsPack_id));
    } catch (e) {
        handlerError(e, dispatch);
    }
};

export const changeCardGradeTC = (grade: number, card_id: string): AppThunk => async (dispatch) => {
    try {
        const resp = await cardsAPI.changeCardGrade(grade, card_id);
        dispatch(updateCardGradeAC(
            resp.data.updatedGrade.grade, resp.data.updatedGrade.shots, resp.data.updatedGrade.card_id
        ));
    } catch (e) {
        handlerError(e, dispatch);
    }
};