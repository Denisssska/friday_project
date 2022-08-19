import React, {useState} from 'react';
import {Button} from '@mui/material';
import {CustomModal} from '../../../../../common/components/CustomModal/CustomModal';
import del from '../../../../../assets/img/delete.svg';
import style from '../EditPacksComponents.module.css';

type DeletePackPropsType = {
    name: string
    modalName: string
    thunk: any
}

export const DeletePack: React.FC<DeletePackPropsType> = ({name, modalName, thunk}) => {

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onDeleteHandler = () => thunk();

    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button onClick={openModal}>
                <img src={del} alt="delete"/>
            </Button>

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    Delete {modalName}
                    <Button
                        size={'large'}
                        variant={'text'}
                        onClick={handleClose}
                    >X</Button>
                </div>

                <hr/>

                <div className={style.modalText}>
                    <div>Do you really want to remove <b>{name}</b>?</div>
                    <div>All cards will be deleted.</div>
                </div>

                <div className={style.modalButtons}>
                    <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
                    <Button
                        variant={'contained'}
                        onClick={onDeleteHandler}
                    >Delete
                    </Button>
                </div>

            </CustomModal>
        </div>
    );
};

