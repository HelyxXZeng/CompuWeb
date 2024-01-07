//ReturnSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import orderItemApi from '../../../api/orderItemApi';
import returnOrderApi, { Return } from '../../../api/returnApi';
// import './returnOrderSingle.scss';
import '../commonSingle/commonSingle.scss'

interface Props {
    returnOrder: any
}

// const initReturn = {
//     id: 0,
//     price: 0,
//     date: '2023-01-01',
//     issues: '',
//     status: '',
//     name: '',
//     customerName: ''
// }

const initReturnUpload: Return = {
    id: 0,
    orderItemId: 0,
    date: new Date().toISOString().substring(0, 10),
    issues: '',
    price: 0,
    comment: '',
    status: 'DONE'
}

const statusList = ['DONE', 'NOTDONE']

const ReturnSingle: React.FC<Props> = (para: Props) => {
    const [returnUpload, setReturnUpload] = useState(initReturnUpload)

    // const [returnOrder, setReturn] = useState(initReturn);
    // const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (para.returnOrder !== null) {
            const fetchOrderItem = async () => {
                const data = (await returnOrderApi.get(para.returnOrder.id)).data;
                setReturnUpload({
                    ...data,
                    date: data.date.substring(0, 10)
                })
                console.log('this is return upload', data)
            }

            fetchOrderItem();
        }
    }, [para.returnOrder]);

    const handleStatusChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setReturnUpload((prevReturn) => ({ ...prevReturn, status: newValue }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'price' || name === 'orderItemId') {

            setReturnUpload((prevReturn) => ({ ...prevReturn, [name]: Number.parseInt(value) }));
        } else {

            setReturnUpload((prevReturn) => ({ ...prevReturn, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.returnOrder === null) {
                // console.log('This is return will be added', returnUpload)
                await returnOrderApi.add(returnUpload);

                // Reset the form
                setReturnUpload(initReturnUpload);
            } else {
                // console.log('This is return will be added', returnUpload)
                await returnOrderApi.update(returnUpload.id, returnUpload);
            }

            alert("Successfully Uploaded!");
        } catch (error) {

        }
    };

    return (
        <div className="single-page">
            <h2>Return</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="orderItemId">Order Item ID:</label>
                <input
                    type="text"
                    id="orderItemId"
                    name="orderItemId"
                    value={returnUpload.orderItemId || 0}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="price">Money:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={returnUpload.price}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={returnUpload.date}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="issues">Issues:</label>
                <input
                    type="text"
                    id="issues"
                    name="issues"
                    value={returnUpload.issues}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="status">Status:</label>
                <Autocomplete
                    className='autocomplete'
                    disablePortal
                    id="Status"
                    options={statusList}
                    value={returnUpload.status}
                    onChange={handleStatusChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default ReturnSingle;
