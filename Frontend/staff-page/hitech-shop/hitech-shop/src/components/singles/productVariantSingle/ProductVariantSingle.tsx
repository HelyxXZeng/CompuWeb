//ProductVariantSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productLineApi from '../../../api/productLineApi';
import productVariantApi, { ProductVariant } from '../../../api/productVariantApi';
// import './productVariantSingle.scss';
import specificationApi from '../../../api/specificationApi';
import '../commonSingle/commonSingle.scss'
import AddIcon from '@mui/icons-material/Add';
import { Price } from '../../../api/priceApi';
interface Props {
    productVariant: ProductVariant
}

const initProductVariant: ProductVariant = {
    id: 0,
    productLineId: 0,
    name: '',
    specifications: [
        {
            id: 0,
            specificationTypeId: 0,
            value: ''
        }
    ]
}


const initPrice = {
    id: 0,
    productVariantId: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2030-12-31',
    value: 0,
    status: ''
}

const ProductVariantSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [productVariant, setProductVariant] = useState<ProductVariant>(initProductVariant);
    const [productLines, setProductLines] = useState([]);
    const [specifications, setSpecifications] = useState<any>([]);
    const [specList, setSpecList] = useState<any>([])
    const [price, setPrice] = useState<Price>(initPrice);

    useEffect(() => {
        if (para.productVariant !== null) {
            // console.log('para productVariant', para.productVariant)
            setProductVariant(para.productVariant);
            setSpecList(para.productVariant.specifications)
        }
    }, [para.productVariant]);

    useEffect(() => {
        const fetchData = async () => {


            const fetchProductLines = async () => {
                // Fetch productLines data from your API
                const data = (await productLineApi.getAll({ _page: 1, _limit: 100000 })).data;
                return data;
            };

            const fetchSpecifications = async () => {
                // Fetch productLines data from your API
                const data = (await specificationApi.getAll({ _page: 1, _limit: 100000 })).data;
                return data;
            };

            const productLinesData = await fetchProductLines();
            const specificationsData = await fetchSpecifications();
            setProductLines(productLinesData);
            setSpecifications(specificationsData)
        };

        fetchData();
    }, []); // Fetch only once when the component mounts

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

        if (name === 'value') {
            setPrice((pre) => ({ ...pre, [name]: Number.parseInt(value) }))
            return;
        }
        setProductVariant((prevProductVariant) => ({ ...prevProductVariant, [name]: value }));
        // console.log('Product Variant: ', productVariant)
    };

    const addSpecificationsAutocomplete = () => {
        const newSpecificationAutocompletes = [
            ...specList,
            { id: 0, specificationTypeId: 0, value: '' }, // Initial state for the new ProductSpecificationAutocomplete
        ];
        setSpecList(newSpecificationAutocompletes);
    };

    const handleSpecificationChange = (
        index: number,
        newValue: { specificationTypeId: number, value: string } | null
    ) => {
        const updatedSpecificationAutocompletes = [...specList];
        updatedSpecificationAutocompletes[index] = newValue;
        setSpecList(updatedSpecificationAutocompletes);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productVariant === null) {
                console.log('This is variant will be added', productVariant)
                const data = await productVariantApi.add(productVariant);
                console.log('Add successfully!', data)
            } else {
                await productVariantApi.update(productVariant.id, productVariant);
            }

            // Reset the form
            setProductVariant(initProductVariant);
            setPrice(initPrice)

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productVariant === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productVariant:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="single-page">
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

                {specList.map((specAutocomplete: any, index: any) => (
                    <div key={index}>
                        <label>Specifications: {index + 1}</label>

                        <Autocomplete
                            className="autocomplete"
                            disablePortal
                            id={`specificationsId-${index}`}
                            options={specifications}
                            getOptionLabel={(option: any) => option.value}
                            value={specifications.find((spec: any) => spec.id === specAutocomplete.id) || null}
                            onChange={(event, newValue) => handleSpecificationChange(index, newValue)}
                            renderInput={(params) => <TextField {...params} label="" />}
                        />
                    </div>
                ))}

                <label htmlFor="value">Value:</label>
                <input
                    type="number"
                    id="value"
                    name="value"
                    value={price.value}
                    onChange={handleInputChange}
                    required
                />

                <AddIcon onClick={addSpecificationsAutocomplete} className="add-button">

                </AddIcon>
                {/* <button type="button" onClick={addSpecificationsAutocomplete} className="button">
                    Add Specifications
                </button> */}

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default ProductVariantSingle;
