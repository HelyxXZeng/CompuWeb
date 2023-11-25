
// import React, { useEffect, useState } from 'react';
// import orderApi, { Order } from '../../../api/orderApi';
// import './orderSingle.scss'

// // interface Order {
// //     Id: number;
// //     Name: string;
// //     Description: string;
// //     LogoBase64: string;
// // }

// interface Props {
//     order: Order
// }

// const OrderPage: React.FC<Props> = (para: Props) => {

//     // console.log('This is para: ', para)
//     const [order, setOrder] = useState({
//         Id: 0,
//         Name: '',
//         Description: '',
//         LogoBase64: '',
//     });

//     const [imageFile, setImageFile] = useState<File | null>(null);

//     useEffect(() => {
//         if (para.order.Id !== 0) {
//             setOrder(para.order);

//             // Convert base64 string to a Blob
//             if (para.order.LogoBase64) {
//                 const byteCharacters = atob(para.order.LogoBase64.split(',')[1]);
//                 const byteNumbers = new Array(byteCharacters.length);
//                 for (let i = 0; i < byteCharacters.length; i++) {
//                     byteNumbers[i] = byteCharacters.charCodeAt(i);
//                 }
//                 const byteArray = new Uint8Array(byteNumbers);
//                 const file = new File([byteArray], 'filename.jpg', { type: 'image/jpeg' });
//                 setImageFile(file);
//             }
//         }
//     }, [para]);
//     // useEffect(() => {
//     //     console.log('This is order', order)
//     //     console.log('This is image file', imageFile)
//     // }, [order, imageFile])

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;
//         // console.log('This is input name', name)
//         // console.log('This is input value', value)
//         setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
//     };

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         setImageFile(file ?? null);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (para === null) {
//             try {
//                 let LogoBase64 = order.LogoBase64; // Use the current logoBase64 as a fallback

//                 if (imageFile) {
//                     // Upload the image as base64 and get the string
//                     const reader = new FileReader();

//                     // Use a Promise to read the file as base64
//                     const readAsDataURL = (): Promise<string> => {
//                         return new Promise((resolve, reject) => {
//                             reader.onloadend = () => {
//                                 resolve(reader.result as string);
//                             };
//                             reader.onerror = reject;
//                             reader.readAsDataURL(imageFile);
//                         });
//                     };

//                     LogoBase64 = await readAsDataURL();
//                     // Check if imageFile is not null before calling uploadImage
//                     // Add the order data (including logoBase64) to the JSON server
//                     await orderApi.uploadImage({
//                         Id: 0,
//                         Name: order.Name,
//                         Description: order.Description,
//                         LogoBase64,
//                     }, imageFile);
//                     alert("Successfully Uploaded!")
//                 }

//                 // Reset the form
//                 setOrder({
//                     Id: 0,
//                     Name: '',
//                     Description: '',
//                     LogoBase64: '',
//                 });
//                 setImageFile(null); // Reset the imageFile state

//             } catch (error) {
//                 console.error('Error adding order:', error);
//                 alert("Error!" + error)
//             }
//         } else {
//             try {
//                 let LogoBase64 = order.LogoBase64; // Use the current logoBase64 as a fallback

//                 if (imageFile) {
//                     // Upload the image as base64 and get the string
//                     const reader = new FileReader();

//                     // Use a Promise to read the file as base64
//                     const readAsDataURL = (): Promise<string> => {
//                         return new Promise((resolve, reject) => {
//                             reader.onloadend = () => {
//                                 resolve(reader.result as string);
//                             };
//                             reader.onerror = reject;
//                             reader.readAsDataURL(imageFile);
//                         });
//                     };

//                     LogoBase64 = await readAsDataURL();
//                     // Check if imageFile is not null before calling uploadImage
//                     // Add the order data (including logoBase64) to the JSON server
//                     await orderApi.update(order.Id, {
//                         Id: order.Id,
//                         Name: order.Name,
//                         Description: order.Description,
//                         LogoBase64,
//                     });
//                     alert("Successfully Uploaded!")
//                 }

//                 // Reset the form
//                 setOrder({
//                     Id: 0,
//                     Name: '',
//                     Description: '',
//                     LogoBase64: '',
//                 });
//                 setImageFile(null); // Reset the imageFile state

//             } catch (error) {
//                 console.error('Error updating order:', error);
//                 alert("Error!" + error)
//             }
//         }

//     };

//     return (
//         <div className="order-page">
//             <h2>Orders</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="Name"
//                     name="Name"
//                     value={order.Name}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 <label htmlFor="description">Description:</label>
//                 <textarea
//                     id="Description"
//                     name="Description"
//                     value={order.Description}
//                     onChange={handleInputChange}
//                     required
//                     className='textArea'
//                 ></textarea>

//                 <label htmlFor="image" className='custom-file-input'>Image:
//                     <input
//                         type="file"
//                         id="image"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className='custom-file-input'
//                         required
//                     />
//                 </label>
//                 {/* Display the placeholder image */}
//                 {imageFile && (
//                     <img
//                         src={URL.createObjectURL(imageFile)}
//                         alt="Order Placeholder"
//                         style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                     />
//                 )}

//                 <button type="submit" className='button'>Submit</button>
//             </form>
//         </div>
//     );
// };

// export default OrderPage;
