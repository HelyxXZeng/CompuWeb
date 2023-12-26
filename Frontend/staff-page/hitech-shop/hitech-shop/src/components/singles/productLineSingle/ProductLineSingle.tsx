//ProductLineSingle.tsx
import React, { useEffect, useState } from 'react';
import productLineApi, { ProductLine } from '../../../api/productLineApi';
// import './productLineSingle.scss'
import brandApi from '../../../api/brandApi';
import { Autocomplete, Button, TextField } from '@mui/material';
import categoryApi from '../../../api/categoryApi';
import DeleteIcon from '@mui/icons-material/Delete';
import '../commonSingle/commonSingle.scss'
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
    description: '',
    images: []
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
    const [imageFiles, setImageFiles] = useState<string[]>([]);

    useEffect(() => {
        if (para.productLine !== null) {
            // console.log('para productLine', para.productLine)
            const updateProductLine: ProductLine = {
                ...para.productLine,
                releaseDate: para.productLine.releaseDate.split('T')[0]
            }
            setProductLine(updateProductLine);
            // setImageFiles(para.productLine.images)
            const imageArray = para.productLine.images.map((item: any) => item.image);

            // console.log('Here are full images', imageArray)
            setImageFiles(imageArray)
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
        // console.log('New Value: ', newValue)
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

            // Using Promise.all to handle asynchronous operations
            Promise.all(
                fileList.map((file) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            // 'event.target.result' contains the base64 encoded string
                            if (event.target && event.target.result) {
                                resolve(event.target.result.toString());
                            }
                        };
                        reader.readAsDataURL(file);
                    });
                })
            ).then((base64Strings) => {
                // Now 'base64Strings' is an array of base64 encoded strings
                setImageFiles(base64Strings);
            });
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
        if (name === 'warranty') {
            setProductLine((prevProductLine) => ({ ...prevProductLine, [name]: Number.parseInt(value) }));
        } else {
            setProductLine((prevProductLine) => ({ ...prevProductLine, [name]: value }));
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.productLine === null) {
                const imageList = imageFiles.map((image: any) => ({
                    id: 0,
                    image: image,
                    name: 'Image Name',
                    productLineId: 0,
                }))

                const imageData = {
                    ...productLine,
                    images: imageList
                }
                console.log('ImageData', imageData)
                productLineApi.add(imageData);

                // Reset the form
                setProductLine(initProductLine);
                setImageFiles([])
            } else {

                const imageList = imageFiles.map((image: any) => ({
                    id: 0,
                    image: image,
                    name: 'Image Name',
                    productLineId: productLine.id,
                }))

                let temp = productLine;
                temp.images = imageList;
                console.log('imageFiles will be uploaded', imageFiles)
                console.log('imageList will be uploaded', imageList)
                console.log('productLine wil be uploaded', productLine)


                // const data = await productLineApi.update(productLine.id, productLine);
                // const data2 = await productLineApi.updateImages(imageList);


                // console.log('Data returned', data)
            }

            alert("Successfully Uploaded!");
        } catch (error) {
            const action = para.productLine === null ? 'adding' : 'updating';
            console.error(`Error in ${action} productLine:`, error);
            alert(`Error! ${error}`);
        }
    };

    return (
        <div className="single-page">
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

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {imageFiles.map((file, index) => (
                        <div key={index} style={{ marginRight: '10px', marginBottom: '10px', position: 'relative' }}>
                            <img
                                src={file}
                                alt={`Image ${index + 1}`}
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />

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
