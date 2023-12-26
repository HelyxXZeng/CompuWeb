//ProductVariantSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productLineApi from '../../../api/productLineApi';
import productVariantApi, { ProductVariant, ProductVariantWithSpecifications } from '../../../api/productVariantApi';
// import './productVariantSingle.scss';
import specificationApi from '../../../api/specificationApi';
import '../commonSingle/commonSingle.scss'
import AddIcon from '@mui/icons-material/Add';
import PriceApi, { Price } from '../../../api/priceApi';
import priceApi from '../../../api/priceApi';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
interface Props {
    productVariant: ProductVariantWithSpecifications
}

const initProductVariant: ProductVariant = {
    id: 0,
    productLineId: 0,
    name: '',
    productSpecifications: [
        {
            id: 0,
            productVariantId: 0,
            specificationId: 0
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
            setProductVariant({
                id: para.productVariant.id,
                productLineId: para.productVariant.productLineId,
                name: para.productVariant.name,
                productSpecifications: []
            });

            setSpecList(para.productVariant.specifications)

            // console.log('Spec from para', para.productVariant.specifications)
            // console.log('Spec from specList', specList)
        }
    }, [para.productVariant]);

    useEffect(() => {
        const fetchData = async () => {


            const fetchProductLines = async () => {
                // Fetch productLines data from API
                const data = (await productLineApi.getAll({ _page: 1, _limit: 100000 })).data;
                return data;
            };

            const fetchSpecifications = async () => {
                // Fetch productLines data from API
                const data = (await specificationApi.getAll({ _page: 1, _limit: 100000 })).data;
                return data;
            };

            const fetchCurrentPrice = async () => {
                // Fetch price data from API
                const data = (await PriceApi.getCurrentPrice(para.productVariant.id)).data;
                return data;
            };

            const productLinesData = await fetchProductLines();
            const specificationsData = await fetchSpecifications();

            setProductLines(productLinesData);
            setSpecifications(specificationsData)

            if (para.productVariant !== null) {
                const currentPrice = await fetchCurrentPrice();
                setPrice(currentPrice)
            }
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
        // console.log('New Value: ', newValue)
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
            { id: 0, specificationTypeId: 0, value: "" }, // Initial state for the new ProductSpecificationAutocomplete
        ];
        setSpecList(newSpecificationAutocompletes);

    };

    const handleSpecificationChange = (
        index: number,
        newValue: { id: number, specificationTypeId: number, value: string } | null
    ) => {
        setSpecList((prevSpecList: any) => {
            const updatedData = [...prevSpecList];
            updatedData[index] = newValue;
            console.log('Here are newValue', newValue);
            console.log('Here are updatedData', updatedData);
            return updatedData;
        });
    };

    const handleDeleteSpecification = (index: number) => {
        setSpecList((prevSpecList: any) => {
            const updatedSpecList = [...prevSpecList];
            updatedSpecList.splice(index, 1); // Remove the specAutocomplete at the specified index
            return updatedSpecList;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productVariant === null) {
                let data = { ...productVariant };
                const tempSpec = specList.map((spec: any) => ({
                    id: 0,
                    productVariantId: 0,
                    specificationId: spec.id
                }));

                data.productSpecifications = tempSpec
                console.log('This is variant will be added', data)
                // console.log('this is specifications', specList)

                // 1. upload productVariant and get Id returned
                // 2. Upload price

                const response = await productVariantApi.add(data, price.value);
                console.log('Add successfully!', response)
                // Reset the form
                setProductVariant(initProductVariant);
                setPrice(initPrice)
                setSpecList([])
            } else {

                const tempVariant = {
                    id: productVariant.id,
                    productLineId: productVariant.productLineId,
                    name: productVariant.name,
                    specifications: [{
                        "id": 0,
                        "specificationTypeId": 0,
                        "value": "string"
                    }],
                    price: initPrice
                }
                console.log('tempVariant', tempVariant);

                const tempSpecList = specList.map((spec: any) => ({
                    id: 0,
                    productVariantId: tempVariant.id,
                    specificationId: spec.id
                }))
                console.log('tempSpecList', tempSpecList)
                console.log('specList', specList)
                // await productVariantApi.update(productVariant.id, productVariant);
                await productVariantApi.updateSpecifications(tempSpecList);
                await priceApi.update(price.id, price);

            }

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productVariant === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productVariant:`, error);
            alert(`Error! ${error}`);
        }
    };



    const getSpecificationsBlock = () => {
        // console.log('New specList', specList)
        return (
            <>
                {specList && specList.map((specAutocomplete: any, index: any) => (
                    <div key={index}>
                        <label>Specifications {index + 1}:</label>
                        <IconButton aria-label="delete" onClick={() => handleDeleteSpecification(index)}>
                            <DeleteIcon className='button-icon' />
                        </IconButton>
                        <Autocomplete
                            className="autocomplete"
                            disablePortal
                            id={`specificationsId-${index}`}
                            options={specifications}
                            getOptionLabel={(option: any) => option.value}
                            value={specAutocomplete}
                            onChange={(event, newValue) => handleSpecificationChange(index, newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />


                    </div>
                ))}
            </>
        );
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
                    renderInput={(params) => <TextField {...params} label=""
                    />}
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

                <label htmlFor="value">Price:</label>
                <input
                    type="number"
                    id="value"
                    name="value"
                    value={price.value}
                    onChange={handleInputChange}
                    required
                />

                {/* {specList && specList.map((specAutocomplete: any, index: any) => (
                    <div key={index}>
                        <label>Specifications: {index + 1}</label>
                        <p>
                            {specAutocomplete.id}
                            {specAutocomplete.value}
                            {specAutocomplete.specificationTypeId}
                        </p>
                        <Autocomplete
                            className="autocomplete"
                            disablePortal

                            id={`specificationsId-${index}`}
                            options={specifications}
                            getOptionLabel={(option: any) => option.value}
                            value={specAutocomplete}
                            onChange={(event, newValue) => handleSpecificationChange(index, newValue)}
                            renderInput={(params) => <TextField {...params}
                            />}
                        />
                    </div>
                ))} */}

                {
                    getSpecificationsBlock()
                }

                <AddIcon onClick={addSpecificationsAutocomplete} className="add-button">
                </AddIcon>
                <button type="submit" className='button'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductVariantSingle;
