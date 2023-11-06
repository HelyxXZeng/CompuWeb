import './categoryTable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';
interface CategoryTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'Id', headerName: 'ID'
    },
    {
        field: 'Name', headerName: 'Name', width: 400
    }
]

const CategoryTable: React.FC<CategoryTableProps> = ({ rows }) => {

    // console.log('Category rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

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
        const filteredRows = rows.filter(row =>
            row.Name.toLowerCase().includes(query.toLowerCase()) || // Check Name
            row.Id.toString().includes(query) // Check Id (assuming Id is a number)
        );
        setDisplayedRows(filteredRows);
    }, [query, rows]);


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Product Categories
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/categories/new" className='link'>
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

export default CategoryTable