import {useAppDispatch, useDebounce} from '../../utils/hooks';
import React, {ChangeEvent, useEffect, useState} from 'react';
import style1 from '../SearchInput/SearchInput.module.css'

type SearchInputPropsType = {
    style?: any
    delayTime: number
    itemsName: string | undefined
    action: any
    searchField: string
}

export const SearchInput: React.FC<SearchInputPropsType> = React.memo(({
                                                                           style,
                                                                           delayTime,
                                                                           itemsName,
                                                                           action,
                                                                           searchField
}) => {
    const dispatch = useAppDispatch();

    const [debounceValue, setDebounceValue] = useState(itemsName);

    const searchInputValue = useDebounce(debounceValue, delayTime);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDebounceValue(e.currentTarget.value);
    };

    useEffect(() => {
        dispatch(action({[searchField]: searchInputValue}));
    }, [searchInputValue]);

    return (
        <>
            <input
                onChange={onChangeHandler}
                type="text"
                value={debounceValue}
                placeholder='Provide your text'
                className={style1.mainStyle}
            />
        </>
    )

});
