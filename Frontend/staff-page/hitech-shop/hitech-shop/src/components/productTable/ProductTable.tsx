import './productTable.scss'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

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

const ProductTable = () => {

    // Use a Set to collect unique category values
    const categorySet = new Set(rows.map(row => row.Category));

    // Convert the Set back to an array
    const categories = Array.from(categorySet);

    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    const filterRowsByCategory = (category: string) => {
        // Clear the search input
        setQuery("");
        setSelectedCategory(category);
        // Filter rows by the selected category
        const filteredRows = rows.filter(row => row.Category === category);
        setDisplayedRows(filteredRows);
    };


    useEffect(() => {
        // Use the filter method to create a new array with rows that match the category filter
        let filteredRows = rows;
        if (selectedCategory !== "") {
            filteredRows = filteredRows.filter(row => row.Category === selectedCategory);
        }

        // Apply the input filter to the category-filtered rows
        filteredRows = filteredRows.filter(row =>
            row.Name.toLowerCase().includes(query.toLowerCase()) ||
            row.Id.toString().includes(query)
        );

        setDisplayedRows(filteredRows);
    }, [query, selectedCategory]);

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