import React from 'react';
import style from '../auth/Registration/Registration.module.css';
import {Button, FormControl, InputLabel, Paper, Input} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Navigate, useLocation} from 'react-router-dom';
import {sendNewPass} from './changePasswordReducer';
import {EndAdornment} from '../../common/components/EndAdornment/EndAdornment';
import {passwordState} from './selectors';

type PasswordField = {
    password: string
}

export const CreatePasswordPage = React.memo ( () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const isSend = useAppSelector(passwordState.isNewPasswordSend);

    const token = location.pathname.split('/')[2];

    //функции для показа/скрытия пароля
    interface State {showPassword: boolean;}
    const [values, setValues] = React.useState<State>({
        showPassword: false,
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<PasswordField>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<PasswordField> = (data) => {
        const {password} = data;
        dispatch(sendNewPass(password, token));
    };

    if (isSend) {
        return <Navigate to='/'/>
    }

    return (
        <div className={style.registration}>
            <Paper className={style.registrationPaper} elevation={2} style={{height: '350px'}}>
                <div className={style.registrationPaperContainer}>
                    <h1 className={style.registerH1}>Create new password</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{m: 1, width: 340}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                {...register('password',
                                    {
                                        required: 'Password is required!',
                                        minLength: {
                                            value: 7, message: 'Password should be min 7 symbols'
                                        },
                                    })}
                                fullWidth
                                type={values.showPassword ? 'text' : 'password'}
                                autoComplete='new-password'
                                endAdornment={<EndAdornment values={values} setValues={setValues}/>}
                            />
                        </FormControl>

                        {errors?.password && <span style={{color: 'red'}}>{errors.password.message}</span>}

                        <Button variant="contained"
                                type='submit'
                                sx={{
                                    width: 300,
                                    marginTop: 5,
                                    borderRadius: 5,
                                    marginLeft: 3,
                                }}
                        >Create new password
                        </Button>

                        <div style={{color: 'gray', marginTop: 30, fontWeight: 'bold'}}>We will send you further
                            instructions to email
                        </div>

                    </form>
                </div>
            </Paper>
        </div>
    );
} );