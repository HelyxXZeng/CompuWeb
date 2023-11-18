//SpecificationSingle.tsx
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import specificationTypeApi from '../../../api/specificationTypeApi';
import specificationApi from '../../../api/specificationApi';
import './specificationSingle.scss';

interface Specification {
    id: number,
    specificationTypeId: number
    value: string
}

interface Props {
    specification: Specification
}

const initSpecification = {
    id: 0,
    specificationTypeId: 0,
    value: '',
}

const fetchSpecificationTypes = async () => {
    // Fetch specificationTypes data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await specificationTypeApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const SpecificationSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [specification, setSpecification] = useState<Specification>(initSpecification);
    const [specificationTypes, setSpecificationTypes] = useState([]);

    useEffect(() => {
        if (para.specification !== null) {
            // console.log('para specification', para.specification)
            setSpecification(para.specification);
        }
    }, [para.specification]);

    useEffect(() => {
        const fetchData = async () => {
            const specificationTypesData = await fetchSpecificationTypes();
            setSpecificationTypes(specificationTypesData);
        };

        fetchData();
    }, []); // Fetch specificationTypes only once when the component mounts

    const handleSpecificationTypeChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: { id: number; name: string } | null
    ) => {
        if (newValue) {
            setSpecification((prevSpecification) => ({ ...prevSpecification, specificationTypeId: newValue.id }));
        }
        console.log('New Value: ', newValue)
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)
        setSpecification((prevSpecification) => ({ ...prevSpecification, [name]: value }));
        // console.log('Product Variant: ', specification)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('this is specification', specification)

        try {
            if (para.specification === null) {
                console.log('This is variant will be added', specification)
                await specificationApi.add(specification);
            } else {
                await specificationApi.update(specification.id, specification);
            }

            // Reset the form
            setSpecification(initSpecification);

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.specification === null ? 'adding' : 'updating';
            console.error(`Error in ${action} specification:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="specification-page">
            <h2>Product Variants</h2>
            <form onSubmit={handleSubmit}>
                <label>SpecificationType:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="specificationTypeId"
                    options={specificationTypes}
                    getOptionLabel={(option: any) => option.name}
                    value={specificationTypes.find((specificationType: any) => specificationType.id === specification.specificationTypeId) || null}
                    onChange={handleSpecificationTypeChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />
                <label htmlFor="value">Value:</label>
                <input
                    type="text"
                    id="value"
                    name="value"
                    value={specification.value}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default SpecificationSingle;
