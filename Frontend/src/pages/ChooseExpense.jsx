import React, { useState } from "react"
import styled from 'styled-components'
import ResponsiveMenu from '../components/ResponsiveMenu'
import Searchbar from '../components/Searchbar'
import { useNavigate } from 'react-router-dom'
import Product from "../components/Product"
import { useTranslation } from "react-i18next"
import { useLayoutEffect } from "react"

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
    margin-left: 50px;
`
const Container4 = styled.div`
    background-color: white;
    width: 100%;
    //height: ${props => props.long * 140}px;
    height: 630px;
    border-radius: 25px;
    overflow-x: hidden;
    ::-webkit-scrollbar{
        display: none;
    }
`
const Title = styled.h1`
    margin-top: 20px;
    margin-left: 30px;
    font-size: 40px;
`


const ChooseExpense = () => {
  const{t} = useTranslation();
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();
  useLayoutEffect(() => {
    const loggedInUserId = localStorage.getItem("userid");
    if (!loggedInUserId) {
      navigate('/Login');
    }
    const url = 'https://localhost:7075/api/Products/GetAllProducts';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {
        setProducts(subsFromServer.data);
      })
      .catch((error) => {
        //console.log(error);
        // alert(error);
      })
  },[])
 

  
    
  return (
    <Container>
      <ResponsiveMenu />
      <Container2>
        <Searchbar />
        <Container3>
          <Container4>
            <Title>{t("subscriptions")}</Title> 
            {products.map((products) => (
              <Product products={products} key={products.id} />
            ))}
          </Container4>
        </Container3>
      </Container2>
    </Container>
  )
}

export default ChooseExpense

