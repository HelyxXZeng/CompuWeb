// brandApi.tsx
import axiosClient from "./axiosClient";

interface Brand {
    Id: number;
    Name: string;
    Description: string;
    LogoBase64: string;
}

const brandApi = {
    getAll: (params: any) => {
        const url = '/brands';
        return axiosClient.get(url, { params });
    },

    get: (id: any) => {
        const url = `/brands/${id}`;
        return axiosClient.get(url);
    },

    add: async (brand: Brand) => {
        try {
            const response = await axiosClient.post('/brands', brand);
            return response.data;
        } catch (error) {
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

            const LogoBase64 = await readAsDataURL();

            // Add the brand data (including logoBase64) to the JSON server
            await brandApi.add({
                ...brand,
                LogoBase64,
            });

            return LogoBase64; // If needed, you can return the base64-encoded string
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedBrand: Brand) => {
        try {
            const response = await axiosClient.put(`/brands/${id}`, updatedBrand);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/brands/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default brandApi;

// const brandApi = {
//     getAll: (params: any) => {
//         const url = '/brands';
//         return axiosClient.get(url, { params });
//     },
//     get: (id: any) => {
//         const url = '/brands/' + id;
//         return axiosClient.get(url);
//     },
// }

// export default brandApi;

