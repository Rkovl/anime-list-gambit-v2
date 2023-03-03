import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from './conponets/Header'
import Data from './conponets/DisplayData'
import Options from './conponets/Buttons'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const App = () => {

  const dispatch = useDispatch()

  let bestScore = useSelector((state)=> state.main.bestScore)
  const animeData = useSelector((state)=> state.main.animeData)

  return (
    <main>
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
                <div className='h5'>
                    Best Score: {bestScore} <br /><br /> Current Score: 0
                </div>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='h-75 text-center'>
        <Col className=''>
      <Row xs={12} md={12} className="g-4 p-4">
        <Col className='m-4 text-center'>
          <Card className='bg-dark border border-4 h1'>
            <Card.Header>Quote</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p className='h4'>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                  posuere erat a ante.{' '}
                </p>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>

        <Col className='m-4 text-center h1'>
          <Card className='bg-dark border border-4'>
            <Card.Header>Quote</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p className='h4'>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                  posuere erat a ante.{' '}
                </p>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row className='fixed-bottom pb-5 mb-5'>
        <Col></Col>
        <Col>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
                Higher Rating/Rank
            </Button>
            <br/><br/>
            <Button variant="secondary" size="lg">
                Released First
            </Button>
          </div>
        </Col>

        <Col>
          Lives : 3 <br/> <br/>
          <Button variant="primary" size="lg">
                  Skip 3/3
          </Button>
        </Col>

        <Col>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
                Higher Rating/Rank
            </Button>
            <br/><br/>
            <Button variant="secondary" size="lg">
                Released First
            </Button>
          </div>
        </Col>
        <Col></Col>
      </Row>
        </Col>
      </Container>
    </main>
  )
}

export default App