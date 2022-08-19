import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {RegistrationTypes} from './RegistrationTypes';
import {Button, FormControl, Input, InputLabel, Paper, TextField} from '@mui/material';
import style from './Registration.module.css'
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import {EndAdornment} from '../../../common/components/EndAdornment/EndAdornment';
import {setRegistrationDataTC} from '../authReducer';
import {CustomizedSnackbars} from '../../../common/components/ErrorSnackbar/Snackbar';
import {authState} from '../selectors';

export const Registration = React.memo(() => {
    const dispatch = useAppDispatch();
    const isRegistered = useAppSelector(authState.isRegistration);
    const error = useAppSelector(authState.error) as string;

    const {register, handleSubmit, watch, formState: {errors}} =
        useForm<RegistrationTypes>({
            mode: 'onBlur'
        });

    const onSubmit: SubmitHandler<RegistrationTypes> = (data) => {
        const {email, password} = data;
        dispatch(setRegistrationDataTC(email, password));
    }

    //функции для показа/скрытия пароля
    interface State {
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        showPassword: false,
    });

    //редирект
    if (isRegistered) {
        return <Navigate to='/'/>;
    }
    return (
        <div className={style.registration}>
            <Paper  className={style.registrationPaper} elevation={2}>
                <div className={style.registrationPaperContainer}>
                    <h1 className={style.registerH1}>Sign Up</h1>

                    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField sx={{display: 'block'}} fullWidth label="Email"
                                   variant="standard"
                                   margin="normal"
                                   type='text'
                                   autoComplete='username'
                                   {...register('email', {
                                       required: 'Email is required!',
                                       pattern: {
                                           value: /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i,
                                           message: 'Enter valid email'
                                       }
                                   })}
                        />
                        {errors?.email && <span style={{color: 'red'}}>{errors.email.message}</span>}

                        <FormControl sx={{width: '100%'}} variant="standard">
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

                        <FormControl sx={{width: '100%', marginTop: '3%'}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                            <Input
                                {...register("confirmPassword",
                                    {
                                        required: "Your passwords do no match",
                                        minLength: {
                                            value: 7, message: 'Password should be min 7 symbols'
                                        },
                                        validate: (val: string) => {
                                            if (watch('password') !== val) {
                                                return "Your passwords do no match";
                                            }
                                        },
                                    })}
                                fullWidth
                                type={values.showPassword ? 'text' : 'password'}
                                autoComplete='new-password'
                                endAdornment={<EndAdornment values={values} setValues={setValues}/>}
                            />
                        </FormControl>
                        {errors?.confirmPassword &&
                            <span style={{color: 'red'}}>{errors.confirmPassword.message}</span>}

                        <Button variant="contained"
                                type='submit'
                                sx={{
                                    display: 'block',
                                    width: '90%',
                                    margin: '15% auto 3% auto',
                                    borderRadius: 5
                                }}
                        >
                            Sign Up
                        </Button>

                    </form>

                    <span style={{color: 'gray', marginTop: 30, fontWeight: 'bold'}}>Already have an account?</span>

                    <Link style={{
                        color: 'blue', marginTop: 10,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginBottom:'3%'
                    }} to="/">
                        Sign In
                    </Link>

                </div>
            </Paper>

            <CustomizedSnackbars errors={error}/>

        </div>
    )
});


