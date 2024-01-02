import './orderTable.scss'
// import '../datatable/datatable.scss'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import actionColumn from '../datatable/DataTable';
import orderApi from '../../../api/orderApi';
// import { handleDelete, handleView, actionColumn } from '../datatable/DataTable';
interface Row {
    id: number;
    customerName: string;
    customerPhoneNumber: string,
    total: number,
    status: string,
    date: string
}


const statusList = ["ALL", "PENDING", "SHIPPING", "RECEIVED", "COMPLETED"]

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 70
    },
    {
        field: 'customerName', headerName: 'Name', width: 300
    },
    {
        field: 'customerPhoneNumber', headerName: 'Phone', width: 140
    },
    {
        field: 'date', headerName: 'Date', width: 150
    },
    {
        field: 'total', headerName: 'Total', width: 100,
        renderCell: (params) => {
            return (
                <div className={"priceCell" + " " + params.row.total}>
                    {params.row.total}
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

const OrderTable = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [query, setQuery] = useState("");
    const [displayedRows, setDisplayedRows] = useState(rows);
    const [currentStatus, setCurrentStatus] = useState("ALL")

    const navigate = useNavigate();

    const handleDelete = (rowId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');
        if (isConfirmed) {
            // Perform the deletion action here
            orderApi.remove(rowId);
            console.log('Deleting row with ID:', rowId);

            // Update displayedRows after the item has been deleted
            const updatedRows = displayedRows.filter(row => row.id !== rowId); // It should be row.Id later
            setDisplayedRows(updatedRows);
            rows.filter(row => row.id !== rowId); // It should be row.Id later
        }
    };

    const handleView = (rowId: number) => {
        // console.log('Viewing row with ID:', rowId);
        navigate(`/orders/GetOrderById?id=${rowId}`);
    };

    const handleInput = (event: any) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const fetchRows = async () => {
            const data = (await orderApi.getAll({ _page: 1, _limit: 100000 })).data;
            setRows(data)
            // console.log('This is rows in fetch', data)
        }
        // const temp = async () => {
        //     const data = (await orderApi.getTemp()).data;
        //     console.log('this is fromt temp:', data)
        //     // console.log('This is rows in fetch', data)
        // }



        fetchRows();
        // temp()
    }, [])

    useEffect(() => {
        const formatDate = async () => {
            rows.forEach(
                row => {
                    try {
                        // console.log('Split date', row.startDate.substring(0, 10))
                        row.date = row.date.substring(0, 10)
                    }
                    catch (error) {

                    }
                }
            )
            // console.log('after format', rows)
        }
        formatDate();

    }, [rows])


    useEffect(() => {
        // console.log('is this come here?')
        // Use the filter method to create a new array with rows that match the query in either Name or Id
        let filteredRows = rows;
        if (currentStatus !== "ALL") {
            filteredRows = filteredRows.filter(row => row.status === currentStatus);
        }
        if (query !== '') {

            try {

                filteredRows = filteredRows.filter(row =>
                    row.customerName.toLowerCase().includes(query.toLowerCase()) || // Check Name
                    row.id.toString().includes(query) || // Check Id (assuming Id is a number)
                    row.customerPhoneNumber.toString().includes(query) // Check Id (assuming Phone is a number)
                );
            }
            catch (error) {
                // console.log('Error', error)
            }
        }

        // console.log('this is rows', rows)
        // console.log('this is filter rows', filteredRows)
        setDisplayedRows(filteredRows);
    }, [rows, query, currentStatus]);

    const filterRowsByStatus = (Status: string) => {
        // Clear the search input
        setQuery("");

        setCurrentStatus(Status);
        console.log('Selected Status: ' + Status)
    };


    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Orders
                <div className="search">
                    <input type='text' placeholder='Search...' value={query} onChange={(e) => handleInput(e)} />
                    <SearchIcon />
                </div>
                <div style={{ width: 10 }}></div>
                {/* <Link to="/orders/new" className='link'>
                    Add New
                </Link> */}
            </div>



            {
                rows.length > 0 ?

                    <>
                        <div className="statusList">
                            {
                                statusList.map((status: string, index: number) => (
                                    <button key={index} className={"statusButton " + status}
                                        onClick={() => filterRowsByStatus(status)}>{status}</button>
                                ))
                            }
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
                    </>


                    : <h2>No Data!</h2>
            }

        </div>
    )
}

export default OrderTable