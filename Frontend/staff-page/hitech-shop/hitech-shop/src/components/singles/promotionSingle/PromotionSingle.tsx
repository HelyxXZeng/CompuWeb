//PromotionSingle.tsx
import React, { useEffect, useState } from 'react';
import promotionApi from '../../../api/promotionApi';
import './promotionSingle.scss'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface Promotion {
    Id: number,
    Name: string,
    ProductVariantIdPurchase: number,
    ProductVariantIdPromotion: number,
    StartDate: Date,
    EndDate: Date,
    Content: string,
    Value: number,
    Status: string
}

interface Props {
    promotion: Promotion
}

const StatusList = [
    'ACTIVE',
    'CANCELED',
    'OUTOFORDER',
    'OUTDATED'
]

const PromotionSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [promotion, setPromotion] = useState({
        Id: 0,
        Name: '',
        ProductVariantIdPurchase: 0,
        ProductVariantIdPromotion: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Content: '',
        Value: 0,
        Status: ''
    });


    useEffect(() => {
        if (para.promotion !== null) {
            setPromotion(para.promotion);
        }
    }, [para]);
    // useEffect(() => {
    //     console.log('This is promotion', promotion)
    //     console.log('This is image file', imageFile)
    // }, [promotion, imageFile])

    // const handleInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     const { name, value } = e.target;
    //     // console.log('This is input name', name)
    //     // console.log('This is input value', value)
    //     setPromotion((prevPromotion) => ({ ...prevPromotion, [name]: value }));
    // };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Handle date inputs separately to convert Date objects to strings
        if (name === 'StartDate' || name === 'EndDate') {
            const dateValue = new Date(value); // Convert the string back to a Date object
            setPromotion((prevPromotion) => ({
                ...prevPromotion,
                [name]: dateValue,
            }));
        } else {
            // For other inputs, directly set the value
            setPromotion((prevPromotion) => ({
                ...prevPromotion,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (para.promotion === null) {
            try {
                await promotionApi.add({
                    Id: promotion.Id,
                    Name: promotion.Name,
                    ProductVariantIdPurchase: promotion.ProductVariantIdPurchase,
                    ProductVariantIdPromotion: promotion.ProductVariantIdPromotion,
                    StartDate: promotion.StartDate,
                    EndDate: promotion.EndDate,
                    Content: promotion.Content,
                    Value: promotion.Value,
                    Status: promotion.Status
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setPromotion({
                    Id: 0,
                    Name: '',
                    ProductVariantIdPurchase: 0,
                    ProductVariantIdPromotion: 0,
                    StartDate: new Date(),
                    EndDate: new Date(),
                    Content: '',
                    Value: 0,
                    Status: ''
                });

            } catch (error) {
                console.error('Error in adding promotion:', error);
                alert("Error!" + error)
            }
        } else {
            try {
                await promotionApi.update(promotion.Id, {
                    Id: promotion.Id,
                    Name: promotion.Name,
                    ProductVariantIdPurchase: promotion.ProductVariantIdPurchase,
                    ProductVariantIdPromotion: promotion.ProductVariantIdPromotion,
                    StartDate: promotion.StartDate,
                    EndDate: promotion.EndDate,
                    Content: promotion.Content,
                    Value: promotion.Value,
                    Status: promotion.Status
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setPromotion({
                    Id: 0,
                    Name: '',
                    ProductVariantIdPurchase: 0,
                    ProductVariantIdPromotion: 0,
                    StartDate: new Date(),
                    EndDate: new Date(),
                    Content: '',
                    Value: 0,
                    Status: ''
                });

            } catch (error) {
                console.error('Error in updating promotion:', error);
                alert("Error!" + error)
            }
        }

    };

    return (
        <div className="promotion-page">
            <h2>Promotion</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={promotion.Name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="Content">Content:</label>
                <input
                    type="text"
                    id="Content"
                    name="Content"
                    value={promotion.Content}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="Value">Value:</label>
                <input
                    type="number"
                    id="Value"
                    name="Value"
                    value={promotion.Value}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="Status">Status:</label>
                <Autocomplete
                    className='autocomplete'
                    disablePortal
                    id="Status"
                    options={StatusList}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />

                <label htmlFor="StartDate">Start Date:</label>
                <input
                    type="date"
                    id="StartDate"
                    name="StartDate"
                    value={promotion.StartDate.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    required
                />


                <label htmlFor="EndDate">End Date:</label>
                <input
                    type="date"
                    id="EndDate"
                    name="EndDate"
                    value={promotion.EndDate.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    required
                />


                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default PromotionSingle;
