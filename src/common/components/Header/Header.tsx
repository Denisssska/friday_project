import React from 'react';
import style from './Header.module.css'
import {useAppSelector} from '../../utils/hooks';
import {BadgeAvatars} from '../BadgeAvatars/BadgeAvatar';
import oldCar from '../../../assets/img/oldCar.svg';
import logo from '../../../assets/img/newLogo.png';
import {authState} from '../../../features/auth/selectors';

export const Header = React.memo(() => {
    const isLogin = useAppSelector(authState.isLogin);

    if (!isLogin) {
        return (
            <div className={style.center}>
                <div className={style.marquee}>
                   <span><img className={style.img} src={oldCar} alt=""/></span>
                </div>
            </div>
        )
    }

    return (
        <div className={style.header}>
            <div className={style.logo}><img src={logo} alt='logo'/></div>
            <BadgeAvatars/>
        </div>
    )
});
