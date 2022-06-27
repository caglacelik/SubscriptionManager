import React from 'react'
import styled from 'styled-components'
import Slider from '../components/Slider'
import ProductList from './ProductList'
import ResponsiveMenu from '../components/ResponsiveMenu'
import Bill from '../components/Bill'
import Chart from '../components/Chart'
import Searchbar from '../components/Searchbar'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const Container = styled.div`
    background-color: #f4f0f0;
    display: flex;
    height: auto;
    width: auto;
`
const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f4f0f0;
    width: auto;
`
const Container3 = styled.div`
    background-color: #f4f0f0;
    display: flex;
    margin-top: 10px;
    
`
const Center = styled.div` 
  margin-right: 30px;
  display: flex;
  background-color: #f4f0f0;
  height: 600px;
  width: 770px;
`
const PieBill = styled.div`
  display: flex;
  width: 750px;
`
const SlidePieBill = styled.div`
  display: flex;
  flex-direction: column;
`
const Dashboard = () => {
  let navigate = useNavigate();
  useLayoutEffect(() => {
    const loggedInUserId = localStorage.getItem("userid");
    if (!loggedInUserId) {
      navigate('/Login');
    }
  })


  return (
      <Container>
        <ResponsiveMenu />
        <Container2>
          <Searchbar />
          <Container3>
            <Center>
              <SlidePieBill>
                <Slider />
                <PieBill>
                  <Chart></Chart>
                  <Bill />
                </PieBill>
              </SlidePieBill>
            </Center>
            <ProductList />
          </Container3>
        </Container2>
      </Container>
  )
}

export default Dashboard
