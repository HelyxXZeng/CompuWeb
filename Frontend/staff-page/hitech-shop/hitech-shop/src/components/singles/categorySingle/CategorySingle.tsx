//CategorySingle.tsx
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../api/categoryApi';
import './categorySingle.scss'

interface Category {
    Id: number,
    Name: string
}

interface Props {
    category: Category
}

const CategorySingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [category, setCategory] = useState({
        Id: 0,
        Name: ''
    });


    useEffect(() => {
        if (para.category !== null) {
            setCategory(para.category);
        }
    }, [para]);
    // useEffect(() => {
    //     console.log('This is category', category)
    //     console.log('This is image file', imageFile)
    // }, [category, imageFile])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)
        setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (para.category === null) {
            try {
                await categoryApi.add({
                    Id: category.Id,
                    Name: category.Name
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setCategory({
                    Id: 0,
                    Name: ''
                });

            } catch (error) {
                console.error('Error in adding category:', error);
                alert("Error!" + error)
            }
        } else {
            try {
                await categoryApi.update(category.Id, {
                    Id: category.Id,
                    Name: category.Name
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setCategory({
                    Id: 0,
                    Name: ''
                });

            } catch (error) {
                console.error('Error in updating category:', error);
                alert("Error!" + error)
            }
        }

    };

    return (
        <div className="category-page">
            <h2>Categories</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={category.Name}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default CategorySingle;
