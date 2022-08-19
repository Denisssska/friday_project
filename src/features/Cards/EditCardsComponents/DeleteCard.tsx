import React, {useState} from 'react';
import {Button} from '@mui/material';
import style from '../../DeskCards/DeskComponents/EditPacksComponents/EditPacksComponents.module.css';
import del from '../../../assets/img/delete.svg';
import {CustomModal} from "../../../common/components/CustomModal/CustomModal";


type DeleteCardPropsType = {
  question: string
  deleteCard: any
}

export const DeleteCard: React.FC<DeleteCardPropsType> = ({question, deleteCard}) => {

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteHandler = () => deleteCard();

  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <Button onClick={openModal}>
        <img src={del} alt="delete"/>
      </Button>

      <CustomModal open={open} setOpen={setOpen}>

        <div className={style.modalName}>
          Delete {question}
          <Button
            size={'large'}
            variant={'text'}
            onClick={handleClose}
          >X</Button>
        </div>

        <hr/>

        <div className={style.modalText}>
          <div>Do you really want to remove <b>{question}</b>?</div>
          <div>No option for recover</div>
        </div>

        <div className={style.modalButtons}>
          <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
          <Button
            sx={{backgroundColor: 'red'}}
            variant={'contained'}
            onClick={onDeleteHandler}
          >Delete
          </Button>
        </div>

      </CustomModal>
    </div>
  );
};

