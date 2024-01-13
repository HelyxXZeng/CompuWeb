import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridSortModel, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
import ratingApi from '../../../api/ratingApi';
import productVariantApi from '../../../api/productVariantApi';
import Rating from '@mui/material/Rating';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface Row {
    id: number;
    name: string;
    date: string,
    rate: number,
    comment: string,
    status: string
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'name', headerName: 'Variant', flex: 7
    },
    {
        field: 'date', headerName: 'Date', width: 100
    },
    {
        field: 'rate', headerName: 'Rate', width: 130,
        renderCell: (params) => {
            return (
                <Rating name="read-only" value={params.row.rate} readOnly />
            );
        },
    },
    {
        field: 'comment', headerName: 'Comment', flex: 7
    },
    {
        field: 'status', headerName: 'Status', flex: 3
    }
]

const defaultSortModel: GridSortModel = [
    {
        field: 'date',
        sort: 'desc', // Set the default sorting order to ascending
    },
];

const RatingTable = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            ratingApi.remove(rowId);
            // console.log('Deleting row with ID:', rowId);

            // Update displayedRows after the item has been deleted
            const updatedRows = displayedRows.filter(row => row.id !== rowId); // It should be row.Id later
            setDisplayedRows(updatedRows);
            rows.filter(row => row.id !== rowId); // It should be row.Id later
        }
    };

    const navigate = useNavigate();

    const handleView = (rowId: number) => {
        console.log('Viewing row with ID:', rowId);
        navigate(`/ratings/GetRatingById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }
    useEffect(() => {
        const fetchRows = async () => {
            const data = (await ratingApi.getAll({ _page: 1, _limit: 100000 })).data;
            setRows(data)
            // console.log('This is rows in fetch', data)
        }

        fetchRows();
    }, [])

    useEffect(() => {
        const formatDate = async () => {
            rows.forEach(
                row => {
                    try {
                        // console.log('Split date', row.startDate.substring(0, 10))
                        row.date = row.date.substring(0, 10)
                    }
                    catch (error) {

                    }
                }
            )
        }

        formatDate();
    }, [rows]);

    useEffect(() => {
        // Update displayedRows with filtered rows
        try {
            const filteredRows = rows.filter((row) =>
                row.id.toString().includes(query) || // Check Id (assuming Id is a number)
                row.name.includes(query)
            );
            setDisplayedRows(filteredRows);
        } catch (error) {
            // Handle error if needed
        }
    }, [rows, query]);

    return (
        <div className='datatable' style={{ maxWidth: 1200 }}>
            <div className="datatableTitle">
                Rating
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/ratings/new" className='link'>
                    Add New
                </Link>
            </div>

            {
                rows.length > 0 ?
                    <DataGrid
                        className='datagrid'
                        rows={displayedRows}
                        columns={columns.concat(actionColumn(handleDelete, handleView))}
                        sortModel={defaultSortModel}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        pageSizeOptions={[5, 10]}
                    />

                    : <h2>No Data!</h2>
            }
        </div>
    )
}

export default RatingTable