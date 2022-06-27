import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { packageAddContext } from '../pages/AddExpense';
import { useContext } from 'react';
const Summary = styled.div`
  background-color: white;
  border-radius: 30px;
  height: auto;
  width: auto;
  margin-left: 30px;
`;

const SummaryTitle = styled.h1`
    padding: 6px;
    font-weight: 700;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

const SummaryItem = styled.div`
  margin: 15px 15px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type == "total" && "500"};
  font-size: ${(props) => props.type == "total" && "18px"};
`;

const SummaryItemTitle = styled.span`
  font-weight: 600;
`;

const SummaryItemText = styled.span`
  font-size: medium;
  padding-left: 15px;
  margin-top: 1px;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 10px;
`
const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 3px;
`

const AddPackage = ({ item }) => {
  const{t} = useTranslation();
  const [addpackageId, setaddPackageId] = useState("");
  const [packageIdUpdate, setPackageIdUpdate] = useState(item.id);
  const { packageId, setPackageId } = useContext(packageAddContext);

  
  const handleClick = (id) => {
    setaddPackageId(id);
    localStorage.setItem('packageId', id);
    setPackageId(id);
  }
  return (
    <Summary>
      <SummaryTitle>{item.name}</SummaryTitle>
      <Hr />
      <SummaryItem type="total">
        <SummaryItemTitle>{t("price")}</SummaryItemTitle>
        <SummaryItemText>{item.price}</SummaryItemText>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemTitle>{t("description")}</SummaryItemTitle>
        <SummaryItemText>{item.description}</SummaryItemText>
      </SummaryItem>
      <ButtonContainer>
        <Button id={item.id} onClick={() => handleClick(item.id)}>{t("choose")}</Button>
      </ButtonContainer>
    </Summary>
  )
}

export default AddPackage
