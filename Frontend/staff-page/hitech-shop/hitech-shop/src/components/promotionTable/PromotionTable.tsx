import './promotionTable.scss'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';

interface PromotionTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'Id', headerName: 'ID', width: 60
    },
    {
        field: 'Name', headerName: 'Name', width: 150
    },
    {
        field: 'ProductVariantPurchase', headerName: 'Purchase Product', width: 300
    },
    {
        field: 'ProductVariantPromotion', headerName: 'Promotion Product', width: 300
    },
    {
        field: 'Value', headerName: 'Value', width: 110,
        renderCell: (params) => {
            return (
                <div className={"priceCell" + " " + params.row.Value}>
                    {params.row.Value}
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

const PromotionTable: React.FC<PromotionTableProps> = ({ rows }) => {

    // console.log('Promotion rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        const filteredRows = rows.filter(row => {
            // Console log every row
            console.log('Row:', row);

            // Check if 'Name' exists and matches the query
            const nameMatch = row.Name && row.Name.toLowerCase().includes(query.toLowerCase());

            // Check if 'Id' exists and matches the query
            const idMatch = row.Id && row.Id.toString().includes(query);

            // Check if 'ProductVariantPurchase' exists and matches the query
            const purchaseProductMatch = row.ProductVariantPurchase && row.ProductVariantPurchase.toLowerCase().includes(query.toLowerCase());

            // Check if 'ProductVariantPromotion' exists and matches the query
            const promotionProductMatch = row.ProductVariantPromotion && row.ProductVariantPromotion.toLowerCase().includes(query.toLowerCase());

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
                columns={columns.concat(actionColumn())}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />

        </div>
    )
}

export default PromotionTable