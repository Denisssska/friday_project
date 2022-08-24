import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import {setParamsAC} from "../../paramsReducer/paramsReducer";
import {SortCell} from "../../../../common/components/SortCell/SortCell";

export const BasicTableHead = () => {
    const columnNames = ['Cover', 'Name', 'Cards', 'Last Update', 'Author', 'Actions'];

    return (
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnNames.map(name => {
                            return <TableCell key={name} width='16.6%'>

                                <SortCell
                                    name={name}
                                    actionCreater={setParamsAC}
                                    sortType={'sortPacks'}

                                />
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
};