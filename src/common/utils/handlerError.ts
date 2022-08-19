import {errorAC} from '../../features/auth/authReducer';
import {AppDispatch} from '../../reduxStore/reduxStore';

export const handlerError = (e: any, dispatch: AppDispatch) => {
    const err = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
    dispatch(errorAC(err));
}