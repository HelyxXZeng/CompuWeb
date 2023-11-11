
import React, { useEffect, useState } from 'react';
import brandApi from '../../../api/brandApi';
import './brandSingle.scss'

interface Brand {
    Id: number;
    Name: string;
    Description: string;
    LogoBase64: string;
}

interface Props {
    brand: Brand
}

const BrandPage: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [brand, setBrand] = useState({
        Id: 0,
        Name: '',
        Description: '',
        LogoBase64: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (para.brand.Id !== 0) {
            setBrand(para.brand);

            // Convert base64 string to a Blob
            if (para.brand.LogoBase64) {
                const byteCharacters = atob(para.brand.LogoBase64.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const file = new File([byteArray], 'filename.jpg', { type: 'image/jpeg' });
                setImageFile(file);
            }
        }
    }, [para]);
    // useEffect(() => {
    //     console.log('This is brand', brand)
    //     console.log('This is image file', imageFile)
    // }, [brand, imageFile])

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
        if (para === null) {
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
                    // Check if imageFile is not null before calling uploadImage
                    // Add the brand data (including logoBase64) to the JSON server
                    await brandApi.uploadImage({
                        Id: 0,
                        Name: brand.Name,
                        Description: brand.Description,
                        LogoBase64,
                    }, imageFile);
                    alert("Successfully Uploaded!")
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
                alert("Error!" + error)
            }
        } else {
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
                    // Check if imageFile is not null before calling uploadImage
                    // Add the brand data (including logoBase64) to the JSON server
                    await brandApi.update(brand.Id, {
                        Id: brand.Id,
                        Name: brand.Name,
                        Description: brand.Description,
                        LogoBase64,
                    });
                    alert("Successfully Uploaded!")
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
                console.error('Error updating brand:', error);
                alert("Error!" + error)
            }
        }

    };

    return (
        <div className="brand-page">
            <h2>Brands</h2>
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
                    className='textArea'
                ></textarea>

                <label htmlFor="image" className='custom-file-input'>Image:
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className='custom-file-input'
                        required
                    />
                </label>
                {/* Display the placeholder image */}
                {imageFile && (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Brand Placeholder"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                )}

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default BrandPage;
