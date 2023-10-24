import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { privateRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {privateRoutes.map((route, index) => {

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
        </ Routes >
      </div>
    </Router >
  );
}

export default App;
