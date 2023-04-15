import React from 'react';
import {Button, FormControl, Paper, TextField} from '@mui/material';
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
            <Paper className={style.registrationPaper} elevation={2}>
                <div className={style.registrationPaperContainer}>
                    <h1 className={style.registerH1}>Forgot your password?</h1>
                    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ display:'block', width: 300}} variant="standard">
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
                        </FormControl>
                        {errors?.email && <span style={{color: 'red'}}>{errors.email.message}</span>}

                        <Button variant="contained"
                                type='submit'
                                sx={{
                                    display:'block',
                                    width: 300,
                                    margin: "15% auto 5%",
                                    borderRadius: 5,

                                }}
                        >
                            Send
                        </Button>
                    </form>

                    <h5 style={{textAlign:'center', color: 'gray', marginTop: 30, fontWeight: 'bold'}}>Did you remember your password?</h5>
                    <Link style={{
                        display:'block',
                        color: 'blue',
                        backgroundColor: "transparent",
                        boxShadow: "none",textAlign:'center',marginBottom:'5%'
                    }} to="/">
                        Try logging in
                    </Link>
                </div>
            </Paper>
        </div>
    );
} );