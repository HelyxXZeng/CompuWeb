import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';
import specificationTypeApi from '../../../api/specificationTypeApi';
// import { handleDelete, handleView, actionColumn } from '../datatable/DataTable';
interface SpecificationTypeTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID'
    },
    {
        field: 'name', headerName: 'Name', width: 400
    }
]

const SpecificationTypeTable: React.FC<SpecificationTypeTableProps> = ({ rows }) => {

    // console.log('SpecificationType rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            specificationTypeApi.remove(rowId);
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
        navigate(`/specificationTypes/GetSpecificationTypeById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        try {

            const filteredRows = rows.filter(row =>
                row.name.toLowerCase().includes(query.toLowerCase()) || // Check Name
                row.id.toString().includes(query) // Check Id (assuming Id is a number)
            );
            setDisplayedRows(filteredRows);
        }
        catch (error) {
            // console.log('Error in SpecificationTypeTable', error)
        }
    }, [query, rows]);


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Specification Types
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/specificationTypes/new" className='link'>
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

export default SpecificationTypeTable