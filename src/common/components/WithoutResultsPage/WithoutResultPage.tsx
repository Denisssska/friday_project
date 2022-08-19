import React from 'react';
import style from './WithoutResultsPage.module.css';

type WithoutResultPagePropsType = {
    itemName: string
}

export const WithoutResultPage: React.FC<WithoutResultPagePropsType> = ({itemName}) => {
    return (
        <div className={style.text}>
            {itemName} not found! Please enter another query!
        </div>
    );
};

