import * as React from 'react';
import TablePagination from "@mui/material/TablePagination";
import {useAppDispatch, useAppSelector} from '../../../../common/utils/hooks';
import {WithoutResultPage} from '../../../../common/components/WithoutResultsPage/WithoutResultPage';
import {initApp} from '../../../../app/selectors';
import {SecondaryPreloader} from '../../../../common/components/Preloader/secondaryPreloader/SecondaryPreloader';
import {params} from "../../paramsReducer/selectors";
import {setParamsAC} from "../../paramsReducer/paramsReducer";
import {BasicTableHead} from "./BasicTableHead";
import {BasicTableBody} from "./BasicTableBody";
import style from '../BasicTable/BasicTable.module.css'
import {allPacks} from "../../packsReducer/selectors";


export const BasicTable = React.memo(() => {
    const dispatch = useAppDispatch();

    const initTable = useAppSelector(initApp.initTable);
    const packs = useAppSelector(allPacks.cardPacks);
    const cardsPacksCount = useAppSelector(allPacks.cardPacksTotalCount);
    const page = useAppSelector(params.page);
    const pageCount = useAppSelector(params.pageCount);

    const [rowsPerPage, setRowsPerPage] = React.useState(pageCount || 5);
    const [pageIs, setPageIs] = React.useState(page || 0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageIs(newPage);
        dispatch(setParamsAC({page: newPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageCount = parseInt(event.target.value, 10);
        setRowsPerPage(pageCount);
        dispatch(setParamsAC({pageCount}));
    };

    if (packs?.length === 0) {
        return <WithoutResultPage itemName={'Packs'}/>
    }

    return (
        <div>
            <div className={style.scrollTable}>
                <BasicTableHead/>
            </div>

            {initTable === 'initializing'
                ? <SecondaryPreloader/>

                : <div className={style.scrollTableBody}>
                    <BasicTableBody/>
                </div>
            }

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={cardsPacksCount ? cardsPacksCount : 0}
                rowsPerPage={rowsPerPage}
                page={pageIs}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </div>
    );
});


