import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from '../../../common/utils/hooks';
import {createCardTC} from '../cardsReducer/cardsReducer';
import {Button, TextField} from '@mui/material';
import {CustomModal} from '../../../common/components/CustomModal/CustomModal';
import style from '../../DeskCards/DeskComponents/EditPacksComponents/EditPacksComponents.module.css';

type AddNewCardPropsType = {
  packID: string | undefined
}

export const AddNewCard: React.FC<AddNewCardPropsType> = ({packID}) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSetNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onSetNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const onSaveChanges = () => {
    dispatch(createCardTC({cardsPack_id: packID, answer, question }));
    setOpen(false);
    setQuestion('');
    setAnswer('');
  };

  const onCloseModal = () => setOpen(false);

  return (
      <div>
        <Button

            onClick={openModal}

            type='submit'
            color='primary'
            variant='contained'
            sx={{
                display:'block',
                margin:'2% auto 0 auto',
              width: 300,
            // alignSelf:'end'
            }}
        >Add card
        </Button>


        <CustomModal open={open} setOpen={setOpen}>

          <div className={style.modalName}>
            Create card
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
              value={question}
              onChange={onSetNewQuestion}
              fullWidth
              margin={'normal'}
          />
          <TextField
              variant={'standard'}
              label={'Answer'}
              value={answer}
              onChange={onSetNewAnswer}
              fullWidth
              margin={'normal'}
          />

          <div className={style.modalButtons}>
            <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
            <Button variant={'contained'} onClick={onSaveChanges}>Save</Button>
          </div>

        </CustomModal>

      </div>
  );
};
