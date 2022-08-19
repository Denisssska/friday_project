import React from 'react';
import preloader from '../../../../assets/img/preloader.gif';
import style from './Preloader.module.css';

export const Preloader = () => {
    return (
        <div>
            <img
                className={style.preloader}
                src={preloader}
                alt="preloader"
            />
        </div>
    );
};

