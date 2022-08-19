import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ProfilePage} from '../../../features/Profile/ProfilePage';
import {Registration} from "../../../features/auth/Registration/Registration";
import {CreatePasswordPage} from '../../../features/ChangePassword/CreatePasswordPage';
import {ForgotPasswordPage} from '../../../features/ChangePassword/ForgotPasswordPage';
import {Login} from '../../../features/auth/Login/Login';
import {Error404} from '../ErrorPage/Error404';
import {Cards} from '../../../features/Cards/Cards';
import {DeskCards} from '../../../features/DeskCards/DeskCards';
import {useAppSelector} from '../../utils/hooks';
import {Preloader} from '../Preloader/mainPreloader/Preloader';
import {initApp} from '../../../app/selectors';
import {Learn} from "../../../features/DeskCards/DeskComponents/Learn/Learn";


export const PATH = {
    login: '/',
    deskCards:'/deskCards',
    registration: '/registration',
    profile: '/profile',
    forgotPassword: '/changePassword',
    createPassword: '/create-password/*',
    cards: '/cards',
    learn: '/learn'
}

export const RoutesComponent = () => {

    const isInitialized = useAppSelector(initApp.isInitialized);

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div>
            <Routes>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.deskCards} element={<DeskCards/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.profile} element={<ProfilePage/>}/>
                <Route path={PATH.forgotPassword} element={<ForgotPasswordPage/>}/>
                <Route path={PATH.createPassword} element={<CreatePasswordPage/>}/>
                <Route path={`${PATH.cards}/:id`} element={<Cards/>}/>
                <Route path={PATH.learn} element={<Learn/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
};