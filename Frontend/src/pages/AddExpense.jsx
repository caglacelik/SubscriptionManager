import React, { useState } from "react";
import styled from 'styled-components'
import ResponsiveMenu from '../components/ResponsiveMenu'
import Searchbar from '../components/Searchbar'
import AddPackage from '../components/AddPackage'
import SubscriptionAddContent from '../components/SubscriptionAddContent'
import { useNavigate, useParams } from 'react-router-dom'
import { sliderItems } from "../data";
import { useLayoutEffect } from "react";
import { createContext } from "react";
import { useEffect } from "react";

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
const Content = styled.div` 
    display: flex;
    background-color: #f4f0f0;
    flex-direction: column;
    height: auto;
    width: auto;
    justify-content: center;
`
const Top = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex:1;
    margin-left: 30px;
    background-color: #f4f0f0;
`
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1;
    background-color: #f4f0f0;
`
const Bottom = styled.div`
    flex:2;
    display: flex;
    background-color: #f4f0f0;
    justify-content: center;
`
const Image = styled.img`
    width: 100px;
    height: 90px;
    padding: 5px;
`;
const ImageText = styled.h1`
    font-size: 28px;
`
const PackageContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    background-color: #f4f0f0;
`
export const packageAddContext = createContext(null);
const AddExpense = () => {
  let { ProductId } = useParams();
  const [packages, setPackages] = useState([]);
  const [product, setProduct] = useState([]);
  const [packageId, setPackageId] = useState("");
  let navigate = useNavigate();


  useLayoutEffect(()=>{
    const loggedInUserId = localStorage.getItem("userid");
    if (!loggedInUserId) {
      navigate('/Login');
    }
      getPackages();
      getProduct();
  },[])

  const getPackages = () => {
    const url = 'https://localhost:7075/api/Packages/GetPackagesWithProductId/' + ProductId;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {
        setPackages(subsFromServer.data);
        setPackageId(subsFromServer.data[0].id);
      })
      .catch((error) => {
        //console.log(error);
        // alert(error);
      })

  }
  const getProduct = () => {
    const url = 'https://localhost:7075/api/Products/GetById/' + ProductId;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {
        setProduct(subsFromServer.data);
      })
      .catch((error) => {
        //console.log(error);
        // alert(error);
      })
  }

  const imgsrc = (name) => {

    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].name == name) {
        return sliderItems[i].img;
      }
    }
  }

  return (
    <packageAddContext.Provider value = {{packageId, setPackageId}}>
    <Container>
      <ResponsiveMenu />
      <Container2>
        <Searchbar />
        <Container3>
          <Content>
            <Top>
              <ImageText>{product.name}</ImageText>
              <Image src={imgsrc(product.name)} />
            </Top>
            <Center>
              <PackageContainer>
                {packages?.map((item) => (
                  <AddPackage item={item} key={item.id} />
                ))}
              </PackageContainer>
            </Center>
            <Bottom>
              <SubscriptionAddContent/>
            </Bottom>
          </Content>
        </Container3>
      </Container2>
    </Container>
    </packageAddContext.Provider>
  )
}

export default AddExpense

