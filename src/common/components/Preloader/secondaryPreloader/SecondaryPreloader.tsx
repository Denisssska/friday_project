import React from 'react';
import style from '../secondaryPreloader/SecondaryPreloader.module.css';

export const SecondaryPreloader = React.memo (() => {
    return (
        <div className={style.ldsRipple}>
            <div></div>
            <div></div>
        </div>
    );
} );

