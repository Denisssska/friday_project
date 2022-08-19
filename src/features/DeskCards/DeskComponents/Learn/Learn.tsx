import React, {useEffect, useState} from 'react';
import style from './Learn.module.css';
import {Button, Paper} from '@mui/material';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../common/utils/hooks";
import {authState} from "../../../auth/selectors";
import {CardType} from "../../../../api/cardsDeskAPI";
import SuperRadio from "../../../../common/components/superComponents/SuperRadio";
import {changeCardGradeTC} from "../../../Cards/cardsReducer/cardsReducer";
import {setCardsParamsTC} from "../../../Cards/paramsCardsReducer/paramsCardsReducer";
import {allCards} from "../../../Cards/cardsReducer/selectors";
import back from '../../../../assets/img/arrowBack.svg'

const options = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
};


export const Learn = () => {
    const dispatch = useAppDispatch();

    const cards = useAppSelector(allCards.cards);
    const isLogin = useAppSelector(authState.isLogin);

    const navigate = useNavigate();
    const {packName, packId} = useLocation().state as { packName: string, packId: string };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardType>({
        __v: 0,
        _id: "",
        answer: "",
        answerImg: "",
        answerVideo: "",
        cardsPack_id: "",
        comments: "",
        created: "",
        grade: 0,
        more_id: "",
        question: "",
        questionImg: "",
        questionVideo: "",
        rating: 0,
        shots: 0,
        type: "",
        updated: "",
        user_id: ""
    });

    useEffect(() => {
        if (first) {
            dispatch(setCardsParamsTC(packId));
            setFirst(false);
        }

        if (cards && cards.length > 0) {
            setCard(getCard(cards));
        }

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, packId, cards, first]);

    const onChangeOption = (option: string) => {
        setValue(option)
    }
    const backTo = () => navigate(-1);

    const answer = () => setOpen(!open);

    const next = () => {
        setOpen(!open);

        if (cards.length > 0) {
            setCard(getCard(cards));
        }
        dispatch(changeCardGradeTC((options.indexOf(value) + 1), card._id));
        setValue('');
    }

    if (!isLogin) {
        return <Navigate to='/'/>;
    }

    return (

        <div className={style.registration}>
            <Button
                onClick={backTo}
                className={style.registrationButton}
            >
                <img className={style.arrow} src={back} alt="arrow"/>
                Back
            </Button>

            <h1 className={style.registrationCardName}>Learn : {packName}</h1>

            <Paper
                className={style.registrationPaper}
                elevation={2}
            >
                <div className={style.registrationPaperContainer}>

                    <h1 className={style.registerH1}>Question: {card.question}</h1>

                    {!open
                        ? <Button
                            onClick={answer}
                            type='submit'
                            color='primary'
                            variant='contained'
                            sx={{
                                display:'block',
                                width: '90%',
                                margin: '15% auto 10% auto',
                                borderRadius: 5
                            }}
                        >Answer
                        </Button>
                        : <div className={style.registerRadio}>
                            <h3 className={style.registerName}>Количество попыток ответов на вопрос: {card.shots}</h3>
                            <div className={style.answer}>Answer: {card.answer}</div>
                            <h3>Rate yourself :</h3>
                            <SuperRadio
                                value={value}
                                options={options}
                                onChangeOption={(option) => onChangeOption(option)}
                            />
                            <Button

                                disabled={!value}
                                className={style.registrationNext}
                                onClick={next}
                                type='submit'
                                color='primary'
                                variant='contained'
                                sx={{
                                    display:'block',
                                    width: '90%',
                                    margin: '15%  auto',
                                    borderRadius: 5
                                }}
                            >Next
                            </Button>
                        </div>
                    }
                </div>

            </Paper>

        </div>
    );
};

