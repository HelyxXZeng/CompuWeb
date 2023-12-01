import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
import specificationApi from '../../../api/specificationApi';
import specificationTypeApi from '../../../api/specificationTypeApi';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface SpecificationTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'specificationType', headerName: 'Specification Type', flex: 2
    },
    {
        field: 'value', headerName: 'Value', flex: 5
    }

]

const SpecificationTable: React.FC<SpecificationTableProps> = ({ rows }) => {

    // console.log('Specification rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [specificationTypes, setSpecificationTypes] = useState<any[]>([]);
    // const previousRowsRef = useRef<any[]>([]);
    useEffect(() => {
        const fetchSpecificationTypes = async () => {
            try {
                const specificationTypesData = (await specificationTypeApi.getAll({ _page: 1, _limit: 100000 })).data;
                setSpecificationTypes(specificationTypesData);
            } catch (error) {
                console.log('Failed to fetch SpecificationType data:', error);
            }
        };

        fetchSpecificationTypes();
    }, []);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            specificationApi.remove(rowId);
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
        navigate(`/specifications/GetSpecificationById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Check if the rows have actually changed
        // if (previousRowsRef.current !== rows && specificationTypes.length > 0) {
        //     // Update rows directly to include specificationType name
        //     // console.log('Product SpecificationType in Specification', specificationTypes)

        // }

        rows.forEach(row => {
            row.specificationType = specificationTypes.find(pl => pl.id === row.specificationTypeId)?.name || 'N/A';
        });
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        // console.log('Rows in Instances:', rows)
        try {
            const filteredRows = rows.filter(row =>
                row.value.toLowerCase().includes(query.toLowerCase())
                || row.id.toString().includes(query)
                || row.specificationType.toLowerCase().includes(query.toLowerCase())
            );
            setDisplayedRows(filteredRows);
        }
        catch (error) {
            // console.log('Error in Instance Table', error)
        }

        // Update the previousRowsRef with the current rows
        // previousRowsRef.current = rows.slice(); // Copy the array to avoid reference issues
    }, [query, rows, specificationTypes]);

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Specifications
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/specifications/new" className='link'>
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

export default SpecificationTable