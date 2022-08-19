import React, {useEffect} from 'react';
import style from './DeskCards.module.css';
import {UniButton} from './DeskComponents/UniButton';
import {RangeSlider} from './DeskComponents/RangeSlider';
import {BasicTable} from './DeskComponents/BasicTable/BasicTable';
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {Navigate} from 'react-router-dom';
import {authState} from '../auth/selectors';
import {SearchInput} from '../../common/components/SearchInput/SearchInput';
import {AddNewPack} from './DeskComponents/EditPacksComponents/AddNewPack/AddNewPack';
import {setParamsAC, setParamsTC} from "./paramsReducer/paramsReducer";
import {params} from "./paramsReducer/selectors";

export const DeskCards = React.memo(() => {
    const dispatch = useAppDispatch();

    const isLogin = useAppSelector(authState.isLogin);
    const max = useAppSelector(params.max);
    const min = useAppSelector(params.min);
    const page = useAppSelector(params.page);
    const pageCount = useAppSelector(params.pageCount);
    const packName = useAppSelector(params.packName);
    const user_id = useAppSelector(params.userId);
    const sortPacks = useAppSelector(params.sortPacks);

    useEffect(() => {
        dispatch(setParamsTC());
    }, [dispatch, max, min, page, pageCount, packName, user_id, sortPacks]);

    if (!isLogin) {
        return <Navigate to='/'/>;
    }

    return (
        <div className={style.container}>
            <div className={style.nameAndButton}>
                <div><h1>Packs list</h1></div>
                <div>
                    <AddNewPack/>
                </div>
            </div>

            <div className={style.search}>
                <div className={style.inputContainer}>
                    <h3>Search</h3>
                    <SearchInput
                        delayTime={500}
                        itemsName={packName}
                        action={setParamsAC}
                        searchField={'packName'}
                    />
                </div>

                <div className={style.showPacks}>
                    <h3>Show packs cards</h3>
                    <UniButton/>
                </div>

                <div className={style.numberOf}>
                    <h3>Number of cards</h3>
                    <RangeSlider/>
                </div>
            </div>

            <BasicTable/>

        </div>
    );
});

