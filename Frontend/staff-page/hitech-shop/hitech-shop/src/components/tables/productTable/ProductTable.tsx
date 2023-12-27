import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import '../datatable/datatable.scss'
import productApi from '../../../api/productApi';
// import { handleDelete, handleView, actionColumn } from '../datatable/DataTable';

const ALL = "All"

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'categoryName', headerName: 'Category', width: 150
    },
    {
        field: 'name', headerName: 'Name', width: 300,
    },
    {
        field: 'numberInStock', headerName: 'Quantity', width: 80,
        renderCell: (params) => {
            return (
                <div className="quantityCell">
                    {params.row.numberInStock}
                </div>
            );
        },
    },
    {
        field: 'price', headerName: 'Price', width: 500,
        renderCell: (params) => {
            return (
                <div className="priceCell">
                    {params.row.price}
                </div>
            );
        },
    }
]

interface Row {
    id: number;
    categoryName: string;
    name: string,
    numberInStock: number,
    price: number
}

const ProductTable = () => {
    const [rows, setRows] = useState<Row[]>([]);
    // Use a Set to collect unique category values
    const categorySet = new Set(rows.map(row => row.categoryName));

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
    };

    useEffect(() => {
        const fetchRows = async () => {
            const data = (await productApi.getAll({ _page: 1, _limit: 100000 })).data;
            setRows(data)
            // console.log('This is rows in fetch', data)
        }

        fetchRows();
    }, [])


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
        <div className='datatable'>
            <div className="datatableTitle">
                Product Overview
                <div className="search">
                    <input type='text' placeholder='Search...' value={query} onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
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