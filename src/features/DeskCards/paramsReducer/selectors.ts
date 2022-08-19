import {RequestPayloadType} from '../../../api/cardsDeskAPI';

export const params = {
    userId(state: { params: RequestPayloadType }) {
        return state.params.user_id;
    },
    packName(state: { params: RequestPayloadType }) {
        return state.params.packName;
    },
    pageCount(state: { params: RequestPayloadType }) {
        return state.params.pageCount;
    },
    page(state: { params: RequestPayloadType }) {
        return state.params.page;
    },
    min(state: { params: RequestPayloadType }) {
        return state.params.min;
    },
    max(state: { params: RequestPayloadType }) {
        return state.params.max;
    },
    isMy(state: { params: RequestPayloadType }) {
        return state.params.nameOfButton;
    },
    sortPacks(state: { params: RequestPayloadType }) {
        return state.params.sortPacks;
    },
    dirValue(state: { params: RequestPayloadType }) {
        return state.params.dirValue;
    },
    isFetching (state: { params: RequestPayloadType }) {
        return state.params.isFetching;
    }
}