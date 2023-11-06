import './orderTable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';

interface OrderTableProps {
    rows: any[]; // Define the type of your rows here
}


const statusList = ["ALL", "PENDING", "SHIPPING", "RECEIVED", "COMPLETED"]

const columns: GridColDef[] = [
    {
        field: 'Id', headerName: 'ID'
    },
    {
        field: 'Name', headerName: 'Name', width: 300
    },
    {
        field: 'Phone', headerName: 'Phone', width: 130
    },
    {
        field: 'Total', headerName: 'Total', width: 110,
        renderCell: (params) => {
            return (
                <div className={"priceCell" + " " + params.row.Total}>
                    {params.row.Total}
                </div>
            );
        },
    },
    {
        field: 'Status', headerName: 'Status', width: 150,
        renderCell: (params) => {
            return (
                <div className={"statusCell" + " " + params.row.Status}>
                    {params.row.Status}
                </div>
            );
        },
    }
]

const OrderTable: React.FC<OrderTableProps> = ({ rows }) => {

    // console.log('Order rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [currentStatus, setCurrentStatus] = useState("ALL")

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            console.log('Deleting row with ID:', rowId);
        }
    };

    const handleView = (rowId: number) => {
        console.log('Viewing row with ID:', rowId);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        let filteredRows = rows;
        if (currentStatus !== "ALL") {
            filteredRows = filteredRows.filter(row => row.Status === currentStatus);
        }
        filteredRows = filteredRows.filter(row =>
            row.Name.toLowerCase().includes(query.toLowerCase()) || // Check Name
            row.Id.toString().includes(query) || // Check Id (assuming Id is a number)
            row.Phone.toString().includes(query) // Check Id (assuming Phone is a number)
        );
        setDisplayedRows(filteredRows);
    }, [query, rows, currentStatus]);

    const filterRowsByStatus = (Status: string) => {
        // Clear the search input
        setQuery("");

        setCurrentStatus(Status);
        console.log('Selected Status: ' + Status)
    };


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Orders
                <div className="search">
                    <input type='text' placeholder='Search...' value={query} onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/orders/new" className='link'>
                    Add New
                </Link>
            </div>

            <div className="statusList">
                {
                    statusList.map((status: string, index: number) => (
                        <button key={index} className={"statusButton " + status}
                            onClick={() => filterRowsByStatus(status)}>{status}</button>
                    ))
                }
            </div>

            <DataGrid
                className='datagrid'
                rows={displayedRows}
                columns={columns.concat(actionColumn(handleDelete, handleView))}
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

        </div>
    )
}

export default OrderTable