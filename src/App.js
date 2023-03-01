import React,{useEffect, useSelector} from 'react';
import {useDispatch } from 'react-redux';

import {mainActions} from './slice/MainSlice';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const App = () => {

  const dispatch = useDispatch()

  let bestScore = useSelector((state)=> state.main.bestScore)
  const animeData = useSelector((state)=> state.main.animeData)

  return (
    <div>
      
    </div>
  )
}

