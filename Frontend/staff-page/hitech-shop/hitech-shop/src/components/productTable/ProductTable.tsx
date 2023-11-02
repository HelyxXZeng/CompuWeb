import './productTable.scss'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ProductTable = () => {

    const rows = [
        {
            id: 1,
            Id: 1,
            Name: 'Redmi Note 12 4GB 128GB',
            Category: 'Smartphone',
            Quantity: 26,
            Price: 4990000,
        },
        {
            id: 2,
            Id: 2,
            Name: 'Xiaomi 14 12GB 512GB',
            Category: 'Smartphone',
            Quantity: 6,
            Price: 14900000,
        },
        {
            id: 3,
            Id: 3,
            Name: 'Xiaomi Pad 6 6GB 128GB',
            Category: 'Tablet',
            Quantity: 20,
            Price: 9990000,
        }
    ]

    const columns: GridColDef[] = [
        {
            field: 'Id', headerName: 'ID'
        },
        {
            field: 'Category', headerName: 'Category', width: 150
        },
        {
            field: 'Name', headerName: 'Name', width: 300
        },
        {
            field: 'Quantity', headerName: 'Quantity'
        },
        {
            field: 'Price', headerName: 'Price',
            renderCell: (params) => {
                return (
                    <div className="priceCell">
                        {params.row.Price}
                    </div>
                );
            },
        }
    ]

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Products
                <div className="search">
                    <input type='text' placeholder='Search...' />
                    <SearchIcon />
                </div>
                <Link to="/products/new" className='link'>
                    Add New
                </Link>
            </div>

            <DataGrid
                className='datagrid'
                rows={rows}
                columns={columns}
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

export default ProductTable