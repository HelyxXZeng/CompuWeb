import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
// import actionColumn from '../datatable/DataTable';
import actionColumn from '../datatable/DataTable';
import priceApi from '../../../api/priceApi';
import productVariantApi from '../../../api/productVariantApi';
// import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
interface PriceTableProps {
    rows: any[]; // Define the type of your rows here
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'productVariant', headerName: 'Variant', flex: 7
    },
    {
        field: 'value', headerName: 'Value', flex: 3
    },
    {
        field: 'startDate', headerName: 'Start Date', flex: 3,
        renderCell: (params) => {
            return (
                <div className={"date" + " " + params.row.startDate}>
                    {params.row.startDate}
                </div>
            );
        },
    },
    {
        field: 'endDate', headerName: 'End Date', flex: 3,
        renderCell: (params) => {
            return (
                <div className={"date" + " " + params.row.endDate}>
                    {params.row.endDate}
                    {/* {params.row.endDate.split['T'][0]} */}
                </div>
            );
        },
    },
    {
        field: 'status', headerName: 'Status'
    }
]

const PriceTable: React.FC<PriceTableProps> = ({ rows }) => {

    // console.log('Price rows: ', rows)
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [productVariants, setProductVariants] = useState<any[]>([]);
    const [productVariantsFetched, setProductVariantsFetched] = useState(false);

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            priceApi.remove(rowId);
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
        navigate(`/prices/GetPriceById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const fetchProductVariants = async () => {
            try {
                const productVariantsData = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
                await setProductVariants(productVariantsData);
                setProductVariantsFetched(true);
            } catch (error) {
                console.log('Failed to fetch ProductVariant data:', error);
            }
        };

        const formatDate = async () => {
            rows.forEach(
                row => {
                    try {
                        // console.log('Split date', row.startDate.substring(0, 10))
                        row.startDate = row.startDate.substring(0, 10)
                        row.endDate = row.endDate.substring(0, 10)
                    }
                    catch (error) {

                    }
                }
            )
        }

        fetchProductVariants();
        formatDate();
    }, []);

    useEffect(() => {
        if (productVariantsFetched) {
            // Update rows with product variants
            rows.forEach((row) => {
                row.productVariant = productVariants.find((item) => item.id === row.productVariantId)?.name || 'N/A';
            });

            // Update displayedRows with filtered rows
            try {
                const filteredRows = rows.filter((row) =>
                    row.id.toString().includes(query) // Check Id (assuming Id is a number)
                );
                setDisplayedRows(filteredRows);
            } catch (error) {
                // Handle error if needed
            }
        }
    }, [productVariantsFetched, productVariants, rows, query]);

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Price
                <div className="search">
                    <input type='text' placeholder='Search...' onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <Link to="/prices/new" className='link'>
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

export default PriceTable