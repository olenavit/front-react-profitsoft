import * as React from 'react';
import TablePaginationMui from '@mui/material/TablePagination';

const TablePagination = ({
                             count,
                             page,
                             rowsPerPage,
                             onPageChange,
                             onRowsPerPageChange,
                             labelRowsPerPage
                         }) => {

    return (
        <TablePaginationMui
            component="div"
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            labelRowsPerPage={labelRowsPerPage}
            rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />
    );
}
export default TablePagination;