import React from 'react';
import img from '../../../assets/img/404Page.png';
import {NavLink} from 'react-router-dom';
import style from '../ErrorPage/Error404.module.css'

export const Error404 = () => {
    return (
        <div>
            <NavLink
                to={'/'}
                className={style.link}
            >Go HOME.</NavLink>

            <img src={img} alt="errorAC 404"/>
            <h1 className={style.text}>Page not found!</h1>
        </div>
    );
};

