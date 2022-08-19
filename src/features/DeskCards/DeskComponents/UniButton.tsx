import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import {setParamsAC} from '../paramsReducer/paramsReducer';
import {authState} from '../../auth/selectors';
import {params} from '../paramsReducer/selectors';
import style from '../DeskCards.module.css';
export const UniButton = React.memo (() => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(authState.id);
    const isMy = useAppSelector(params.isMy);

    const getMyPacks = () => {
        dispatch(setParamsAC({user_id: userId, nameOfButton: 'MY'}));
    };

    const getAllPacks = () => {
        dispatch(setParamsAC({user_id: null, nameOfButton: 'ALL'}));
    };

    return (
        <div >
            <ButtonGroup  variant="contained">

                <Button
                    variant={isMy === 'MY' ? 'contained' : 'outlined'}
                    style={{minWidth: '80px'}}
                    onClick={getMyPacks}
                >My
                </Button>

                <Button
                    variant={isMy === 'ALL' ? 'contained' : 'outlined'}
                    style={{minWidth: '80px'}}
                    onClick={getAllPacks}
                >All
                </Button>

            </ButtonGroup>
        </div>

    );
});