import React from 'react';
import {Paper} from '@mui/material';
import style from '../../auth/Registration/Registration.module.css';
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import {Link} from 'react-router-dom';
import {sendConfirmMail} from '../changePasswordReducer';
import mail from '../../../assets/img/pen.svg';
import {passwordState} from '../selectors';


export const Notification = React.memo ( () => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(passwordState.sentEmail);

    const navigateToLogin = () => {
        dispatch(sendConfirmMail(false, ''));
    }

    return (
        <div className={style.registration}>
            <Paper className={style.registrationPaper} elevation={2} style={{height: '350px'}}>
                <div className={style.registrationPaperContainer}>

                    <h1 className={style.registerH1}>Check Email</h1>

                    <div>
                        <img src={mail} alt="" style={{width: '50px', height: '50px', marginTop: '15px'}}/>
                    </div>

                    <div style={{marginTop: '30px', textAlign: 'center', fontSize: '18px'}}>
                        <div>We've sent an Email with instructions to</div>
                        <span style={{backgroundColor: 'lightgreen'}}>{email}</span>
                    </div>

                    <Link
                        to={'/'}
                        onClick={navigateToLogin}
                        style={{
                            color: 'blue',
                            marginTop: 30,
                            backgroundColor: "transparent",
                            boxShadow: "none"
                        }}
                    >Back to login </Link>

                </div>
            </Paper>
        </div>

    );
} );

