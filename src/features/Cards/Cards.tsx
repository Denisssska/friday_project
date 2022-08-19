import React, {useEffect} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/utils/hooks';
import {setCardsParamsAC, setCardsParamsTC} from './paramsCardsReducer/paramsCardsReducer';
import {SearchInput} from '../../common/components/SearchInput/SearchInput';
import style from '../DeskCards/DeskCards.module.css'
import {Button} from '@mui/material';
import {cardParams} from './paramsCardsReducer/selectors';
import {authState} from '../auth/selectors';
import {AddNewCard} from "./EditCardsComponents/AddNewCard";
import {CardsTable} from "./CardsTable";
import {params} from "../DeskCards/paramsReducer/selectors";

export const Cards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector(state => state.authState._id)
    const isLogin = useAppSelector(authState.isLogin);
    const question = useAppSelector(cardParams.cardQuestion);
    const sortCards = useAppSelector(cardParams.sortCards);

    const {id} = useParams<{ id: string }>(); //вытаскивает айдишку из урла
    const {packName, user_Id} = useLocation().state as { packName: string, user_Id: string };

    useEffect(() => {
        if (id) {
            dispatch(setCardsParamsTC(id));
        }
    }, [dispatch, id, sortCards, question]);

    const onSearchClean = () => {
        dispatch(setCardsParamsAC({cardQuestion: ''}));
    };

    const studyHandler = () => {
        navigate(
            '/learn',
            {state: {packName, packId: id}}
        );
    };

    if (!isLogin) {
        return <Navigate to='/'/>;
    }

    return (
        <div className={style.container}>
            <div className={style.arrow}>
                <div>
                    <ArrowBackIcon
                        fontSize={'small'}
                        sx={{marginBottom: -0.5, marginRight: 1}}
                    />
                    <Link
                        onClick={onSearchClean}
                        style={{
                            color: 'black',
                            backgroundColor: "transparent",
                            boxShadow: "none", textDecoration: 'none', fontSize: 18,
                        }} to='/deskCards'>
                        Back to Pack List
                    </Link>
                </div>

                <div className={style.nameAndButton}>
                    <div><h1
                        style={{margin: '0'}}
                    >{packName}</h1></div>
                </div>
            </div>


            <div className={style.search}>

                <div className={style.inputContainer}>
                    <h3>Search</h3>
                    <SearchInput
                        delayTime={500}
                        itemsName={question}
                        action={setCardsParamsAC}
                        searchField={'cardQuestion'}
                    />
                </div>
                <div className={style.cardsButtons}>
                    <div className={style.showPacks}>
                        <Button className={style.learnButton}
                                onClick={studyHandler}
                                type='submit'
                                color='primary'
                                variant='contained'
                                sx={{
                                    width: 150,

                                }}>Learn
                        </Button>
                    </div>
                    {userId === user_Id && <div>
                        <AddNewCard packID={id}/>
                    </div>}
                </div>


            </div>


            <CardsTable packID={id}/>
        </div>
    )
}
