//ProductLineSingle.tsx
import React, { useEffect, useState } from 'react';
import productLineApi, { ProductLine } from '../../../api/productLineApi';
import './productLineSingle.scss'
import brandApi from '../../../api/brandApi';
import { Autocomplete, Button, TextField } from '@mui/material';
import categoryApi from '../../../api/categoryApi';
import DeleteIcon from '@mui/icons-material/Delete';
// interface ProductLine {
//     id: number,
//     name: string,
//     categoryId: number,
//     brandId: number,
//     releaseDate: string,
//     warranty: number,
//     description: string
// }

interface Props {
    productLine: ProductLine
}

const initProductLine = {
    id: 0,
    name: '',
    categoryId: 0,
    brandId: 0,
    releaseDate: '2020-01-01',
    warranty: 0,
    description: ''
}

const fetchBrands = async () => {
    // Fetch brands data from your API
    // For simplicity, let's assume the API returns an array of objects with 'id' and 'name' properties
    const data = (await brandApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const fetchCategories = async () => {
    // Fetch categories data from your API
    const data = (await categoryApi.getAll({ _page: 1, _limit: 100000 })).data;
    return data;
};

const ProductLineSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [productLine, setProductLine] = useState<ProductLine>(initProductLine);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);


    useEffect(() => {
        if (para.productLine !== null) {
            // console.log('para productLine', para.productLine)
            const updateProductLine: ProductLine = {
                ...para.productLine,
                releaseDate: para.productLine.releaseDate.split('T')[0]
            }
            setProductLine(updateProductLine);
        }
    }, [para.productLine]);

    useEffect(() => {
        const fetchData = async () => {
            const brandsData = await fetchBrands();
            const categoriesData = await fetchCategories();
            setBrands(brandsData);
            setCategories(categoriesData);
        };

        fetchData();
    }, []); // Fetch brands and categories only once when the component mounts

    const handleBrandChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: { id: number; name: string } | null
    ) => {
        if (newValue) {
            setProductLine((prevProductLine) => ({ ...prevProductLine, brandId: newValue.id }));
        }
        console.log('New Value: ', newValue)
    };

    const handleCategoryChange = (
        _event: React.ChangeEvent<unknown>,
        newValue: { id: number; name: string } | null
    ) => {
        if (newValue) {
            setProductLine((prevProductLine) => ({ ...prevProductLine, categoryId: newValue.id }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileList = Array.from(files);
            setImageFiles(fileList);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...imageFiles];
        updatedImages.splice(index, 1);
        setImageFiles(updatedImages);
    };



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // console.log('This is input name', name)
        // console.log('This is input value', value)

        if (name === 'releaseDate')
            console.log('this is value from product line', value)
        setProductLine((prevProductLine) => ({ ...prevProductLine, [name]: value }));
        // console.log('Product Line: ', productLine)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productLine === null) {
                await productLineApi.add(productLine);
            } else {
                await productLineApi.update(productLine.id, productLine);
            }

            // Reset the form
            setProductLine(initProductLine);

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productLine === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productLine:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="productLine-page">
            <h2>Product Lines</h2>
            <form onSubmit={handleSubmit}>
                <label>Brand:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="brandId"
                    options={brands}
                    getOptionLabel={(option: any) => option.name}
                    value={brands.find((brand: any) => brand.id === productLine.brandId) || null}
                    onChange={handleBrandChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <label>Category:</label>
                <Autocomplete
                    className="autocomplete"
                    disablePortal
                    id="categoryId"
                    options={categories}
                    getOptionLabel={(option: any) => option.name}
                    value={categories.find((category: any) => category.id === productLine.categoryId) || null}
                    onChange={handleCategoryChange}
                    renderInput={(params) => <TextField {...params} label="" />}
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={productLine.name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="releaseDate">Release Date:</label>
                <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={productLine.releaseDate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="warranty">Warranty:</label>
                <input
                    type="number"
                    id="warranty"
                    name="warranty"
                    value={productLine.warranty}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="image" className='custom-file-input'>Image:
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className='custom-file-input'
                        multiple
                        required
                    />
                </label>
                {/* Display the placeholder image */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {imageFiles.map((file, index) => (
                        <div key={index} style={{ marginRight: '10px', marginBottom: '10px', position: 'relative' }}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Image ${index + 1}`}
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            {/* <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Remove
                            </button> */}

                            <Button variant="outlined" startIcon={<DeleteIcon />}
                                onClick={() => handleRemoveImage(index)}
                                style={{ position: 'absolute', top: '0px', right: '-25px', background: 'none', border: 'none', cursor: 'pointer' }}>

                            </Button>
                        </div>
                    ))}
                </div>



                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={productLine.description}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default ProductLineSingle;
