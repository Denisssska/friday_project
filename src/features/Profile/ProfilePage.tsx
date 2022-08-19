import React, {useCallback, useState} from 'react';
import style from '../auth/Registration/Registration.module.css'
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {Navigate} from 'react-router-dom';
import {Button, Paper} from '@mui/material';
import {logOutTC, updateMeTC} from '../auth/authReducer';
import pen from '../../assets/img/pen.svg';
import {authState} from "../auth/selectors";
import {FileInput} from "../../common/components/FileInput/FileInput";


export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(authState.state);
    const [avatar, setAvatar] = useState('')
    const logOut = useCallback(() => {
        dispatch(logOutTC());
    }, [dispatch]);

    const updateNameHandler = useCallback((name: string) => {
        dispatch(updateMeTC({name, avatar}));
    }, [avatar, dispatch]);

    if (!state.isLogin) {
        return <Navigate to='/'/>
    }

    return (
        <div className={style.registration}>
            <Paper sx={{margin: '7% auto 0 auto'}}
                   className={style.registrationPaper}
                   elevation={2}
            >
                <div className={style.registrationPaperContainer}>

                    <h1 className={style.registerH1}>Personal Information</h1>
                    <FileInput state={state.avatar} thunk={setAvatar}/>

                    <h3 className={style.registerName}>{state.email}</h3>
                    <div style={{display: 'flex'}}>
                        <EditableSpan title={state.name} onChange={(name) => updateNameHandler(name)}/>
                        <div className={style.photo}>
                            <img src={pen} alt=""/>
                        </div>
                    </div>

                    <Button
                        sx={{
                            display: 'block',
                            width: '90%',
                            margin: '5% auto 10% auto',
                            borderRadius: 5
                        }}
                        onClick={logOut}
                        type='submit'
                        color='primary'
                        variant='contained'

                    >Log out
                    </Button>
                </div>

            </Paper>
        </div>
    );
});