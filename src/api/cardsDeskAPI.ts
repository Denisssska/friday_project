import {instance} from './axiosInstance';


export type CardsPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean,
    "name": string
    "path": string
    "grade": number
    "shots": number
    "deckCover": string
    "cardsCount": number
    "type": string
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
}
export type ResponseType = {
    "cardPacks"?: Array<CardsPackType>,
    "page"?: number
    "pageCount"?: number
    "cardPacksTotalCount"?: number
    "minCardsCount"?: number
    "maxCardsCount"?: number
    "token"?: string
    "tokenDeathTime"?: number
}
export type RequestPayloadType = {
    packName?: string // не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: any//number // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string | null //не обязательно
    nameOfButton?: 'MY' | 'ALL'//меняет цвет кнопок MY ,All при нажатии
    dirValue?: boolean
    isFetching?: boolean
}
export type PackResponseType<D = {}> = {
    pack: D
    "token": string
    "tokenDeathTime": number
}
export type CardType = {
    "_id": string
    "cardsPack_id": string
    "user_id": string
    "answer": string
    "question": string
    "grade": number
    "shots": number
    "questionImg": string
    "answerImg": string
    "answerVideo": string
    "questionVideo": string
    "comments": string
    "type": string
    "rating": 0,
    "more_id": string
    "created": string
    "updated": string
    "__v": 0
}
export type CardsGradeType = {
    updatedGrade: {
        "_id": string
        "cardsPack_id": string
        "card_id": string
        "user_id": string
        "grade": number
        "shots": number
        "more_id": string
        "created": string
        "updated": string
        "__v": number
    },
    "token": string
    "tokenDeathTime": number
}

export type GetCardsResponseType = {
    "cards": Array<CardType>,
    "packUserId": string
    "page": number
    "pageCount": number
    "cardsTotalCount": number
    "minGrade": number
    "maxGrade": number
    "token": string
    "tokenDeathTime": number
}

export type RequestPayloadCardType = {
    cardsPack_id?: string | undefined
    _id?: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}

export type GetCardsPayloadType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string | undefined
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
    dirValue?: boolean
}

export const cardsAPI = {
    getCards(payload: RequestPayloadCardType) {
        return instance.get<GetCardsResponseType>('cards/card', {
            params: {...payload}
        });
    },
    createCard(card: RequestPayloadCardType) {
        return instance.post('cards/card', {
            card: {...card}
        });
    },
    updateCard(card: RequestPayloadCardType) {
        return instance.put('cards/card', {
            card: {...card}
        });
    },
    changeCardGrade(grade: number, card_id: string) {
        return instance.put<CardsGradeType>('cards/grade', {grade, card_id})
    },
    deleteCard(id: string) {
        return instance.delete('cards/card', {
            params: {id}
        });
    }
};

export const packsAPI = {
    getPacks(payload: RequestPayloadType) {
        return instance.get<ResponseType>('cards/pack', {
            params: {...payload}
        });
    },
    createPack(name: string, privatePack: boolean, deckCover?: string) {
        return instance.post<PackResponseType<{ 'newCardsPack': CardsPackType }>>('cards/pack', {
            cardsPack: {name, private: privatePack, deckCover}
        });
    },
    updatePack(id: string, name: string, privatePack: boolean, deckCover?: string) {
        return instance.put<PackResponseType<{ 'updatedCardsPack': CardsPackType }>>('cards/pack', {
            cardsPack: {_id: id, name, private: privatePack, deckCover}
        });
    },
    deletePack(id: string) {
        return instance.delete<PackResponseType<{ 'deletedCardsPack': CardsPackType }>>('cards/pack', {
            params: {id}
        });
    }
};