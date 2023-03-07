import {useDispatch, useSelector} from 'react-redux';
import React,{useEffect, useState} from 'react';
// import axios from 'axios';

import {mainActions} from './slice/MainSlice'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import Anime from './data/data'


const App = () => {

  const dispatch = useDispatch();

  const randomAnimeSelector = ()=> {
    let animeSelectNum = Math.floor(Math.random() * 4000)
    console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
  }


  const bestScore = useSelector((state)=> state.main.bestScore);
  // const animeData = useSelector((state)=> state.main.animeData);
  const animeData = Anime;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [skip, setSkip] = useState(3);
  const [animeLeft, setLeft] = useState(animeData[Number(randomAnimeSelector())].node);
  const [animeRight, setRight] = useState(animeData[Number(randomAnimeSelector())].node);
  const [isLoading, setLoading] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);



  useEffect(() => {
    
    console.log("IS THE USE EFFECT WORKINGF")
    console.log(Anime, 'anime')
    setLeft(animeData[Number(randomAnimeSelector())].node)
    setRight(animeData[Number(randomAnimeSelector())].node)
    

//     const gatherData = async ()=> {
//       try {
//         console.log("trying gatherData Function")
//         let apiUrl = [
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?ranking_type=tv%26limit=500%26fields=synopsis,start_date,mean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=500%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=1000%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=1500%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=2000%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=2500%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=3000%26ranking_type=tv%26limit=500%26fields=synopsis%2Cstart_date%2Cmean,rank`,
//           `http://localhost:8888/.netlify/functions/helloworld?url=/anime/ranking?offset=3500%26ranking_type=tv%26limit=500%26fields=synopsis,start_date,mean,rank`
//         ];
//         let dataArr = [];
//         for(const url of apiUrl) {
//           const response = await axios.get(url, {
//             headers: {
//               'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
//             },
//           });
//           console.log(response, "response")
//           // const data = await response.json();
//           // console.log(data,"data")
//           dataArr.push(response.data.data);
//         }
//         console.log(dataArr, 'dataArr')
//         dispatch(mainActions.addData(dataArr))
// // console.log('before')
// //         axios.get('http://localhost:8888/.netlify/functions/helloworld?url=/anime/1',{
// //                       headers: {
// //               'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
// //             },
// //         })
// //         .then(response => console.log(response,'response data'))
// //         .catch(error => console.error('error'));
// // console.log('after')
//         // const response = async ()=> {
//         //   await fetch('/.netlify/functions/corsAnywhere')
//         //   .then(response => response.json())
//         // }
//         // console.log(response())

//       }
//       catch (error) {
//         console.log(error);
//         throw error;
//       }
//     }
    
//     gatherData()

    // if(animeData.length <= 0 || animeData[0]===null){
    //   dispatch(mainActions.addData(Anime))

    //     console.log(animeData, animeLeft, animeRight)
      
    // }
    // else{
    //   setLeft(animeData[Number(randomAnimeSelector())].node)
    //   setRight(animeData[Number(randomAnimeSelector())].node)
    //   console.log(animeData, animeLeft, animeRight)
    // }


    // const dataInterval = setInterval(() => {
    //   dispatch(mainActions.addData(Anime))
    // }, 1728000000)


    return () => {

    };
    // eslint-disable-next-line
  }, []);




  const simulateNetworkRequest = ()=> {
    return new Promise((resolve) => setTimeout(resolve, 1500));
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
        if(animeRight.rank<animeLeft.rank){
          setScore(score+1)
          toggleShowA()
        }
        else{
          if(lives > 1){
            setLives(lives-1)
            toggleShowB()
          }
          else{
            loseReset()
            console.log('you die')
            toggleShowB()
          }
        }
        newDisplay()
        break;
      case 'rightRelease':
        // console.log('case right release',animeRight.start_date.replaceAll('-',''),Number(animeLeft.start_date.replaceAll('-','')))
        if(Number(animeRight.start_date.replaceAll('-',''))<Number(animeLeft.start_date.replaceAll('-',''))){
          setScore(score+1)
          toggleShowA()
        }
        else{
          if(lives > 1){
            setLives(lives-1)
            toggleShowB()
          }
          else{
            loseReset()
            console.log('you die')
            toggleShowB()
          }
        }
        newDisplay()
        break;
      case 'leftRate':
        console.log('case left rate')
        if(animeLeft.rank<animeRight.rank){
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

  const toggleShowA = () => {
    setShowA(!showA);
    simulateNetworkRequest().then(() => {
      setShowA(false);
    });
  }
  const toggleShowB = () => {
    setShowB(!showB);
    simulateNetworkRequest().then(() => {
      setShowB(false);
    });
  }

  return (
    <main >

      <ToastContainer>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>

            <strong className="me-auto">Correct!</strong>
            
          </Toast.Header>
          <Toast.Body> 
            <img
                        src="/yes.jpg"
                        className="rounded me-2 toastimg"
                        alt=""
            />
            Woohoo, you're winning!</Toast.Body>
        </Toast>
        <Toast show={showB} onClose={toggleShowB}>
          <Toast.Header>

            <strong className="me-auto">Wrong!</strong>
            
          </Toast.Header>
          
          <Toast.Body>
            <img
                          src="/no.jpg"
                          className="rounded me-2 toastimg"
                          alt=""
            />
          You're loseing!</Toast.Body>
        </Toast>
      </ToastContainer>

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
              <Card className='bg-dark border border-4 border-danger maxheight '>
                <Card.Header>{animeLeft.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeLeft.synopsis.slice(0,450)}...
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>

            <Col className='m-4 text-center h1'>
              <Card className='bg-dark border border-4 border-danger maxheight mobilecard'>
                <Card.Header>{animeRight.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeRight.synopsis.slice(0,450)}...
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <Row className='fixed-bottom pb-1 mb-1 mb-sm-5 pb-sm-5'>
            <Col className='mobilehidden'></Col>
            <Col>
              <div className="d-grid gap-2">
                <Button 
                variant="primary" 
                className='mobilebutton'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                className='mobilebutton'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRelease') : null}>
                    {isLoading ? 'Checking…' : 'Released First'}
                </Button>
              </div>
            </Col>

            <Col>
              <div className='h3 livesback'>
              Lives : {lives} 
              </div><br/>
              <Button 
              variant="primary" 
              className='mobilebutton'
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
                className='mobilebutton'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('rightRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                className='mobilebutton'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('rightRelease') : null}>
                  {isLoading ? 'Checking…' : 'Released First'}
                    
                </Button>
              </div>
            </Col>
            <Col className='mobilehidden'></Col>
          </Row>
        </Col>
      </Container>

    </main>
  )
}

export default App