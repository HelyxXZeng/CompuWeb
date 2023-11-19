//ProductVariantSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productLineApi from '../../../api/productLineApi';
import productVariantApi, { ProductVariant } from '../../../api/productVariantApi';
import './productVariantSingle.scss';


// interface ProductVariant {
//     id: number,
//     productLineId: number,
//     name: string,
// }

interface Props {
    productVariant: ProductVariant
}

const initProductVariant = {
    id: 0,
    productLineId: 0,
    name: '',
}

const fetchProductLines = async () => {
    // Fetch productLines data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await productLineApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const ProductVariantSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [productVariant, setProductVariant] = useState<ProductVariant>(initProductVariant);
    const [productLines, setProductLines] = useState([]);

    useEffect(() => {
        if (para.productVariant !== null) {
            // console.log('para productVariant', para.productVariant)
            setProductVariant(para.productVariant);
        }
    }, [para.productVariant]);

    useEffect(() => {
        const fetchData = async () => {
            const productLinesData = await fetchProductLines();
            setProductLines(productLinesData);
        };

        fetchData();
    }, []); // Fetch productLines only once when the component mounts

    const handleProductLineChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: { id: number; name: string } | null
    ) => {
        if (newValue) {
            setProductVariant((prevProductVariant) => ({ ...prevProductVariant, productLineId: newValue.id }));
        }
        console.log('New Value: ', newValue)
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)

        if (name === 'releaseDate')
            console.log('this is value from product line', value)
        setProductVariant((prevProductVariant) => ({ ...prevProductVariant, [name]: value }));
        // console.log('Product Variant: ', productVariant)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productVariant === null) {
                console.log('This is variant will be added', productVariant)
                await productVariantApi.add(productVariant);
            } else {
                await productVariantApi.update(productVariant.id, productVariant);
            }

            // Reset the form
            setProductVariant(initProductVariant);

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productVariant === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productVariant:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="productVariant-page">
            <h2>Product Variants</h2>
            <form onSubmit={handleSubmit}>
                <label>ProductLine:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="productLineId"
                    options={productLines}
                    getOptionLabel={(option: any) => option.name}
                    value={productLines.find((productLine: any) => productLine.id === productVariant.productLineId) || null}
                    onChange={handleProductLineChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={productVariant.name}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default ProductVariantSingle;
