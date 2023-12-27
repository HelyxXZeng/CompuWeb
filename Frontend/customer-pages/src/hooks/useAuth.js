import { useState, useEffect } from 'react';
import { auth } from '~/firebase.config'; // Replace with your Firebase configuration import

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log('authUser', authUser);
            setUser(authUser);
            setIsLoading(false);
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Other authentication-related methods can be added here

    return { user, isLoading, logout };
};

export default useAuth;
