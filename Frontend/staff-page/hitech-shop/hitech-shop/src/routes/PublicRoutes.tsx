import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import { Status } from './AppRouter';

interface PublicRoutesProps {
    updateStatus: (newStatus: Status) => void;
}

export const PublicRoutes: React.FC<PublicRoutesProps> = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
