import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import pen from '../../../assets/img/pen.svg'

type EditableSpanType = {
    title: string
    onChange: (newText: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [newText, setNewText] = useState('')
    const changeTextDoubleClick = () => {
        setEditMode(!editMode)
        setNewText(props.title)
    }
    const changeTextFromEnter = (event: ChangeEvent<HTMLInputElement>) => {
        setNewText(event.currentTarget.value)
    }
    const activateViewMode = () => {
        setEditMode(!editMode)
        props.onChange(newText)
    }
    return (
        editMode ?
            <TextField
                onChange={changeTextFromEnter}
                autoFocus onBlur={activateViewMode} value={newText}
                fullWidth
                type='text'
                margin="normal"
            /> :
            // <input onChange={changeTextFromEnter}
            //        autoFocus onBlur={activateViewMode} value={newText}/> :
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{marginLeft: '5px'}} onDoubleClick={changeTextDoubleClick}>{props.title} </h2>
                {/*<div style={{opacity: '0.5', marginLeft: '5px'}}><img src={pen} alt=""/></div>*/}
            </div>

    )
});


