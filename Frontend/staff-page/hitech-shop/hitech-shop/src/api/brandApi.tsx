// brandApi.tsx
import axiosClient from "./axiosClient";

interface Brand {
    id: number;
    name: string;
    description: string;
    logo: string;
}

const brandApi = {
    getAll: (params: any) => {
        const url = '/brands/GetBrands';
        return axiosClient.get(url, { params });
    },

    get: (id: any) => {
        const url = `/brands/GetCategoryById?id=${id}`;
        return axiosClient.get(url);
    },

    add: async (brand: Brand) => {
        try {
            const response = await axiosClient.post('/brands/Insert', brand);
            console.log("Here brand", brand)
            console.log("Here finished", response)
            return response;
        } catch (error) {
            console.log("Here error", error)
            throw error;
        }
    },

    // Function to upload an image for a brand as base64
    uploadImage: async (brand: Brand, imageFile: File | null) => {
        try {
            if (!imageFile) {
                throw new Error('Image file is required.');
            }

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

            const logo = await readAsDataURL();

            // Add the brand data (including logoBase64) to the JSON server
            await brandApi.add({
                ...brand,
                logo,
            });

            return logo; // If needed, you can return the base64-encoded string
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedBrand: Brand) => {
        try {
            const response = await axiosClient.put(`/brands/Update?id=${id}`, updatedBrand);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/brands/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default brandApi;
