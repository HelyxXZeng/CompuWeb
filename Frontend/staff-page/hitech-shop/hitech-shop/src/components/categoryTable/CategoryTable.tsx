import './categoryTable.scss'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';


const rows = [
    {
        id: 1,
        Id: 1,
        Name: 'Laptop'
    },
    {
        id: 2,
        Id: 2,
        Name: 'Smartphone'
    },
    {
        id: 3,
        Id: 3,
        Name: 'Screen'
    },
    {
        id: 4,
        Id: 4,
        Name: 'Tablet'
    }
]

const columns: GridColDef[] = [
    {
        field: 'Id', headerName: 'ID'
    },
    {
        field: 'Name', headerName: 'Name', width: 400
    }
]

const CategoryTable = () => {

    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);

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
    }, [query]);


    return (
        // <TableContainer component={Paper} className="table">
        //     <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell className="tableCell">Tracking ID</TableCell>
        //                 <TableCell className="tableCell">Product</TableCell>
        //                 <TableCell className="tableCell">Customer</TableCell>
        //                 <TableCell className="tableCell">Date</TableCell>
        //                 <TableCell className="tableCell">Amount</TableCell>
        //                 <TableCell className="tableCell">Payment Method</TableCell>
        //                 <TableCell className="tableCell">Status</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows.map((row) => (
        //                 <TableRow key={row.id}>
        //                     <TableCell className="tableCell">{row.id}</TableCell>
        //                     <TableCell className="tableCell">
        //                         <div className="cellWrapper">
        //                             <img src={row.img} alt="" className="image" />
        //                             {row.product}
        //                         </div>
        //                     </TableCell>
        //                     <TableCell className="tableCell">{row.customer}</TableCell>
        //                     <TableCell className="tableCell">{row.date}</TableCell>
        //                     <TableCell className="tableCell">{row.amount}</TableCell>
        //                     <TableCell className="tableCell">{row.method}</TableCell>
        //                     <TableCell className="tableCell">
        //                         <span className={`status ${row.status}`}>{row.status}</span>
        //                     </TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </MuiTable>
        // </TableContainer>
        <div className='datatable'>
            <div className="datatableTitle">
                Product Categories
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/categories/new" className='link'>
                    Add New
                </Link>
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

export default CategoryTable