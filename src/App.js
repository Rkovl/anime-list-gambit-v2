import {useDispatch, useSelector} from 'react-redux';
import React,{useEffect, useState} from 'react';
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
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [skip, setSkip] = useState(3);
  const [animeLeft, setLeft] = useState({});
  const [animeRight, setRight] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    
    const gatherData = async ()=> {
      try {
        console.log("trying gatherData Function")
        let apiUrl = [
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=1000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=1500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=2000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=2500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=3000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
          `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=3500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`
        ];
        let dataArr = [];
        for(const url of apiUrl) {
          const response = await axios.get(url, {
            headers: {
              'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
            },
          });
          console.log(response, "response")
          // const data = await response.json();
          // console.log(data,"data")
          dataArr.push(response.data.data);
        }
        console.log(dataArr, 'dataArr')
        dispatch(mainActions.addData(dataArr))
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    }
    

    if(animeData.length <= 0 || animeData[0]===null){
      gatherData()
      .then(()=>{
        setLeft(animeData[Number(randomAnimeSelector())].node)
        setRight(animeData[Number(randomAnimeSelector())].node)
        console.log(animeData, animeLeft, animeRight)
      })
    }
    else{
      setLeft(animeData[Number(randomAnimeSelector())].node)
      setRight(animeData[Number(randomAnimeSelector())].node)
      console.log(animeData, animeLeft, animeRight)
    }


    const dataInterval = setInterval(() => {
      gatherData()
    }, 172800000)


    return () => {
      clearInterval(dataInterval)
    };
    // eslint-disable-next-line
  }, []);



  const randomAnimeSelector = ()=> {
    let animeSelectNum = Math.floor(Math.random() * 4000)
    console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
  }

  const simulateNetworkRequest = ()=> {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const newDisplay = ()=> {
    setLeft(animeData[Number(randomAnimeSelector())].node)
    setRight(animeData[Number(randomAnimeSelector())].node)
  }

  const loseReset = ()=>{
    
    if(score> bestScore){
      dispatch(mainActions.displayBest(score))
    }
    
    setScore(0)
    setLives(3)
    setSkip(3)

  }

  const buttonOnClick = (button)=>{
    setLoading(true)
    switch(button){
      case 'rightRate':
        console.log('case right rate')
        if(animeRight.mean>animeLeft.mean){
          setScore(score+1)
        }
        else{
          if(lives > 1){
            setLives(lives-1)
          }
          else{
            loseReset()
            console.log('you die')
          }
        }
        newDisplay()
        break;
      case 'rightRelease':
        // console.log('case right release',animeRight.start_date.replaceAll('-',''),Number(animeLeft.start_date.replaceAll('-','')))
        if(Number(animeRight.start_date.replaceAll('-',''))<Number(animeLeft.start_date.replaceAll('-',''))){
          setScore(score+1)
        }
        else{
          if(lives > 1){
            setLives(lives-1)
          }
          else{
            loseReset()
            console.log('you die')
          }
        }
        newDisplay()
        break;
      case 'leftRate':
        console.log('case left rate')
        if(animeLeft.mean>animeRight.mean){
          setScore(score+1)
        }
        else{
          if(lives > 1){
            setLives(lives-1)
          }
          else{
            loseReset()
            console.log('you die')
          }
        }
        newDisplay()
        break;
      case 'leftRelease':
        console.log('case left release')
        if(Number(animeLeft.start_date.replaceAll('-',''))<Number(animeRight.start_date.replaceAll('-',''))){
          setScore(score+1)
        }
        else{
          if(lives > 1){
            setLives(lives-1)
          }
          else{
            loseReset()
            console.log('you die')
          }
        }
        newDisplay()
        break;
      case 'skip':
        console.log('skip')
        if(skip>0){
          setSkip(skip-1)
          newDisplay()
        }
      break;
      default:
        console.log('error in buton click')
    }

  }

  if (isLoading) {
    simulateNetworkRequest().then(() => {
      setLoading(false);
    });
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
                />
                
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <div className='h5'>
                    Best Score: {bestScore} <br /><br /> Current Score: {score}
                </div>
            </Navbar.Collapse>
        </Container>
      </Navbar>



      <Container className='h-75 text-center'>
        <Col>
          <Row xs={12} md={12} className="g-4 p-4">
            <Col className='m-4 text-center h1'>
              <Card className='bg-dark border border-4 border-danger maxheight'>
                <Card.Header>{animeLeft.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeLeft.synopsis}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>

            <Col className='m-4 text-center h1'>
              <Card className='bg-dark border border-4 border-danger maxheight'>
                <Card.Header>{animeRight.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeRight.synopsis}
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
                <Button 
                variant="primary" 
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRelease') : null}>
                    {isLoading ? 'Checking…' : 'Released First'}
                </Button>
              </div>
            </Col>

            <Col>
              <div className='h3'>
              Lives : {lives} 
              </div><br/>
              <Button 
              variant="primary" 
              size="lg"
              disabled={isLoading}
              onClick={!isLoading ? ()=>buttonOnClick('skip') : null}>
                      Skip {skip}/3
              </Button>
            </Col>

            <Col>
              <div className="d-grid gap-2">
                <Button 
                variant="primary" 
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('rightRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('rightRelease') : null}>
                  {isLoading ? 'Checking…' : 'Released First'}
                    
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