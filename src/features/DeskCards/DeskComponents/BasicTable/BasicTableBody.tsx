import {useAppDispatch, useAppSelector} from '../../../../common/utils/hooks';
import {useNavigate} from 'react-router-dom';
import {authState} from '../../../auth/selectors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {PATH} from '../../../../common/components/routes/RoutesComponent';
import {updatedDate} from '../../../../common/utils/dateFormatting';
import ButtonGroup from '@mui/material/ButtonGroup';
import {DeletePack} from '../EditPacksComponents/DeletePack/DeletePack';
import {UpdatePack} from '../EditPacksComponents/UpdatePack/UpdatePack';
import {Button} from '@mui/material';
import study from '../../../../assets/img/school.svg';
import * as React from 'react';
import {deletePackTC} from "../../packsReducer/packsReducer";
import {allPacks} from "../../packsReducer/selectors";

export const BasicTableBody = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const packs = useAppSelector(allPacks.cardPacks);
    const userId = useAppSelector(authState.id);

    const studyHandler = (packName: string, packId: string) => {
        navigate('/learn', {state: {packName, packId}});
    };

    return (
        <>
            <Table aria-label="simple table">
                <TableBody style={{backgroundColor: '#d4e3fc'}}>
                    {packs && packs.map((pack) => {
                        return <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='16.6%'
                                       align="center"><img style={{maxWidth: '50%'}} src={pack.deckCover}
                                                           alt=""/></TableCell>
                            <TableCell
                                onClick={() => navigate(
                                    `${PATH.cards}/${pack._id}`,
                                    {state: {packName: pack.name, user_Id: pack.user_id}}
                                )}
                                sx={{borderBottom: '1px solid #1c72b9', padding: '0'}}
                                align="center"
                                width='16.6%'
                            >
                                {pack.name}
                            </TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='16.6%'
                                       align="center">{pack.cardsCount}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='16.6%'
                                       align="center">{updatedDate(pack.updated)}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9'}} width='16.6%'
                                       align="center">{pack.user_name}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid #1c72b9', paddingRight: '2%'}} width='16.6%'
                                       align="right">
                                {userId === pack.user_id
                                    ? <ButtonGroup>
                                        <DeletePack
                                            name={pack.name}
                                            modalName={'Pack'}
                                            thunk={() => dispatch(deletePackTC(pack._id))}
                                        />

                                        <UpdatePack
                                            packId={pack._id}
                                            packName={pack.name}
                                            isPackPrivate={pack.private}
                                            packPhoto={pack.deckCover}
                                        />

                                        <Button onClick={() => studyHandler(pack.name, pack._id)}>
                                            <img src={study} alt="study"/>
                                        </Button>
                                    </ButtonGroup>
                                    : <Button onClick={() => studyHandler(pack.name, pack._id)}>
                                        <img src={study} alt="study"/>
                                    </Button>
                                }

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </>
    )
};