// AddBrandPage.tsx
import React, { useEffect, useState } from 'react';
import brandApi from '../../../api/brandApi';
import './brandSingle.scss'

const AddBrandPage: React.FC = () => {
    const [brand, setBrand] = useState({
        Id: 0,
        Name: '',
        Description: '',
        LogoBase64: '',
    });


    const [imageFile, setImageFile] = useState<File | null>(null);
    useEffect(() => {
        console.log('This is brand', brand)
        console.log('This is image file', imageFile)
    }, [brand, imageFile])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)
        setBrand((prevBrand) => ({ ...prevBrand, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageFile(file ?? null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let LogoBase64 = brand.LogoBase64; // Use the current logoBase64 as a fallback

            if (imageFile) {
                // Upload the image as base64 and get the string
                const reader = new FileReader();

                // Use a Promise to read the file as base64
                const readAsDataURL = (): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(imageFile);
                    });
                };

                LogoBase64 = await readAsDataURL();
            }

            // Check if imageFile is not null before calling uploadImage
            if (imageFile) {
                // Add the brand data (including logoBase64) to the JSON server
                await brandApi.uploadImage({
                    Id: 0,
                    Name: brand.Name,
                    Description: brand.Description,
                    LogoBase64,
                }, imageFile);
            }

            // Reset the form
            setBrand({
                Id: 0,
                Name: '',
                Description: '',
                LogoBase64: '',
            });
            setImageFile(null); // Reset the imageFile state
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    return (
        <div className="add-brand-page">
            <h2>Add New Brand</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={brand.Name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="Description"
                    name="Description"
                    value={brand.Description}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {/* Display the placeholder image */}
                {imageFile && (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Brand Placeholder"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                )}

                <button type="submit">Add Brand</button>
            </form>
        </div>
    );
};

export default AddBrandPage;
