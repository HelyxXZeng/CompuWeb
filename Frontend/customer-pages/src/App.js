import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment, useEffect, useState } from 'react';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import useAuth from './hooks/useAuth';

import Account from '~/pages/Account';

function App() {
    const { user, isLoading } = useAuth(); // Replace with your actual authentication hook
    // const location = useLocation();

    // console.log('location.pathname', location.pathname);
    // State to keep track of whether the user is authenticated
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Listen for changes in authentication status
        setAuthenticated(!!user);

        console.log('Authenticated:', !!user);
    }, [user]);

    return (
        <ShoppingCartProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Private Routes */}

                        {authenticated &&
                            privateRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <DefaultLayout>
                                            {console.log(`Private Route Matched: ${route.path}`)}
                                            <route.component />
                                        </DefaultLayout>
                                    }
                                />
                            ))}
                        {/* Redirect to /manageOrder after login and accessing /account */}
                        {/* {authenticated && (
                            <Route path="/account" element={<Navigate to="/manageOrder" replace={true} />} />
                        )} */}

                        {authenticated && '/account' && (
                            <Route path="/account" element={<Navigate to="/manageOrder" replace={true} />} />
                        )}

                        {!authenticated && (
                            <Route
                                path="/account"
                                element={
                                    <DefaultLayout>
                                        <Account />
                                    </DefaultLayout>
                                }
                            />
                        )}

                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {/* Handle non-existing routes */}
                        {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
                    </Routes>
                </div>
            </Router>
        </ShoppingCartProvider>
    );
}

export default App;
