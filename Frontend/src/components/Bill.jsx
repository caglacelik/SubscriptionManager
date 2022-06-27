import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { categoryCurrency } from '../data';
import ChangeContext from "../context/ToggleContext";

const Summary = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 40px;
  height: 100%;
  width: 100%;
  margin-left: 30px;
`;

const SummaryTitle = styled.h1`
    padding: 15px;
    font-weight: 500;
`;

const SummaryItem = styled.div`
  margin: 25px 15px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type == "total" && "500"};
  font-size: ${(props) => props.type == "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 200px;
  background-color: black;
  color: white;
  font-weight: 600;
  height: 50px;
  border-radius: 10px;
  font-size: large;
  cursor:pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  padding-bottom: 10px;
`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 3px;
`


const Bill = () => {
  const { t } = useTranslation();
  const [totalexpenses, setTotalExpenses] = useState([]);
  const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
  const [mnyName, setmnyName] = useState(JSON.parse(localStorage.getItem("mny")) || "TL");
  const [price, setPrice] = useState(1);
  const { toggle, setToggle } = useContext(ChangeContext);
  useLayoutEffect(() => {
    if (userid == "") {
      const loggedInUserId = localStorage.getItem("userid");

      if (loggedInUserId) {
        const foundUserId = JSON.parse(loggedInUserId);
        setUserId(foundUserId);
      }
    }
    const mny = localStorage.getItem("mny");

    if (mny) {
      const foundMny = JSON.parse(mny);
      setmnyName(foundMny);
    }
  });

  useEffect(() => {
    for (let i = 0; i < categoryCurrency.length; i++) {
      if (categoryCurrency[i].value == mnyName) {
        setPrice(categoryCurrency[i].price);
      }
    }
    getTotalExpenses();
  })

  const getTotalExpenses = () => {
    const url = 'https://localhost:7075/api/Subscriptions/GetTotalExpenses/' + userid;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {
        setTotalExpenses(subsFromServer.data);
      })
      .catch((error) => {
        //console.log(error);
        // alert(error);
      })
  }
  const sendpdf = () => {

    const url = 'https://localhost:7075/api/Emails/' + userid;

    fetch(url, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.Errors) {

        }
        else {
          alert(t("emailSuccess"));
        }
      })
      .catch((error) => {
        // console.log(error);
      })
  }
  return (
    <Summary>
      <SummaryTitle>{t("totalExpenses")}</SummaryTitle>
      <Hr />
      <SummaryItem>
        <SummaryItemText>{t("subNumber")}</SummaryItemText>
        <SummaryItemPrice>{totalexpenses.subNumber}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>{t("subTotalMonth")}</SummaryItemText>
        <SummaryItemPrice>{(totalexpenses.subTotalMonth * price).toFixed(2)}{mnyName}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>{t("subTotalYear")}</SummaryItemText>
        <SummaryItemPrice>{(totalexpenses.subTotalYear * price).toFixed(2)}{mnyName}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemText>{t("total")}</SummaryItemText>
        <SummaryItemPrice>{(totalexpenses.subTotalYear * price).toFixed(2)}{mnyName}</SummaryItemPrice>
      </SummaryItem>
      <ButtonContainer>
        <Button onClick={() => sendpdf()}>{t("sendPdf")}</Button>
      </ButtonContainer>
    </Summary>
  )
}

export default Bill
