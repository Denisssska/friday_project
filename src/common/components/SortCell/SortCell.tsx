import React, {useCallback, useState} from 'react';
import {useAppDispatch} from '../../utils/hooks';
import TableSortLabel from '@mui/material/TableSortLabel';

type SortCellPropsType = {
    name: string
    actionCreater: any
    sortType: string
}

export const SortCell: React.FC<SortCellPropsType> = ({
                                                          name,
                                                          actionCreater,
                                                          sortType,
                                                      }) => {

    const dispatch = useAppDispatch();

    const [value, setValue] = useState(true)
    const [value2, setValue2] = useState(true)

    const onSendSortValue = useCallback((name: string) => {

        if (name === 'Cards') {
            value && dispatch(actionCreater({[sortType]: '1cardsCount'}))
            !value && dispatch(actionCreater({[sortType]: '0cardsCount'}))
            setValue(!value)
        }
        if (name === 'Last Update' || name === 'Last Cards Updated') {
            value2 && dispatch(actionCreater({[sortType]: '1updated'}));
            !value2 && dispatch(actionCreater({[sortType]: '0updated'}));
            setValue2(!value2)
        }

        if (name === 'Grade') {
            value && dispatch(actionCreater({[sortType]: '1grade'}));
            !value && dispatch(actionCreater({[sortType]: '0grade'}));
            setValue(!value)
        }

    }, [actionCreater, dispatch, sortType, value, value2]);

    return (
        <>
            {name === 'Cards' || name === 'Grade' ?
                <TableSortLabel
                    active={true}
                    onClick={() => onSendSortValue(name)}
                    style={{color: 'white'}}
                    direction={value ? 'desc' : 'asc'}
                >{name}</TableSortLabel> :
                name === 'Last Update' || name === 'Last Cards Updated' ?
                    <TableSortLabel
                        active={true}
                        onClick={() => onSendSortValue(name)}
                        style={{color: 'white'}}
                        direction={value2 ? 'desc' : 'asc'}
                    >{name}</TableSortLabel> :
                    <>{name}</>}
        </>
    )
}