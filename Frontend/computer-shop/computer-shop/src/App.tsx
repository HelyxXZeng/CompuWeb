
import './App.css'

import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes } from './routes';
import DefaultLayout from "./components/Layouts/DefaultLayout"

function App() {


  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {privateRoutes.map((route: any, index) => {
              const Page = route.component;
              let Layout;
              Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

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
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
