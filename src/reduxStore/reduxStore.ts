import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {CreateNewPassAction, changePasswordReducer} from '../features/ChangePassword/changePasswordReducer';
import {AuthAction, authReducer} from '../features/auth/authReducer';
import {appReducer, InitAppActionsType} from '../app/appReducer';
import {PackAction, packsReducer} from '../features/DeskCards/packsReducer/packsReducer';
import {CardAction, cardsReducer} from '../features/Cards/cardsReducer/cardsReducer';
import {ParamsCardsAction, paramsCardsReducer} from '../features/Cards/paramsCardsReducer/paramsCardsReducer';
import {ParamsAction, paramsReducer} from "../features/DeskCards/paramsReducer/paramsReducer";


export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppActionsType =
    | AuthAction
    | InitAppActionsType
    | CreateNewPassAction
    | PackAction
    | CardAction
    | ParamsAction
    | ParamsCardsAction;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>


const rootReducer = combineReducers({
    changePasswordState: changePasswordReducer,
    authState: authReducer,
    initApp: appReducer,
    allPacks: packsReducer,
    allCards: cardsReducer,
    params: paramsReducer,
    cardParams: paramsCardsReducer
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));