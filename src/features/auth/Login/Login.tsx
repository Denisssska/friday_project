import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, Paper, TextField} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {setLoginData} from '../authReducer';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import style from '../Registration/Registration.module.css';
import {EndAdornment} from '../../../common/components/EndAdornment/EndAdornment';
import {CustomizedSnackbars} from '../../../common/components/ErrorSnackbar/Snackbar';
import {authState} from '../selectors';

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = React.memo(() => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(authState.isLogin);
    const error = useAppSelector(authState.error) as string;

    //функции для показа/скрытия пароля
    interface State {
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        showPassword: false,
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField,
    } = useForm<Inputs>({
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {email, password, rememberMe} = data;
        dispatch(setLoginData(email, password, rememberMe));
        resetField('password');
    };

    if (isLogin) {
        return <Navigate to='/deskCards'/>;
    }

    return (
        <div className={style.registration}>
            <Paper
                className={style.registrationPaper}
                elevation={2}
            >
                <div className={style.registrationPaperContainer}>
                    <h1 className={style.registerH1}>Sign in</h1>

                    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            sx={{display: 'block'}}
                            fullWidth
                            label='Email'
                            type='text'
                            margin="normal"
                            autoComplete='username'
                            variant='standard'
                            {...register('email', {
                                    required: 'Required',
                                    pattern: {
                                        value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                        message: 'Enter valid email'
                                    }
                                }
                            )}
                        />
                        {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                        {/*sx={{m: 1, width: 340}}*/}
                        <FormControl sx={{marginTop: '3%', width: '100%'}} variant="standard">
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
                        {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}

                        <FormControlLabel sx={{marginTop: '6%'}}
                                          control={<Checkbox
                                              {...register('rememberMe')}/>}
                                          label='Remember me'
                        />

                        <div style={{fontSize: '12px', marginBottom: '25px', paddingLeft: '143px'}}>
                            <NavLink to={'/changePassword'}>
                                Forgot Password?
                            </NavLink>
                        </div>

                        <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            sx={{
                                display: 'block',
                                width: '90%',
                                margin: '15% auto 3% auto',
                                borderRadius: 5
                            }}
                        >
                            Sign In
                        </Button>

                    </form>

                    <div style={{color: 'gray', marginTop: 30, fontWeight: 'bold'}}>Don't have an account?</div>

                    <NavLink style={{
                        color: 'blue', marginTop: 10,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginBottom: '3%'
                    }} to={'/registration'}>
                        Sign Up
                    </NavLink>
                </div>
            </Paper>
            <CustomizedSnackbars errors={error}/>
        </div>
    );
});

