//-----------------------------------------------------------------------------------------------------------IMPORTS-----------------------------------------------------------------------------
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

import Anime from './data/data'

//-----------------------------------------------------------------------------------------------------------useEffect and State-----------------------------------------------------------------------------

const App = () => {

  const dispatch = useDispatch();

  const randomAnimeSelector = ()=> {
    let animeSelectNum = Math.floor(Math.random() * 4000)
    // console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
  }


  const bestScore = useSelector((state)=> state.main.bestScore);
  // const animeData = useSelector((state)=> state.main.animeData);
  // const animeData = Anime;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [skip, setSkip] = useState(3);
  const [animeLeft, setLeft] = useState();
  const [animeRight, setRight] = useState();
  const [isLoading, setLoading] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);



  useEffect(() => {
    
    console.log("why is the mal api the worst thing in the world?")
    setLeft(Anime[Number(randomAnimeSelector())].node)
    setRight(Anime[Number(randomAnimeSelector())].node)
    return () => {
    };
  }, []);


//-------------------------------------------------------------------------------------------------------FUNCTIONS-----------------------------------------------------------------------------


  const simulateNetworkRequest = ()=> {
    console.log('in timeout')
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const newDisplay = ()=> {
    setLeft(Anime[Number(randomAnimeSelector())].node)
    setRight(Anime[Number(randomAnimeSelector())].node)
    console.log(animeLeft, 'left', animeRight, 'right')
  }

  const loseReset = ()=>{
    console.log('lose reset')
    
    if(score> bestScore){
      dispatch(mainActions.displayBest(score))
    }
    
    setScore(0)
    setLives(3)
    setSkip(3)

  }

  const buttonOnClick = (button)=>{
    console.log('on button click')
    document.getElementsByClassName("flip-card")[0].className += " clicked"
    document.getElementsByClassName("flip-card")[1].className += " clicked"
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
        
        break;
      case 'leftRate':
        console.log('case left rate')
        if(animeLeft.rank<animeRight.rank){
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
        
        break;
      case 'leftRelease':
        console.log('case left release')
        if(Number(animeLeft.start_date.replaceAll('-',''))<Number(animeRight.start_date.replaceAll('-',''))){
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
        
        break;
      case 'skip':
        console.log('skip')
        if(skip>0){
          setSkip(skip-1)
          
        }
      break;
      default:
        console.log('error in buton click')
    }

  }

  if (isLoading) {
    simulateNetworkRequest().then(() => {
      console.log('running')
      
      setShowA(false);
      setShowB(false);
      setLoading(false);
      newDisplay();
      document.getElementById("backround").className = "bg-main-default"
      document.getElementsByClassName("flip-card")[0].className = "flip-card"
      document.getElementsByClassName("flip-card")[1].className = "flip-card"
    });
  }

  const toggleShowA = () => {
    console.log('toggleA')
    setShowA(!showA);
    document.getElementById("backround").className = "bg-main-win"
  }
  const toggleShowB = () => {
    console.log('toggleB')
    setShowB(!showB);
    document.getElementById("backround").className = "bg-main-lose"
  }


//-------------------------------------------------------------------------------------------------------Toast-----------------------------------------------------------------------------
  
  return (
    <main id='backround' className='bg-main-default'>

      <div className='bg-text'> ANIMELIST GAMBIT</div>
{
//-------------------------------------------------------------------------------------------------------NavBar-----------------------------------------------------------------------------
}

      <Navbar className='bg-nav'>
        <Container>
            <Navbar.Brand>
                <img
                alt=""
                src="/logo2.png"
                width="125"
                height="125"
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


{
//------------------------------------------------------------------------------------------------------Right Card------------------------------------------------------------------------------
}

      {animeLeft && animeRight ?(

      <Container className='h-75 text-center '>
        <Col className='h-100'>
          <Row xs={12} md={12} className="g-4 p-4 flip-card-container h-100">

            <Col className='m-4 text-center h1 '>
              <div className='flip-card'>

              <Card className='card-front'>
                <Card.Header>{animeLeft.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeLeft.synopsis.slice(0,450)}...
                    </p>
                  </blockquote>
                  <div className="d-grid gap-2">
                    <Button 
                     
                    className='mobilebutton bg-button mt-3'
                    size="lg"
                    disabled={isLoading}
                    onClick={!isLoading ? ()=>buttonOnClick('leftRate') : null}>
                      {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                        
                    </Button>
                    <br/><br/>
                    <Button 
                    variant="secondary" 
                    className='mobilebutton bg-button'
                    size="lg"
                    disabled={isLoading}
                    onClick={!isLoading ? ()=>buttonOnClick('leftRelease') : null}>
                        {isLoading ? 'Checking…' : 'Released First'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              <div class="card-back">
                <Col>
                  <img src={animeLeft.main_picture.large} className='anime-image' alt="Left Anime"></img>
                </Col>
              </div>

              </div>
            </Col>


{
//-------------------------------------------------------------------------------------------------------Center Col-----------------------------------------------------------------------------
}

            <Col className='col-2 lives-skip justify-content-center pt-5'>
              <div className='h3 livesback lives-border'>
              Lives : {lives} 
              </div><br/>
              <Button 
               
              className='mobilebutton bg-button'
              size="lg"
              disabled={isLoading}
              onClick={!isLoading ? ()=>buttonOnClick('skip') : null}>
                      Skip {skip}/3
              </Button>
            </Col>

{
//-------------------------------------------------------------------------------------------------------Left Card-----------------------------------------------------------------------------
}

            <Col className='m-4 text-center h1'>
              <div className='flip-card'>

              <Card className='card-front'>
                <Card.Header>{animeRight.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className='h4'>
                      {animeRight.synopsis.slice(0,450)}...
                    </p>
                  </blockquote>
                  <div className="d-grid gap-2">
                    <Button 
                     
                    className='mobilebutton bg-button mt-3'
                    size="lg"
                    disabled={isLoading}
                    onClick={!isLoading ? ()=>buttonOnClick('rightRate') : null}>
                      {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                        
                    </Button>
                    <br/><br/>
                    <Button 
                    variant="secondary" 
                    className='mobilebutton bg-button'
                    size="lg"
                    disabled={isLoading}
                    onClick={!isLoading ? ()=>buttonOnClick('rightRelease') : null}>
                      {isLoading ? 'Checking…' : 'Released First'}
                        
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              <div class="card-back">
                <Col>
                <img src={animeRight.main_picture.large} className='anime-image' alt="Right Anime"></img>
                </Col>
              </div>

              </div>
            </Col>

          </Row>


{
//-------------------------------------------------------------------------------------------------------FOOTER-----------------------------------------------------------------------------
}

          <Row className='fixed-bottom pb-2 pt-2 pt-sm-3 pb-sm-5 bg-bottom'>
            <Col className='mobilehidden'></Col>
            <Col>
              <div className="d-grid gap-2">
                <Button 
                 
                className='mobilebutton bg-button'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                className='mobilebutton bg-button'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('leftRelease') : null}>
                    {isLoading ? 'Checking…' : 'Released First'}
                </Button>
              </div>
            </Col>



            <Col>
              <div className="d-grid gap-2">
                <Button 
                 
                className='mobilebutton bg-button'
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? ()=>buttonOnClick('rightRate') : null}>
                  {isLoading ? 'Checking…' : 'Higher Rating/Rank'}
                    
                </Button>
                <br/><br/>
                <Button 
                variant="secondary" 
                className='mobilebutton bg-button'
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
      ) : (
        <div>Loading...</div>
      )}

    </main>
  )
}

export default App