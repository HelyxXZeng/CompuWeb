import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
import productLineApi from '../../../api/productLineApi';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface ProductLineTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 1
    },
    {
        field: 'categoryName', headerName: 'Category', flex: 2
    },
    {
        field: 'name', headerName: 'Name', flex: 4
    },
    {
        field: 'releaseDate', headerName: 'Release Date', flex: 2,
        valueFormatter: (params) => {
            // Format the date before displaying it
            if (typeof (params.value) === 'string') {
                const formattedDate = params.value.split('T')[0];
                return formattedDate;
            }
            return params.value
        }
    }
]

const ProductLineTable: React.FC<ProductLineTableProps> = ({ rows }) => {

    // console.log('ProductLine rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            productLineApi.remove(rowId);
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
        navigate(`/productLines/GetProductLineById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // console.log('This is rows in productLine table:', rows)
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        // console.log('Rows in Lines:', rows)
        try {

            const filteredRows = rows.filter(row =>
                row.name.toLowerCase().includes(query.toLowerCase()) || // Check Name
                row.id.toString().includes(query) // Check Id (assuming Id is a number)
            );
            setDisplayedRows(filteredRows);
        }
        catch (error) {
            // console.log('Error in Product Line Table', error)
        }
    }, [query, rows]);

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Product Lines
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/productLines/new" className='link'>
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

export default ProductLineTable