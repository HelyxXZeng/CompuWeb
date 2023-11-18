//SpecificationTypeSingle.tsx
import React, { useEffect, useState } from 'react';
import specificationTypeApi from '../../../api/specificationTypeApi';
import './specificationTypeSingle.scss'

interface SpecificationType {
    id: number,
    name: string
}

interface Props {
    specificationType: SpecificationType
}

const SpecificationTypeSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [specificationType, setSpecificationType] = useState<SpecificationType>({
        id: 0,
        name: ''
    });


    useEffect(() => {
        if (para.specificationType !== null) {
            console.log('para specificationType', para.specificationType)
            setSpecificationType(para.specificationType);
        }
    }, [para.specificationType]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)
        setSpecificationType((prevSpecificationType) => ({ ...prevSpecificationType, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.specificationType === null) {
                await specificationTypeApi.add({
                    id: specificationType.id,
                    name: specificationType.name
                });
            } else {
                await specificationTypeApi.update(specificationType.id, {
                    id: specificationType.id,
                    name: specificationType.name
                });
            }

            // Reset the form
            setSpecificationType({
                id: 0,
                name: ''
            });

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.specificationType === null ? 'adding' : 'updating';
            console.error(`Error in ${action} specificationType:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="specificationType-page">
            <h2>Specification Type</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={specificationType.name}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default SpecificationTypeSingle;
