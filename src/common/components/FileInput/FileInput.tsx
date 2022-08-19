import React, {ChangeEvent, useCallback, useState} from 'react';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import defaultAva from '../../../assets/img/icons8-становая-тяга.gif';
import style from "../../../features/auth/Registration/Registration.module.css";
import {convertFileToBase64} from "../../utils/convertToBase64";
import defaultImg from '../../../assets/img/defaultImg.svg';

type StateFileInputType = {
    state: string | undefined
    thunk: (file64: string) => void
}
export const FileInput: React.FC<StateFileInputType> = ({state, thunk}) => {
    const [ava, setAva] = useState(state ? state : defaultImg)
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const uploadHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            console.log(e.target.files)
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAva(file64)
                    thunk(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }, [thunk])

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }

    return (
        <div style={{marginLeft: '4%'}}>
            <img
                className={style.registerImg}
                src={isAvaBroken ? defaultAva : ava}
                onError={errorHandler}
                alt="ava"
            />
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <IconButton sx={{padding: '0'}} component="span">
                    <CloudUploadIcon/>
                </IconButton>
            </label>
        </div>
    )
}
