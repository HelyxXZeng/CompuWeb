import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import staffApi from "../api/staffApi";


export type Status = 'checking' | 'authenticated' | 'no-authenticated'



export const AppRouter = () => {

    const phoneExists = (phoneNumber: any) => {
        return staffApi
            .getAll({ _page: 1, _limit: 100000 })
            .then(({ data }) => {
                if (data) {
                    const filteredRows = data.filter((row: any) => {
                        console.log('This is row from App router', row)
                        console.log('Is is equal', row.PhoneNumber.toString() === phoneNumber)
                        return row.PhoneNumber.toString() === phoneNumber
                    }
                    );
                    console.log('This is all rows from App Router', filteredRows)
                    return filteredRows.length > 0;
                }
                return false;
            })
            .catch((error) => false);
    };

    const [status, setStatus] = useState<Status>('no-authenticated');
    const updateAuthenticationStatus = (newStatus: Status) => {
        console.log('Come here in side updateAuthenticationStatus (AppRouter)', newStatus)
        setStatus(newStatus);
    };
    if (status === 'checking')
        return <div className="loading">Checking credentials...</div>

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                phoneExists(user.phoneNumber).then((exists) => {
                    if (exists) {
                        updateAuthenticationStatus('authenticated');
                    } else {
                        updateAuthenticationStatus('no-authenticated');
                    }
                });
            } else {
                updateAuthenticationStatus('no-authenticated');
            }
        });
    }, []);

    console.log('Come inside AppRouter', status)
    return (
        <BrowserRouter>
            <Routes>
                {status === 'authenticated' ? (
                    <Route path="/*" element={<PrivateRoutes />} />
                ) : (
                    <Route path="/*" element={<PublicRoutes updateStatus={updateAuthenticationStatus} />} />
                )}

                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}