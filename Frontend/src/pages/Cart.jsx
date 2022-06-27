import styled from "styled-components";
import { categoryCurrency } from '../data'
import React, { useState } from "react";
import { sliderItems } from "../data";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";

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

const Product = styled.div`
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

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
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
`;
const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`


const Cart = ({ subscription }) => {
  const { t } = useTranslation();
  const [mnyName, setmnyName] = useState("");
  const [price, setPrice] = useState(1);
  const [number_of_days, setDays] = useState(subscription.dueTime || "");
  const imgsrc = (name) => {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].name == name) {
        return sliderItems[i].img;
      }
    }
  }

  useLayoutEffect(() => {
    const mny = localStorage.getItem("mny");

    if (mny) {
      const foundMny = JSON.parse(mny);
      setmnyName(foundMny);
    }
  })

  useEffect(() => {
    for (let i = 0; i < categoryCurrency.length; i++) {
      if (categoryCurrency[i].value == mnyName) {
        setPrice(categoryCurrency[i].price);
      }
    }
  }, [mnyName])


  return (

    <Container long={subscription.length - 1}>
      <Hr />
      <Wrapper>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src={imgsrc(subscription.productName)} />
                <Details>
                  <ProductName>
                    <b>{subscription.productName}</b>
                  </ProductName>
                  <ProductSize>
                    {t("daysRemain",{number_of_days})}
                  </ProductSize>
                </Details>
              </ProductDetail>
              
              <PriceDetail>
              {subscription.packageName}
                <ProductPrice>{(subscription.price * price).toFixed(2)}{mnyName}</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
