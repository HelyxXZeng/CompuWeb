import React, { useEffect, useState } from 'react';
import customerApi from '../../../api/customerApi';
import './customerSingle.scss'

interface Customer {
    id: number;
    name: string;
    birthdate: string;
    joinDate: string;
    phoneNumber: string;
}

interface Props {
    customer: Customer | null;
}

const CustomerSingle: React.FC<Props> = (para: Props) => {
    const [customer, setCustomer] = useState<Customer>({
        id: 0,
        name: '',
        birthdate: '2000-01-01',
        joinDate: new Date().toISOString().split('T')[0],
        phoneNumber: '+84'
    });

    useEffect(() => {
        if (para.customer !== null) {

            const updatedCustomer: Customer = {
                ...para.customer,
                birthdate: para.customer.birthdate.split('T')[0],
                joinDate: para.customer.joinDate.split('T')[0]
            };

            setCustomer(updatedCustomer);
        }
    }, [para.customer]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // if (name === 'birthdate' || name === 'joinDate') {
        //     console.log('This is value from date in customer:', value)
        //     setCustomer((prevCustomer) => ({
        //         ...prevCustomer,
        //         [name]: value
        //     }));
        // } else {
        //     setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
        // }
        setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (para.customer === null) {
                console.log('this is customer', customer)
                await customerApi.add(customer);
            } else {
                console.log('this is customer', customer)
                await customerApi.update(customer.id, customer);
            }

            alert('Successfully Uploaded!');

            // Reset the form
            setCustomer({
                id: 0,
                name: '',
                birthdate: '2000-01-01',
                joinDate: new Date().toISOString().split('T')[0],
                phoneNumber: '+84'
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error! ' + error);
        }
    };

    return (
        <div className="customer-page">
            <h2>Customers</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="birthdate">Birthdate:</label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={customer.birthdate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="joinDate">Join Date:</label>
                <input
                    type="date"
                    id="joinDate"
                    name="joinDate"
                    value={customer.joinDate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customer.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CustomerSingle;
