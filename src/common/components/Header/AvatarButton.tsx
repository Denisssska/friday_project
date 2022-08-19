import React, {ReactNode, useCallback} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../utils/hooks';
import {logOutTC} from '../../../features/auth/authReducer';

type AvatarButtonPropsType = {
    children: ReactNode
}

export const AvatarButton: React.FC<AvatarButtonPropsType> = ({children}) => {
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const logOut = useCallback(() => dispatch(logOutTC()), []);

    return (
        <>
            <Button
                sx={{border:'none',margin:'0',padding:'0',minWidth:'0'}}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {children}
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <div onClick={logOut}>Log Out</div>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to='/profile'>Profile</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to='/deskCards'>Desk</NavLink>
                </MenuItem>

            </Menu>
        </>
    );
};

