import React, { useEffect, useState } from 'react';
import orderApi, { OrderDetail } from '../../../api/orderApi';
// import './orderSingle.scss'
import IosShareIcon from '@mui/icons-material/IosShare';
import { Autocomplete, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import promotionApi from '../../../api/promotionApi';
import './orderSingle.scss';
import paymentApi from '../../../api/paymentApi';
import { base64 } from './Unicodefont';


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
        field: 'quantity', headerName: 'Quantity', flex: 2
    },
    {
        field: 'price', headerName: 'Price', flex: 5,
        renderCell: (params) => {
            return (
                <span>{new Intl.NumberFormat('en-US').format(params.row.price).replace(/,/g, '.')}</span>
            );
        },
    }
]

const statusList = ['PENDING', 'SHIPPING', 'RECEIVED', 'COMPLETED', 'CANCELED', 'DECLINED']
const paymentStatusList = ['DONE', 'NOTDONE']


const OrderSingle: React.FC<Props> = (para: Props) => {
    const [displayedRows, setDisplayedRows] = useState<any>(null)
    const [promotion, setPromotion] = useState<any>(null)
    const [orderUpload, setOrderUpload] = useState<any>(null)
    const [payment, setPayment] = useState({
        id: 0,
        orderId: 0,
        paymentMethod: "CASH",
        paymentStatus: "NOTDONE"
    })

    const [order, setOrder] = useState<OrderDetail>({
        id: 0,
        customerName: '',
        customerPhoneNumber: '+840000000',
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

    const fetchPayment = async (id: number) => {
        const data = (await paymentApi.getPaymentByOrderId(id)).data[0];
        console.log('this is data', data)
        setPayment(data)
    }

    useEffect(() => {
        if (para.order !== null) {

            fetchOrder();

            fetchPayment(para.order.id)

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

    const handlePaymentStatusChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setPayment((pre: any) => ({ ...pre, paymentStatus: newValue }));
        }
    };

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
            await paymentApi.update(payment.id, payment)
            alert('Successfully Uploaded!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error! ' + error);
        }
    };

    const handleExportPDF = async () => {
        console.log('this is payment', payment)
        const doc = new jsPDF();
        doc.addFileToVFS('Roboto-Regular.ttf', base64);
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
        doc.setFont('Roboto');

        // Add order information to the PDF
        doc.text(`Hitech Shop`, 10, 10);
        doc.text(`Hóa đơn bán hàng`, 80, 10);
        doc.text(`Mã số hóa đơn: ${order.id.toString()}`, 10, 20);
        doc.text(`Mã số khách hàng: ${orderUpload.customerId.toString()}`, 10, 30);
        doc.text(`Tên khách hàng: ${order.customerName}`, 10, 40);
        doc.text(`Mã số nhân viên bán hàng: ${orderUpload.staffId.toString()}`, 10, 50);
        doc.text(`Địa chỉ nhận hàng: ${order.address}`, 10, 60);
        doc.text(`Ngày: ${order.date}`, 10, 70);
        doc.text(`Ghi chú: ${order.note}`, 10, 80);
        doc.text(`Tổng tiền (đồng): ${new Intl.NumberFormat('en-US').format(order.total).replace(/,/g, '.').toString()}`, 10, 90);



        // Prepare table data
        const body = displayedRows.map((row: any) => [row.id, row.name, row.quantity, row.price]);
        const headers = ["ID", "Name", "Quantity", "Price"];

        // Add a table for order items
        autoTable(doc, {
            startY: 100, // start the table at a lower position to avoid overlap with the text
            head: [headers],
            body: body,
            styles: { fontSize: 12, cellPadding: 1, overflow: 'linebreak', font: 'roboto' },
            columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 }, 3: { cellWidth: 50 } }
        });

        // Get the Y position after the table
        const finalY = 100 + para.order.variantByOrderItems.length * 8;

        // Add signature part
        doc.text(`Khách hàng kí tên: `, 10, finalY + 20);
        doc.text(`Đại diện cửa hàng kí tên: `, 130, finalY + 20);

        // Save the PDF
        doc.save(`order-${order.id}.pdf`);
    };



    return (
        <div className="order-single-page">
            <h2>Order Detail</h2>
            <table>
                <tr>
                    <td className='half'>
                        <form onSubmit={handleSubmit}>
                            <p><b>Customer:</b> {order.customerName}</p>
                            <p><b>Date:</b> {order.date}</p>
                            <p><b>Phone Number:</b> {order.customerPhoneNumber}</p>
                            <p><b>Address:</b> {order.address}</p>
                            <p><b>Promotion:</b> {promotion && promotion.content || 'N/A'}</p>
                            <p><b>Note:</b> {order.note || 'N/A'}</p>
                            <p><b>Payment Method:</b> {payment.paymentMethod}</p>


                            <p><b>Payment Status:</b></p>
                            <Autocomplete
                                className='autocomplete'
                                disablePortal
                                id="PaymentStatus"
                                options={paymentStatusList}
                                value={payment.paymentStatus}
                                onChange={handlePaymentStatusChange}
                                renderInput={(params) => <TextField {...params} label="" />}
                            />

                            <p><b>Status:</b></p>
                            <Autocomplete
                                className='autocomplete'
                                disablePortal
                                id="Status"
                                options={statusList}
                                value={orderUpload?.status || ''}
                                onChange={handleStatusChange}
                                renderInput={(params) => <TextField {...params} label="" />}
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
                            pageSizeOptions={[5, 10]}
                        />
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <h3>Total: {new Intl.NumberFormat('en-US').format(order.total).replace(/,/g, '.')} VNĐ</h3>
                            <Button variant="contained" onClick={handleExportPDF}>
                                <IosShareIcon></IosShareIcon>&nbsp;&nbsp;Export Order</Button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default OrderSingle;
