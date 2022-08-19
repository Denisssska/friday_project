import React from "react";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type State = {
    showPassword: boolean;
}

export type EndAdornmentType = {
    setValues: (values: State) => void
    values: { showPassword: boolean }
}

export const EndAdornment: React.FC<EndAdornmentType> = ({setValues, values}) => {

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <>
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            </InputAdornment>

        </>
    );
};


