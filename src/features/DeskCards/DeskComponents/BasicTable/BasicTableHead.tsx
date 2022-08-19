import {useAppSelector} from '../../../../common/utils/hooks';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {SortCell} from '../../../../common/components/SortCell/SortCell';
import * as React from 'react';
import {params} from "../../paramsReducer/selectors";
import {setParamsAC} from "../../paramsReducer/paramsReducer";

export const BasicTableHead = () => {
    const columnNames = ['Cover','Name', 'Cards', 'Last Update', 'Author', 'Actions'];

    const dirValue = useAppSelector(params.dirValue);

    return (
        <>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnNames.map(name => {
                            return <TableCell key={name}  width='16.6%' >
                                <SortCell

                                    name={name}
                                    action={setParamsAC}
                                    sortType={'sortPacks'}
                                    dirValue={dirValue}
                                />
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
};