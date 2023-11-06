import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface BrandTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'Id', headerName: 'ID'
    },
    {
        field: 'Name', headerName: 'Name', width: 200
    },
    {
        field: 'Description', headerName: 'Description', width: 700
    }
]

const BrandTable: React.FC<BrandTableProps> = ({ rows }) => {

    // console.log('Brand rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const [showDialog, setShowDialog] = useState(false);

    // const handleConfirm = () => {
    //     // Your confirmation logic for "Yes" button
    //     setShowDialog(false);
    //     return true;
    // };

    // const handleCancel = () => {
    //     // Your cancel logic for "No" button
    //     setShowDialog(false);
    //     return false;
    // };

    // const displayConfirmationDialog = (callback: (button: string) => void) => {
    //     if (showDialog) {
    //         return (
    //             <ConfirmationDialog
    //                 message="Are you sure you want to continue?"
    //                 onConfirm={() => callback('confirm')}
    //                 onCancel={() => callback('cancel')}
    //             />
    //         );
    //     }
    // };


    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            console.log('Deleting row with ID:', rowId);
        }

    };

    // const handleDelete = (rowId: number) => {
    //     // Display the confirmation dialog
    //     setShowDialog(true);

    //     console.log('Come here')

    //     const handleConfirmation = (button: string) => {
    //         console.log('Confirmation button clicked: ' + button);
    //         setShowDialog(false);

    //         if (button === 'confirm') {
    //             // User clicked the Confirm button
    //             // Perform the deletion action here
    //             console.log('Deleting row with ID:', rowId);
    //         } else if (button === 'cancel') {
    //             // User clicked the Cancel button
    //             console.log('Deletion canceled by the user');
    //         }
    //     };

    //     displayConfirmationDialog(handleConfirmation);
    // };


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
                Product Brands
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/brands/new" className='link'>
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

export default BrandTable