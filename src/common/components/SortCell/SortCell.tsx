import React from 'react';
import {useAppDispatch} from '../../utils/hooks';
import TableSortLabel from '@mui/material/TableSortLabel';

type SortCellPropsType = {
    name: string
    action: any
    sortType: string
    dirValue: boolean | undefined
}

export const SortCell: React.FC<SortCellPropsType> = ({
                                                          name,
                                                          action,
                                                          sortType,
                                                          dirValue
}) => {
    const dispatch = useAppDispatch();

    const onSendSortValue = (name: string) => {
        if (name === 'Cards' && dirValue) {
            dispatch(action({[sortType]: '1cardsCount', dirValue: false}));
        }
        if (name === 'Cards' && !dirValue) {
            dispatch(action({[sortType]: '0cardsCount', dirValue: true}));
        }
        if (name === 'Last Update' && dirValue) {
            dispatch(action({[sortType]: '1updated', dirValue: false}));
        }
        if (name === 'Last Update' && !dirValue) {
            dispatch(action({[sortType]: '0updated', dirValue: true}));
        }
        if (name === 'Last Cards Updated' && dirValue) {
            dispatch(action({[sortType]: '1updated', dirValue: false}));
        }
        if (name === 'Last Cards Updated' && !dirValue) {
            dispatch(action({[sortType]: '0updated', dirValue: true}));
        }
        if (name === 'Grade' && dirValue) {
            dispatch(action({[sortType]: '1grade', dirValue: false}));
        }
        if (name === 'Grade' && !dirValue) {
            dispatch(action({[sortType]: '0grade', dirValue: true}));
        }
    };

    return (
        <>
            {
                   name === 'Cards'
                || name === 'Last Update'
                || name === 'Last Cards Updated'
                || name === 'Grade'
                ? <TableSortLabel
                    onClick={() => onSendSortValue(name)}
                    style={{color: 'white'}}
                    direction={dirValue ? 'desc' : 'asc'}
                >{name}</TableSortLabel>
                : <>{name}</>}
        </>
    )
}