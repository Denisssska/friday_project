import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {CustomModal} from '../../../../../common/components/CustomModal/CustomModal';
import {useAppDispatch, useAppSelector} from '../../../../../common/utils/hooks';
import style from '../EditPacksComponents.module.css';
import {createPackTC} from "../../../packsReducer/packsReducer";
import {FileInput} from "../../../../../common/components/FileInput/FileInput";
import {authState} from "../../../../auth/selectors";
import {params} from "../../../paramsReducer/selectors";
import {allPacks} from "../../../packsReducer/selectors";

export const AddNewPack = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [newPackName, setNewPackName] = useState('');
    const [privatePack, setPrivatePack] = useState(false);
    const [photo, setPhoto] = useState('')
    const openModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSetNewPackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value);
    };

    const onSaveNewPack = () => {
        dispatch(createPackTC(newPackName, privatePack, photo));
        setOpen(false);
        setNewPackName('');
        setPrivatePack(false);
    };

    const onCloseModal = () => setOpen(false);

    const onSetPrivate = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.target.checked);

    return (
        <div>
            <Button
                onClick={openModal}
                style={{marginTop: '0', width: '300px'}}
                type='submit'
                color='primary'
                variant='contained'
            >Add new pack
            </Button>

            <CustomModal open={open} setOpen={setOpen}>

                <div className={style.modalName}>
                    Add new pack
                    <Button
                        size={'large'}
                        variant={'text'}
                        onClick={handleClose}>X</Button>
                </div>

                <hr/>

                <TextField
                    variant={'standard'}
                    label={'Pack name'}
                    value={newPackName}
                    onChange={onSetNewPackName}
                    fullWidth
                    margin={'normal'}
                />

                <FileInput state={''} thunk={setPhoto}/>
                <div>
                    <FormControlLabel
                        value='end'
                        control={<Checkbox onChange={onSetPrivate} checked={privatePack}/>}
                        label='Private'
                        labelPlacement='end'
                        sx={{marginBottom: '20px'}}
                    />
                </div>

                <div className={style.modalButtons}>
                    <Button variant={'outlined'} onClick={onCloseModal}>Cancel</Button>
                    <Button variant={'contained'} onClick={onSaveNewPack}>Save</Button>
                </div>

            </CustomModal>

        </div>
    );
};

