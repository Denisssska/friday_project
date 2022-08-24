import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import {SortCell} from "../../common/components/SortCell/SortCell";
import {setCardsParamsAC} from "./paramsCardsReducer/paramsCardsReducer";

export const CardsTableHead = () => {

    const columnNames = ['Question', 'Answer', 'Last Cards Updated', 'Grade', 'Actions'];

    return (
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnNames.map(name => {
                            return <TableCell sx={{width: '20%'}} key={name}>
                                <SortCell
                                    name={name}
                                    actionCreater={setCardsParamsAC}
                                    sortType={'sortCards'}
                                />
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
};