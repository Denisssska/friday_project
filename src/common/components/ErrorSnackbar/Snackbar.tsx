import React from 'react';
import {AlertProps, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {errorAC} from '../../../features/auth/authReducer';
import {useAppDispatch} from "../../utils/hooks";

export type CustomizedSnackbarsType = {
    errors: string | null
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbars: React.FC<CustomizedSnackbarsType> = React.memo ( ({errors}) => {
    const dispatch = useAppDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickAway') {
            return;
        }
        dispatch(errorAC(null));
    };

    const isOpen = errors !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>

            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {errors}
            </Alert>

        </Snackbar>
    );
} );
