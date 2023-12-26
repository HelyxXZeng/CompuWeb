//ProductInstanceSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productVariantApi from '../../../api/productVariantApi';
import productInstanceApi, { ProductInstance } from '../../../api/productInstanceApi';
// import './productInstanceSingle.scss';
import '../commonSingle/commonSingle.scss'

interface Props {
    productInstance: ProductInstance
}

const initProductInstance = {
    id: 0,
    productVariantId: 0,
    serialNumber: '',
    status: '',
    available: true
}

const availableList = [
    'IN STOCK',
    'OUT OF STOCK'
]

const fetchProductVariants = async () => {
    // Fetch productVariants data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await productVariantApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const ProductInstanceSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [productInstance, setProductInstance] = useState<ProductInstance>(initProductInstance);
    const [productVariants, setProductVariants] = useState([]);

    useEffect(() => {
        if (para.productInstance !== null) {
            // console.log('para productInstance', para.productInstance)
            setProductInstance(para.productInstance);
        }
    }, [para.productInstance]);

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
            setProductInstance((prevProductInstance) => ({ ...prevProductInstance, productVariantId: newValue.id }));
        }
        console.log('New Value: ', newValue)
    };

    const handleAvailableChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            // Map the display value to the actual value
            const actualValue = newValue === 'IN STOCK';
            setProductInstance((prevProductInstance) => ({ ...prevProductInstance, available: actualValue }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)

        if (name === 'releaseDate')
            console.log('this is value from product line', value)
        setProductInstance((prevProductInstance) => ({ ...prevProductInstance, [name]: value }));
        // console.log('Product Instance: ', productInstance)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productInstance === null) {
                console.log('This is variant will be added', productInstance)
                await productInstanceApi.add(productInstance);
                // Reset the form
                setProductInstance(initProductInstance);
            } else {
                await productInstanceApi.update(productInstance.id, productInstance);
            }



            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productInstance === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productInstance:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="single-page">
            <h2>Product Instances</h2>
            <form onSubmit={handleSubmit}>
                <label>ProductVariant:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="productVariantId"
                    options={productVariants}
                    getOptionLabel={(option: any) => option.name}
                    value={productVariants.find((productVariant: any) => productVariant.id === productInstance.productVariantId) || null}
                    onChange={handleProductVariantChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <label htmlFor="serialNumber">Serial Number:</label>
                <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    value={productInstance.serialNumber}
                    onChange={handleInputChange}
                    required
                />

                <label>Available:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="available"
                    options={availableList}
                    value={productInstance.available ? 'IN STOCK' : 'OUT OF STOCK'}
                    onChange={handleAvailableChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <label htmlFor="status">Status:</label>
                <input
                    type="text"
                    id="status"
                    name="status"
                    value={productInstance.status}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default ProductInstanceSingle;
