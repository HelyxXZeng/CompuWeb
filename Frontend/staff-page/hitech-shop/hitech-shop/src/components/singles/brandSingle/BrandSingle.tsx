//BrandSingle.tsx
import React, { useEffect, useState } from 'react';
import brandApi from '../../../api/brandApi';
import './brandSingle.scss'

interface Brand {
    id: number;
    name: string;
    description: string;
    logo: string;
}

interface Props {
    brand: Brand
}

const BrandSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [brand, setBrand] = useState({
        id: 0,
        name: '',
        description: '',
        logo: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        console.log("This is para in Brand: ", para)
        if (para.brand !== null) {
            setBrand(para.brand);

            // Convert base64 string to a Blob
            if (para.brand.logo) {
                const byteCharacters = atob(para.brand.logo.split(',')[1]);
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
        // if (para.brand === null) {
        //     try {
        //         let logo = brand.logo; // Use the current logoBase64 as a fallback

        //         if (imageFile) {
        //             // Upload the image as base64 and get the string
        //             const reader = new FileReader();

        //             // Use a Promise to read the file as base64
        //             const readAsDataURL = (): Promise<string> => {
        //                 return new Promise((resolve, reject) => {
        //                     reader.onloadend = () => {
        //                         resolve(reader.result as string);
        //                     };
        //                     reader.onerror = reject;
        //                     reader.readAsDataURL(imageFile);
        //                 });
        //             };

        //             logo = await readAsDataURL();
        //             // Check if imageFile is not null before calling uploadImage
        //             // Add the brand data (including logoBase64) to the JSON server
        //             await brandApi.add({
        //                 id: brand.id,
        //                 name: brand.name,
        //                 description: brand.description,
        //                 logo,
        //             });
        //             alert("Successfully Uploaded!")
        //         }

        //         // Reset the form
        //         setBrand({
        //             id: 0,
        //             name: '',
        //             description: '',
        //             logo: '',
        //         });
        //         setImageFile(null); // Reset the imageFile state

        //     } catch (error) {
        //         console.error('Error in adding brand:', error);
        //         alert("Error!" + error)
        //     }
        // } else {
        //     try {
        //         let logo = brand.logo; // Use the current logoBase64 as a fallback

        //         if (imageFile) {
        //             // Upload the image as base64 and get the string
        //             const reader = new FileReader();

        //             // Use a Promise to read the file as base64
        //             const readAsDataURL = (): Promise<string> => {
        //                 return new Promise((resolve, reject) => {
        //                     reader.onloadend = () => {
        //                         resolve(reader.result as string);
        //                     };
        //                     reader.onerror = reject;
        //                     reader.readAsDataURL(imageFile);
        //                 });
        //             };

        //             logo = await readAsDataURL();
        //             // Check if imageFile is not null before calling uploadImage
        //             // Add the brand data (including logoBase64) to the JSON server
        //             await brandApi.update(brand.id, {
        //                 id: brand.id,
        //                 name: brand.name,
        //                 description: brand.description,
        //                 logo,
        //             });
        //             alert("Successfully Uploaded!")
        //         }

        //         // Reset the form
        //         setBrand({
        //             id: 0,
        //             name: '',
        //             description: '',
        //             logo: '',
        //         });
        //         setImageFile(null); // Reset the imageFile state

        //     } catch (error) {
        //         console.error('Error in updating brand:', error);
        //         alert("Error!" + error)
        //     }
        // }
        try {
            let logo = brand.logo; // Use the current logoBase64 as a fallback

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

                logo = await readAsDataURL();
                // Check if imageFile is not null before calling uploadImage
            }

            // Add the brand data (including logoBase64) to the JSON server
            if (para.brand === null) {
                await brandApi.add({
                    id: brand.id,
                    name: brand.name,
                    description: brand.description,
                    logo,
                });
            } else {
                await brandApi.update(brand.id, {
                    id: brand.id,
                    name: brand.name,
                    description: brand.description,
                    logo,
                });
            }

            alert("Successfully Uploaded!");

            // Reset the form
            setBrand({
                id: 0,
                name: '',
                description: '',
                logo: '',
            });
            setImageFile(null); // Reset the imageFile state

        } catch (error) {
            const action = para.brand === null ? 'adding' : 'updating';
            console.error(`Error in ${action} brand:`, error);
            alert(`Error! ${error}`);
        }


    };

    return (
        <div className="brand-page">
            <h2>Brands</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={brand.name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={brand.description}
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

export default BrandSingle;
