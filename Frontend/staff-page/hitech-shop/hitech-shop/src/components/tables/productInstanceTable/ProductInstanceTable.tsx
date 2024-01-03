import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
import productInstanceApi from '../../../api/productInstanceApi';
import productVariantApi from '../../../api/productVariantApi';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface Row {
    id: number,
    productVariantName: string,
    serialNumber: string,
    available: string
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'productVariantName', headerName: 'Product Variant Name', flex: 4
    },
    {
        field: 'serialNumber', headerName: 'Serial Number', flex: 3
    },
    {
        field: 'available', headerName: 'Available', flex: 2
    },

]

const ProductInstanceTable = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    // const [productVariants, setProductVariants] = useState<any[]>([]);
    const previousRowsRef = useRef<any[]>([]);
    // useEffect(() => {
    //     const fetchProductVariants = async () => {
    //         try {
    //             const productVariantsData = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
    //             setProductVariants(productVariantsData);
    //         } catch (error) {
    //             console.log('Failed to fetch ProductVariant data:', error);
    //         }
    //     };

    //     fetchProductVariants();
    // }, []);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            productInstanceApi.remove(rowId);
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
        navigate(`/productInstances/GetProductInstanceById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const fetchRows = async () => {
            const data = (await productInstanceApi.getAll({ _page: 1, _limit: 100000 })).data;
            setRows(data)
            console.log('This is rows in fetch', data)
        }

        fetchRows();
    }, [])

    useEffect(() => {
        // Check if the rows have actually changed
        // if (previousRowsRef.current !== rows && productVariants.length > 0) {
        //     // Update rows directly to include productVariant name
        //     // console.log('Product Variants in Instance', productVariants)
        //     rows.forEach(row => {
        //         row.productVariant = productVariants.find(pl => pl.id === row.productVariant)?.name || 'N/A';
        //     });

        // }

        // Use the filter method to create a new array with rows that match the query in either Name or Id
        // console.log('Rows in Instances:', rows)
        try {
            const filteredRows = rows.filter(row =>
                (row.serialNumber && row.serialNumber.toLowerCase().includes(query.toLowerCase()))
                || (row.id && row.id.toString().includes(query))
                || (row.productVariantName && row.productVariantName.toLowerCase().includes(query.toLowerCase()))
            );
            setDisplayedRows(filteredRows);
        }
        catch (error) {
            // console.log('Error in Instance Table', error)
        }

        // Update the previousRowsRef with the current rows
        previousRowsRef.current = rows.slice(); // Copy the array to avoid reference issues
    }, [query, rows]);

    return (
        <div className='datatable' style={{ maxWidth: 1200 }}>
            <div className="datatableTitle">
                Product Instances
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/productInstances/new" className='link'>
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

export default ProductInstanceTable