//CategorySingle.tsx
import React, { useEffect, useState } from 'react';
import categoryApi, { Category } from '../../../api/categoryApi';
import './categorySingle.scss'

// interface Category {
//     id: number,
//     name: string
// }

interface Props {
    category: Category
}

const CategorySingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [category, setCategory] = useState<Category>({
        id: 0,
        name: ''
    });


    useEffect(() => {
        if (para.category !== null) {
            console.log('para category', para.category)
            setCategory(para.category);
        }
    }, [para.category]);

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

        try {
            if (para.category === null) {
                await categoryApi.add({
                    id: category.id,
                    name: category.name
                });
            } else {
                await categoryApi.update(category.id, {
                    id: category.id,
                    name: category.name
                });
            }

            // Reset the form
            setCategory({
                id: 0,
                name: ''
            });

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.category === null ? 'adding' : 'updating';
            console.error(`Error in ${action} category:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="category-page">
            <h2>Categories</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default CategorySingle;
