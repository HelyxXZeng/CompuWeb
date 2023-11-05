import './productTable.scss'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import actionColumn from '../datatable/DataTable';

const ALL = "All"

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
        field: 'Quantity', headerName: 'Quantity',
        renderCell: (params) => {
            return (
                <div className="quantityCell">
                    {params.row.Quantity}
                </div>
            );
        },
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

interface ProductTableProps {
    rows: any[]; // Define the type of your rows here
}

const ProductTable: React.FC<ProductTableProps> = ({ rows }) => {

    console.log('This is rows: ' + rows)
    // Use a Set to collect unique category values
    const categorySet = new Set(rows.map(row => row.Category));

    // Convert the Set back to an array and add "All" at the beginning
    const [categories, setCategories] = useState([ALL, ...Array.from(categorySet)]);

    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [selectedCategory, setSelectedCategory] = useState(ALL);

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    const filterRowsByCategory = (category: string) => {
        // Clear the search input
        setQuery("");
        // console.log('Selected category: ' + category)

        setSelectedCategory(category);
        let filteredRows = rows;
        // Filter rows by the selected category
        if (category !== ALL) {
            filteredRows = rows.filter(row => row.Category === category);
        }
        // console.log('Filter Rows: ' + filteredRows)

        setDisplayedRows(filteredRows);
    };


    useEffect(() => {
        setCategories([ALL, ...Array.from(categorySet)])
        // Use the filter method to create a new array with rows that match the category filter
        let filteredRows = rows;
        if (selectedCategory !== ALL) {
            filteredRows = filteredRows.filter(row => row.Category === selectedCategory);
        }

        // Apply the input filter to the category-filtered rows
        filteredRows = filteredRows.filter(row =>
            row.Name.toLowerCase().includes(query.toLowerCase()) ||
            row.Id.toString().includes(query)
        );

        setDisplayedRows(filteredRows);
    }, [query, selectedCategory, rows]);

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Products
                <div className="search">
                    <input type='text' placeholder='Search...' value={query} onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/products/new" className='link'>
                    Add New
                </Link>
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

export default ProductTable