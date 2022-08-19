import React, {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../common/utils/hooks";
import {Button, TextField} from "@mui/material";
import edit from "../../../assets/img/edit.svg";
import {CustomModal} from "../../../common/components/CustomModal/CustomModal";
import style from "../../DeskCards/DeskComponents/EditPacksComponents/EditPacksComponents.module.css";
import {updateCardTC} from "../cardsReducer/cardsReducer";

type UpdateCardPropsType = {
  packId: string | undefined
  cardId: string
  question: string
  answer: string
}

export const UpdateCard: React.FC<UpdateCardPropsType> = ({packId, cardId, question, answer}) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSetNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.currentTarget.value);
  };
  const onSetNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.currentTarget.value);
  };

  const onSaveChanges = () => {
    dispatch(updateCardTC(
        {_id: cardId, answer: newAnswer, question: newQuestion }, packId));
  };

  const onCloseModal = () => setOpen(false);

  return (
      <div>
        <Button onClick={openModal}>
          <img src={edit} alt="write"/>
        </Button>

        <CustomModal open={open} setOpen={setOpen}>

          <div className={style.modalName}>
            Update card
            <Button
                size={'large'}
                variant={'text'}
                onClick={handleClose}
            >X</Button>
          </div>

          <hr/>

          <TextField
              variant={'standard'}
              label={'Question'}
              value={newQuestion}
              onChange={onSetNewQuestion}
              fullWidth
              margin={'normal'}
          />
          <TextField
              variant={'standard'}
              label={'Answer'}
              value={newAnswer}
              onChange={onSetNewAnswer}
              fullWidth
              margin={'normal'}
          />


          <div className={style.modalButtons}>
            <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
            <Button variant={'contained'} onClick={onSaveChanges}>Save changes</Button>
          </div>

        </CustomModal>

      </div>
  );
};
