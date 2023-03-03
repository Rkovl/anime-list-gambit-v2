import React from 'react'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Buttons = () => {
  return (
    <>
    <Row>
        <Col>
            <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
                Higher Rating/Rank
            </Button>
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
            <Button variant="secondary" size="lg">
                Released First
            </Button>
            </div>
        </Col>
    </Row>
    </>
  )
}

export default Buttons