import './header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function Header() {

    // return <>
    //     <header className="wrapper">
    //         <div className="inner">
    //             <div className="logo">
    //                 <img src="src/assets/logo.png"
    //                     height={42} width={42} alt="Logo"></img>
    //             </div>
    //             <h2>Test</h2>
    //         </div>
    //     </header>
    // </>;
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="src/assets/logo.png"
                            height={42} width={42} alt="Logo"></img>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Products</Nav.Link>
                        <Nav.Link href="#features">Categories</Nav.Link>
                        <Nav.Link href="#pricing">Orders</Nav.Link>
                    </Nav>
                    <Nav className="ms-nav">
                        <Nav.Link href="#home">Profile</Nav.Link>
                        <Nav.Link href="#features">Sign Out</Nav.Link>
                        {/* <Nav.Link href="#pricing">Orders</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
