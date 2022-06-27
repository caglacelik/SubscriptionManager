import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from "react-i18next";
import { packageAddContext } from "../pages/AddExpense";
import { useContext } from "react";
import ChangeContext from "../context/ToggleContext";
const Summary = styled.div`
  background-color: white;
  border-radius: 40px;
  height: auto;
  width: 1000px;
  margin-left: 30px;
`;

const SummaryTitle = styled.h1`
    padding: 10px;
    font-weight: 700;
    margin-left: 10px;
    justify-content: center;
    display: flex;
    text-align: center;
    align-items: center;
`;

const SummaryItem = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type == "total" && "500"};
  font-size: ${(props) => props.type == "total" && "24px"};
`;

const SummaryItemTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const SummaryItemText = styled.span``;
const SummaryItemInput = styled.input`

`;

const Button = styled.button`
  min-width: 100px;
  min-height: 40px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`;
const Buttons = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 2px;
`
const SubscriptionAddContent = () => {
  const { t } = useTranslation();
  const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
  const { packageId, setPackageId } = useContext(packageAddContext);
  const [packageData, setPackageData] = useState([]);
  const [productName, setProductName] = useState("");
  const [dateState, setDateState] = useState("");
  const {toggle, setToggle} = useContext(ChangeContext);

  const subToAdd = {
    finishDate: dateState,
    userId: userid,
    packageId: packageId
  }

  useLayoutEffect(() => {
    if (userid == "") {
      const loggedInUserId = localStorage.getItem("userid");
      if (loggedInUserId) {
        const foundUserId = JSON.parse(loggedInUserId);
        setUserId(foundUserId);
      }
    }
    { packageId && getPackageData(); }
  }, [packageId])
  useEffect(() => {
    { packageData && getProductName(packageData.productId); }
  }, [packageData])

  //console.log(packageId);
  const getPackageData = () => {
    const packageUrl = 'https://localhost:7075/api/Packages/GetById/' + packageId;
    fetch(packageUrl, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {
        setPackageData(subsFromServer.data);
      })
      .catch((error) => {
        //console.log(error);
        // alert(error);
      })
  }
  const getProductName = (productId) => {
    if (productId) {
      const productUrl = 'https://localhost:7075/api/Products/GetById/' + productId;
      fetch(productUrl, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(subsFromServer => {
          setProductName(subsFromServer.data.name);
        })
        .catch((error) => {
          //console.log(error);
          // alert(error);
        })
    }
  }
  const addSubscription = () => {
    const url = 'https://localhost:7075/api/Subscriptions/AddSubscription';

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(subToAdd)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.errors) {
          alert(responseFromServer.errors);
        }
        else{
          setToggle(!toggle);
        }

      })
      .catch((error) => {
        //console.log(error);
      })
  }



  return (
    <Summary>
      <SummaryItem>
        <SummaryItemTitle type="total">{t("name")}</SummaryItemTitle>
        <SummaryItemText>{productName}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("packageName")}</SummaryItemTitle>
        <SummaryItemText>{packageData?.name}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("description")}</SummaryItemTitle>
        <SummaryItemText>{packageData?.description}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("category")}</SummaryItemTitle>
        <SummaryItemText>{packageData?.categoryName}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("date")}</SummaryItemTitle>
        <SummaryItemInput type="date" value={dateState} onChange={({ target }) => setDateState(target.value)} />
      </SummaryItem>
      <Hr />
      <SummaryItem type="total">
        <SummaryItemTitle>{t("price")}</SummaryItemTitle>
        <SummaryItemText>{packageData?.price}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <Buttons>
        <Button onClick={() => addSubscription()}>{t("add")}</Button>
      </Buttons>
    </Summary>
  )
}

export default SubscriptionAddContent
