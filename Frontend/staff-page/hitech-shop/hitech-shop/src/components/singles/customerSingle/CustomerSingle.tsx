//CustomerSingle.tsx
import React, { useEffect, useState } from 'react';
import customerApi from '../../../api/customerApi';
import './customerSingle.scss'

interface Customer {
    Id: number,
    Name: string,
    Birthdate: string,
    JoinDate: string,
    PhoneNumber: string
}


interface Props {
    customer: Customer
}

const CustomerSingle: React.FC<Props> = (para: Props) => {

    // console.log('This is para: ', para)
    const [customer, setCustomer] = useState({
        Id: 0,
        Name: '',
        Birthdate: '2000-01-01',
        JoinDate: new Date().toISOString().split('T')[0],
        PhoneNumber: '0'
    });


    useEffect(() => {
        if (para.customer !== null) {
            setCustomer(para.customer);
        }
    }, [para]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'Birthdate' || name === 'JoinDate') {
            // console.log("This is value:", value)
            setCustomer((prevCustomer) => ({
                ...prevCustomer,
                [name]: value // Parse the input value to a Date object
            }));
        } else {
            setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (para.customer === null) {
            try {
                await customerApi.add({
                    Id: customer.Id,
                    Name: customer.Name,
                    Birthdate: customer.Birthdate,
                    JoinDate: customer.JoinDate,
                    PhoneNumber: customer.PhoneNumber
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setCustomer({
                    Id: 0,
                    Name: '',
                    Birthdate: '2000-01-01',
                    JoinDate: new Date().toISOString().split('T')[0],
                    PhoneNumber: '0'
                });

            } catch (error) {
                console.error('Error in adding customer:', error);
                alert("Error!" + error)
            }
        } else {
            try {
                await customerApi.update(customer.Id, {
                    Id: customer.Id,
                    Name: customer.Name,
                    Birthdate: customer.Birthdate,
                    JoinDate: customer.JoinDate,
                    PhoneNumber: customer.PhoneNumber
                });
                alert("Successfully Uploaded!")

                // Reset the form
                setCustomer({
                    Id: 0,
                    Name: '',
                    Birthdate: '2000-01-01',
                    JoinDate: new Date().toISOString().split('T')[0],
                    PhoneNumber: '0'
                });

            } catch (error) {
                console.error('Error in updating customer:', error);
                alert("Error!" + error)
            }
        }

    };

    return (
        <div className="customer-page">
            <h2>Customers</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={customer.Name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="Birthdate">Birthdate:</label>
                <input
                    type="date"
                    id="Birthdate"
                    name="Birthdate"
                    value={customer.Birthdate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="JoinDate">Join Date:</label>
                <input
                    type="date"
                    id="JoinDate"
                    name="JoinDate"
                    value={customer.JoinDate}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="PhoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={customer.PhoneNumber}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
};

export default CustomerSingle;
