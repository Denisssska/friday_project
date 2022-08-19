import {GetCardsPayloadType} from '../../../api/cardsDeskAPI';

export const cardParams = {
    sortCards(state: { cardParams: GetCardsPayloadType }) {
        return state.cardParams.sortCards;
    },
    cardQuestion(state: { cardParams: GetCardsPayloadType }) {
        return state.cardParams.cardQuestion;
    },
    dirValue(state: { cardParams: GetCardsPayloadType }) {
        return state.cardParams.dirValue;
    },
}