import {InitStateType} from './packsReducer';

export const allPacks = {
    cardPacks (state: { allPacks: InitStateType} ) {
        return state.allPacks.cardPacks;
    },
    cardPacksTotalCount (state: { allPacks: InitStateType }) {
        return state.allPacks.cardPacksTotalCount;
    },
    minCardsCount (state: { allPacks: InitStateType }) {
        return state.allPacks.minCardsCount;
    },
    maxCardsCount (state: { allPacks: InitStateType }) {
        return state.allPacks.maxCardsCount;
    },
}