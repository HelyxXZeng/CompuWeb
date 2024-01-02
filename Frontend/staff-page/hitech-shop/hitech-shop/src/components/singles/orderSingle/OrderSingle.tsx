import React, { useEffect, useState } from 'react';
import orderApi, { Order, OrderDetail } from '../../../api/orderApi';
// import './orderSingle.scss'
import './orderSingle.scss'
import { Autocomplete, TextField } from '@mui/material';
import productApi from '../../../api/productApi';
import promotionApi from '../../../api/promotionApi';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface Props {
    order: OrderDetail;
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'image', headerName: 'Image', width: 80,
        renderCell: (params) => {
            return (
                <div>
                    <img src={params.row.image} style={{ width: 50 }} />
                </div>
            );
        },
    },
    {
        field: 'name', headerName: 'Variant', flex: 5
    },
    {
        field: 'quantity', headerName: 'Quantity', flex: 1
    },
    {
        field: 'price', headerName: 'Price', flex: 5
    }
]

const statusList = ['PENDING', 'SHIPPING', 'RECEIVED', 'COMPLETED', 'CANCELED', 'DECLINED']


const OrderSingle: React.FC<Props> = (para: Props) => {
    const [displayedRows, setDisplayedRows] = useState<any>(null)
    const [promotion, setPromotion] = useState<any>(null)
    const [orderUpload, setOrderUpload] = useState<any>(null)

    const [order, setOrder] = useState<OrderDetail>({
        id: 0,
        customerName: '',
        customerPhoneNumber: '+840',
        address: '',
        total: 0,
        status: '',
        date: '2023-31-12',
        note: '',
        variantByOrderItems: []
    });

    const fetchOrder = async () => {
        const data = (await orderApi.get(para.order.id)).data;
        setOrderUpload(data)
    }
    const fetchPromotion = async (para: any) => {
        const data = (await promotionApi.get(para.id)).data;
        setPromotion(data)
    }

    useEffect(() => {
        if (para.order !== null) {

            fetchOrder();

            if (orderUpload && orderUpload.promotionId) {
                fetchPromotion(orderUpload.id)
            }

            const updatedOrder: OrderDetail = {
                ...para.order,
                date: para.order.date.substring(0, 10),
            };
            setOrder(updatedOrder);

            // console.log('Order upload', orderUpload)

            const setOrderItems = () => {
                const orderItemList = para.order.variantByOrderItems.map((item: any, index: number) => ({
                    id: index + 1,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price

                }))

                setDisplayedRows(orderItemList)
            }

            setOrderItems();
        }
    }, [para.order]);

    const handleStatusChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setOrderUpload((pre: any) => ({ ...pre, status: newValue }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await orderApi.update(order.id, orderUpload);

            alert('Successfully Uploaded!');


        } catch (error) {
            console.error('Error:', error);
            alert('Error! ' + error);
        }
    };

    return (
        <div className="single-page">
            <h2>Order Detail</h2>
            <table>
                <tr>
                    <td className='half'>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="customerName">Customer:</label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={order.customerName}
                                readOnly
                            />

                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={order.date}
                                readOnly
                            />

                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="customerPhoneNumber"
                                name="customerPhoneNumber"
                                value={order.customerPhoneNumber}
                                readOnly
                            />

                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={order.address}
                                readOnly
                            />

                            <label htmlFor="promotion">Promotion:</label>
                            <input
                                type="text"
                                id="promotion"
                                name="promotion"
                                value={promotion && promotion.content || ''}
                                readOnly
                            />

                            <label htmlFor="total">Total:</label>
                            <input
                                type="number"
                                id="total"
                                name="total"
                                value={order?.total || ''}
                                readOnly
                            />

                            <label htmlFor="status">Status:</label>
                            <Autocomplete
                                className='autocomplete'
                                disablePortal
                                id="Status"
                                options={statusList}
                                value={orderUpload?.status || ''}
                                onChange={handleStatusChange}
                                renderInput={(params) => <TextField {...params} label="" />}
                            />

                            <label htmlFor="date">Note:</label>
                            <input
                                type="text"
                                id="note"
                                name="note"
                                value={order.note}
                                readOnly
                            />
                            <button type="submit" className="button">
                                Submit
                            </button>
                        </form>
                    </td>
                    <td className='right'>
                        <DataGrid
                            className='datagrid'
                            rows={displayedRows || []}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                                columns: {
                                    columnVisibilityModel: {
                                        id: false,
                                    },
                                },
                            }}
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default OrderSingle;
