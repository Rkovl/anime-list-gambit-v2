import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {mainActions} from './slice/MainSlice'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const App = () => {

  const dispatch = useDispatch();

  const bestScore = useSelector((state)=> state.main.bestScore);
  const animeData = useSelector((state)=> state.main.animeData);



  useEffect(() => {

    
    // const gatherData = async ()=> {
    //   try {
    //     console.log("trying gatherData Function")
    //     let apiUrl = [
    //       `https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=1000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=1500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=2000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=2500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=3000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    //       `api.myanimelist.net/v2/anime/ranking?offset=3500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`
    //     ];
    //     let dataArr = [];
    //     for(const url of apiUrl) {
    //       const response = await axios.get(url, {
    //         headers: {
    //           'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
    //         },
    //       });
    //       console.log(response, "response")
    //       // const data = await response.json();
    //       // console.log(data,"data")
    //         // dataArr.push(response.data.data);
    //     }
    //     dispatch(mainActions.addData(dataArr))
    //   }
    //   catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // }
    // const gatherData =  () => {
    //   fetch('https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean',{
    //     headers: {
    //     'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
    //     },
    //   })
    //   .then(response => {
    //     console.log(response)
    //   })
    // }
    
    axios.get('http://localhost:8080/api.myanimelist.net/v2/anime?q=one&limit=4', {
      headers: {
        'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
      }
    })
      .then(response => {
        // handle response
        console.log(response, 'response')
      })
      .catch(error => {
        // handle error
        console.log(error, 'error')
      });


    // if(animeData.length <= 0){
    //   gatherData()
    // }

    // const dataInterval = setInterval(() => {
    //   gatherData()
    // }, 172800000)

    // return () => {
    //   clearInterval(dataInterval)
    // };
  }, []);

  const randomAnimeSelector = ()=> {
    let animeSelectNum = Math.floor(Math.random() * 4000)
    console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
  }



  return (
    <main >

      <Navbar bg="dark" variant="dark" className='border-bottom border-danger'>
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
        <Col>
          <Row xs={12} md={12} className="g-4 p-4">
            <Col className='m-4 text-center h1'>
              <Card className='bg-dark border border-4 border-danger'>
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
              <Card className='bg-dark border border-4 border-danger'>
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
              <div className='h3'>
              Lives : 3 
              </div><br/>
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