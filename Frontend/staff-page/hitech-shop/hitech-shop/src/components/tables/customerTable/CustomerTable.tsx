import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';
import customerApi from '../../../api/customerApi';

interface CustomerTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID'
    },
    {
        field: 'name', headerName: 'Name', width: 400
    },
    {
        field: 'phoneNumber', headerName: 'Phone', width: 150
    }
]

const CustomerTable: React.FC<CustomerTableProps> = ({ rows }) => {

    // console.log('Customer rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            customerApi.remove(rowId);
            console.log('Deleting row with ID:', rowId);

            // Update displayedRows after the item has been deleted
            const updatedRows = displayedRows.filter(row => row.id !== rowId); // It should be row.Id later
            setDisplayedRows(updatedRows);
            rows.filter(row => row.id !== rowId); // It should be row.Id later
        }
    };

    const navigate = useNavigate();

    const handleView = (rowId: number) => {
        console.log('Viewing row with ID:', rowId);
        navigate(`/customers/GetCustomerById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Use the filter method to create a new array with rows that match the query in either Name or Id or Phone
        try {

            const filteredRows = rows.filter(row =>
                row.name.toLowerCase().includes(query.toLowerCase()) || // Check Name
                row.id.toString().includes(query) || // Check Id (assuming Id is a number)
                row.phoneNumber.toString().includes(query) // Check Phone (assuming Phone is a number)
            );
            setDisplayedRows(filteredRows);
        }
        catch (error) {
            // console.log('Error in Customer Table', error)
        }
    }, [query, rows]);


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Customers
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/customers/new" className='link'>
                    Add New
                </Link>
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

export default CustomerTable