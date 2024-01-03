//PriceSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productVariantApi from '../../../api/productVariantApi';
import priceApi, { Price } from '../../../api/priceApi';
// import './priceSingle.scss';
import '../commonSingle/commonSingle.scss'

interface Props {
    price: Price
}

const initPrice = {
    id: 0,
    productVariantId: 0,
    startDate: '2023-01-01',
    endDate: '2030-01-01',
    value: 0,
    status: ''
}

const fetchProductVariants = async () => {
    // Fetch productVariants data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const statusList = ['NOTREADY', 'ACTIVE', 'CANCELED', 'OUTDATED']

const PriceSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [price, setPrice] = useState<Price>(initPrice);
    const [productVariants, setProductVariants] = useState([]);

    useEffect(() => {
        if (para.price !== null) {
            const updatedPrice: Price = {
                ...para.price,
                startDate: para.price.startDate.split('T')[0],
                endDate: para.price.endDate.split('T')[0]
            };

            setPrice(updatedPrice);
        }
    }, [para.price]);

    useEffect(() => {
        const fetchData = async () => {
            const productVariantsData = await fetchProductVariants();
            setProductVariants(productVariantsData);
        };

        fetchData();
    }, []); // Fetch productVariants only once when the component mounts

    const handleProductVariantChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: { id: number; name: string } | null
    ) => {
        if (newValue) {
            setPrice((prevPrice) => ({ ...prevPrice, productVariantId: newValue.id }));
        }
        console.log('New Value: ', newValue)
    };

    const handleStatusChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setPrice((prevPrice) => ({ ...prevPrice, status: newValue }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)
        if (name === 'value') {

            setPrice((prevPrice) => ({ ...prevPrice, [name]: Number.parseInt(value) }));
        } else {

            setPrice((prevPrice) => ({ ...prevPrice, [name]: value }));
        }
        // console.log('Product Variant: ', price)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('this is price', price)

        try {
            if (para.price === null) {
                console.log('This is variant will be added', price)
                await priceApi.add(price);

                // Reset the form
                setPrice(initPrice);
            } else {
                await priceApi.update(price.id, price);
            }


            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.price === null ? 'adding' : 'updating';
            console.error(`Error in ${action} price:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="single-page">
            <h2>Price</h2>
            <form onSubmit={handleSubmit}>
                <label>Product Variant:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="productVariantId"
                    options={productVariants}
                    getOptionLabel={(option: any) => option.name}
                    value={productVariants.find((productVariant: any) => productVariant.id === price.productVariantId) || null}
                    onChange={handleProductVariantChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />
                <label htmlFor="value">Value:</label>
                <input
                    type="number"
                    id="value"
                    name="value"
                    value={price.value}
                    onChange={handleInputChange}
                    required
                />


                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={price.startDate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={price.endDate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="status">Status:</label>
                {/* <input
                    type="text"
                    id="status"
                    name="status"
                    value={price.status}
                    onChange={handleInputChange}
                    required
                /> */}
                <Autocomplete
                    className='autocomplete'
                    disablePortal
                    id="Status"
                    options={statusList}
                    value={price.status}
                    onChange={handleStatusChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default PriceSingle;
