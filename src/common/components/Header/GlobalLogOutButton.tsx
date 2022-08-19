import React, {useCallback} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch} from "../../utils/hooks";
import {logOutTC} from "../../../features/auth/authReducer";

export const GlobalLogOutButton = () => {
  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    dispatch(logOutTC())
  }, []);
  return (
    <div>
      <Button
        onClick={logOut}
        type='submit'
        color='primary'
        variant='contained'
        sx={{
          width: 115,
          height: 40,
          marginTop: 1,
          borderRadius: 5,
          marginLeft: 150,
        }}>
        Log out
      </Button>
    </div>
  )
}