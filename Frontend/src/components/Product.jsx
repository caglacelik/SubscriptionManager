import styled from "styled-components";
import React from "react";
import { sliderItems } from "../data";
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Container = styled.div`
  background-color: white;
  //height: ${props => props.long * 1}px;
  height: auto;
  width: auto;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Productt = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Details = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5px;
`;

const ProductName = styled.span`
  font-size: 22px;
  margin-top: -15px;
 
`;

const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 2px;
`;
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-weight: 600;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`;
const ButtonContainer =styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`


const Product = ({products}) => {
  let navigate = useNavigate();
  const{t} = useTranslation();

  const imgsrc = (name) => {
    
    for(let i =0;i<sliderItems.length;i++)
    {
      if(sliderItems[i].name == name)
      {
        return sliderItems[i].img; 
      }
    }
  }
  const getProductId = (productId) => {
    navigate('/AddExpense/'+productId);
  }

  return (
    <Container long={products.length - 1}>
      <Hr />
      <Wrapper>
        <Bottom>
          <Info>
            <Productt>
              <ProductDetail>
                  <Image src={imgsrc(products.name)}/>
                <Details>
                  <ProductName>
                    <b>{products.name}</b>
                  </ProductName>
                </Details>
              </ProductDetail>
              <ButtonContainer>
                <Button onClick={()=>getProductId(products.id)}>{t("add")}</Button>
              </ButtonContainer>
            </Productt>
          </Info>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Product;
