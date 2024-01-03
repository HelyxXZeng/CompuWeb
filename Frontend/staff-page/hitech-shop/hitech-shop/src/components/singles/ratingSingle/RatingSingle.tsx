//RatingSingle.tsx
import { Autocomplete, Rating, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productVariantApi from '../../../api/productVariantApi';
import ratingApi, { Rate } from '../../../api/ratingApi';
// import './ratingSingle.scss';
import '../commonSingle/commonSingle.scss'

interface Props {
    rating: any
}

const initRating = {
    id: 0,
    orderItemId: 0,
    date: '2023-12-31',
    rating: 0,
    comment: '',
    status: 'NOTAPPROVED'
}

const fetchProductVariants = async () => {
    // Fetch productVariants data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const statusList = ['APPROVED', 'NOTAPPROVED']

const RatingSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [rating, setRating] = useState<Rate>(initRating);
    const [variantName, setVariantName] = useState('Null')
    const [date, setDate] = useState('Null')

    useEffect(() => {

        const fetchVariant = async () => {
            const data = (await productVariantApi.get(para.rating.orderItemId)).data;
            setVariantName(data.name);
        }

        if (para.rating !== null) {
            const updatedRating: Rate = {
                ...para.rating,
                date: para.rating.date.substring(0, 10),
            };

            setRating(updatedRating);
        }

        const formatDate = () => {
            setDate(para.rating.date.substring(0, 10))
        }

        fetchVariant();
        formatDate();
    }, [para.rating]);

    const handleStatusChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setRating((prevRating) => ({ ...prevRating, status: newValue }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('this is rating', rating)

        try {
            await ratingApi.update(rating.id, rating);

            alert("Successfully Uploaded!");
        } catch (error) {

        }
    };

    return (
        <div className="single-page">
            <h2>Rating</h2>
            <form onSubmit={handleSubmit}>
                <label>Product Variant:</label>
                <input
                    type="text"
                    id="value"
                    name="value"
                    value={variantName}
                    readOnly
                />


                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    readOnly
                />

                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={para.rating.comment}
                    readOnly
                />

                <label htmlFor="rate">Rate:</label>
                <Rating name="read-only" value={para.rating.rate} readOnly />

                <label htmlFor="status">Status:</label>
                <Autocomplete
                    className='autocomplete'
                    disablePortal
                    id="Status"
                    options={statusList}
                    value={rating.status}
                    onChange={handleStatusChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default RatingSingle;
