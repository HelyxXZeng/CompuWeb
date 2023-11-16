import './promotionTable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';
import promotionApi from '../../../api/promotionApi';
// import { handleDelete, handleView, actionColumn } from '../datatable/DataTable';
interface PromotionTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'name', headerName: 'Name', width: 150
    },
    {
        field: 'productVariantPurchase', headerName: 'Purchase Product', width: 300
    },
    {
        field: 'productVariantPromotion', headerName: 'Promotion Product', width: 300
    },
    {
        field: 'value', headerName: 'Value', width: 110,
        renderCell: (params) => {
            return (
                <div className={"priceCell" + " " + params.row.value}>
                    {params.row.value}
                </div>
            );
        },
    },
    {
        field: 'status', headerName: 'Status', width: 150,
        renderCell: (params) => {
            return (
                <div className={"statusCell" + " " + params.row.status}>
                    {params.row.status}
                </div>
            );
        },
    }
]

const PromotionTable: React.FC<PromotionTableProps> = ({ rows }) => {

    // console.log('Promotion rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            promotionApi.remove(rowId);
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
        navigate(`/promotions/GetPromotionById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        const filteredRows = rows.filter(row => {
            // Console log every row
            console.log('Row:', row);

            // Check if 'Name' exists and matches the query
            const nameMatch = row.name && row.name.toLowerCase().includes(query.toLowerCase());

            // Check if 'Id' exists and matches the query
            const idMatch = row.id && row.id.toString().includes(query);

            // Check if 'ProductVariantPurchase' exists and matches the query
            const purchaseProductMatch = row.productVariantPurchase && row.productVariantPurchase.toLowerCase().includes(query.toLowerCase());

            // Check if 'ProductVariantPromotion' exists and matches the query
            const promotionProductMatch = row.productVariantPromotion && row.productVariantPromotion.toLowerCase().includes(query.toLowerCase());

            // Return true if any of the matches are true
            return nameMatch || idMatch || purchaseProductMatch || promotionProductMatch;
        });

        setDisplayedRows(filteredRows);
    }, [query, rows]);


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Promotions
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/promotions/new" className='link'>
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

export default PromotionTable