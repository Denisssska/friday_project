import {GetCardsResponseType} from "../../api/cardsDeskAPI";

export const allCards = {
    cards (state: {allCards: GetCardsResponseType}) {
        return state.allCards.cards;
    }
}