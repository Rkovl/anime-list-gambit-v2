import React from 'react'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <img
                    alt=""
                    src="/logo.png"
                    width="150"
                    height="150"
                    className="d-inline-block align-top logo"
                    />{' '}
                    
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Best Score: 0 <br /><br /> Current Score: 0
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        
    </>
  )
}

export default Header