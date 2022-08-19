import React from 'react';
import {Button, Paper, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {Notification} from './NotificationPage/NotificationPage';
import style from '../auth/Registration/Registration.module.css'
import {mailToRecover} from './changePasswordReducer';
import {passwordState} from './selectors';

type Input = {
    email: string
}

export const ForgotPasswordPage = React.memo ( () => {
    const dispatch = useAppDispatch();
    const isConfirmedSend = useAppSelector(passwordState.isConfirmationSend);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Input>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<Input> = (data) => {
        const {email} = data;
        dispatch(mailToRecover(email));
    };

    if (isConfirmedSend) {
        return <Notification/>
    }

    return (
        <div className={style.registration}>
            <Paper className={style.registrationPaper} elevation={2} style={{height: '350px'}}>
                <div className={style.registrationPaperContainer}>
                    <h1 className={style.registerH1}>Forgot your password?</h1>

                    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField fullWidth label="Email"
                                   id="fullWidth"
                                   variant="standard"
                                   margin="normal"
                                   type='text'
                                   {...register('email', {
                                       required: 'Email is required!',
                                       pattern: {
                                           value: /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i,
                                           message: 'Enter valid email'
                                       }
                                   })}
                        />
                        {errors?.email && <span style={{color: 'red'}}>{errors.email.message}</span>}

                        <Button variant="contained"
                                type='submit'
                                sx={{
                                    width: 300,
                                    marginTop: 5,
                                    borderRadius: 5,
                                    marginLeft: 3,
                                }}
                        >
                            Send
                        </Button>
                    </form>

                    <span style={{color: 'gray', marginTop: 30, fontWeight: 'bold'}}>Did you remember your password?</span>
                    <Link style={{
                        color: 'blue', marginTop: 10,
                        backgroundColor: "transparent",
                        boxShadow: "none"
                    }} to="/">
                        Try logging in
                    </Link>
                </div>
            </Paper>
        </div>
    );
} );