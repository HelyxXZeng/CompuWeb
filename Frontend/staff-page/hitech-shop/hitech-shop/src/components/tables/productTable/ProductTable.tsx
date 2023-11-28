import './productTable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import actionColumn from '../datatable/DataTable';
// import { handleDelete, handleView, actionColumn } from '../datatable/DataTable';

const ALL = "All"

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'categoryName', headerName: 'Category', flex: 2
    },
    {
        field: 'name', headerName: 'Name', flex: 4,
    },
    {
        field: 'numberInStock', headerName: 'Quantity', flex: 1,
        renderCell: (params) => {
            return (
                <div className="quantityCell">
                    {params.row.numberInStock}
                </div>
            );
        },
    },
    {
        field: 'price', headerName: 'Price', flex: 2,
        renderCell: (params) => {
            return (
                <div className="priceCell">
                    {params.row.price}
                </div>
            );
        },
    }
]

interface ProductTableProps {
    rows: any[]; // Define the type of your rows here
}

const ProductTable: React.FC<ProductTableProps> = ({ rows }) => {

    // Use a Set to collect unique category values
    const categorySet = new Set(rows.map(row => row.categoryName));

    // Convert the Set back to an array and add "All" at the beginning
    const [categories, setCategories] = useState([ALL, ...Array.from(categorySet)]);

    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [selectedCategory, setSelectedCategory] = useState(ALL);

    // const handleDelete = (rowId: number) => {
    //     const isConfirmed = window.confirm('Are you sure you want to delete this row?');
    //     if (isConfirmed) {
    //         // Perform the deletion action here
    //         console.log('Deleting row with ID:', rowId);
    //     }
    // };

    // const handleView = (rowId: number) => {
    //     console.log('Viewing row with ID:', rowId);
    // };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    const filterRowsByCategory = (category: string) => {
        // Clear the search input
        setQuery("");
        // console.log('Selected category: ' + category)

        setSelectedCategory(category);
    };

    useEffect(() => {
        setCategories([ALL, ...Array.from(categorySet)])
        // Use the filter method to create a new array with rows that match the category filter
        let filteredRows = rows;
        if (selectedCategory !== ALL) {
            filteredRows = filteredRows.filter(row => row.categoryName === selectedCategory);
        }

        // Apply the input filter to the category-filtered rows
        filteredRows = filteredRows.filter(row =>
            row.name.toLowerCase().includes(query.toLowerCase()) ||
            row.id.toString().includes(query)
        );

        setDisplayedRows(filteredRows);
    }, [query, selectedCategory, rows]);

    return (
        <div className='product-datatable'>
            <div className="datatableTitle">
                Products
                <div className="search">
                    <input type='text' placeholder='Search...' value={query} onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                {/* <Link to="/products/new" className='link'>
                    Add New
                </Link> */}
                <div style={{ width: 10 }}></div>
            </div>

            <div className="categoryList">
                {
                    categories.map((category: string, index: number) => (
                        <button key={index} className='categoryButton'
                            onClick={() => filterRowsByCategory(category)}>{category}</button>
                    ))
                }
            </div>

            <DataGrid
                className='datagrid'
                rows={displayedRows}
                columns={columns}
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

export default ProductTable