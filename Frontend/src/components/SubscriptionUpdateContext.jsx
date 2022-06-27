import React, { useEffect, useState, useContext, useLayoutEffect } from "react"
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { packageContext } from "../pages/UpdateExpense";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
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
  margin-left: 200px;
  margin-right: 200px;
`;
const Buttons = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 2px;
`

const SubscriptionUpdateContext = ({ subscription }) => {
  const { t } = useTranslation();
  const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
  const [dateState, setDateState] = useState(moment(subscription.finishDate).utc().format('YYYY-MM-DD') || "");
  const [sub, setSub] = useState({});
  const { packageId, setPackageId } = useContext(packageContext);
  const { toggle, setToggle } = useContext(ChangeContext);
  let navigate = useNavigate();

  const subToUpdate = {
    finishDate: dateState,
    userId: userid,
    packageId: packageId ? packageId : null,
    id: subscription.id
  }

  useLayoutEffect(() => {
    if (userid == "") {
      const loggedInUserId = localStorage.getItem("userid");
      if (loggedInUserId) {
        const foundUserId = JSON.parse(loggedInUserId);
        setUserId(foundUserId);
      }
    }
  }, [])
  useEffect(() => {
    for (let i = 0; i < subscription.packages?.length; i++) {
      if (subscription.packages[i].id == packageId) {
        const subFeatures = {
          name: subscription.packages[i].name,
          desc: subscription.packages[i].description,
          price: subscription.packages[i].price
        }
        setSub(sub => ({
          ...sub,
          ...subFeatures
        }));
      }
    }
  }, [packageId])
  const updateSubscription = () => {

    const url = 'https://localhost:7075/api/Subscriptions/UpdateSubscription';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(subToUpdate)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.errors) {
          alert(responseFromServer.errors);
        }

      })
      .catch((error) => {
        //console.log(error);
      })

  }
  const deleteSubscription = (id) => {

    const url = 'https://localhost:7075/api/Subscriptions/DeleteSubscription/' + id;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {

      })
      .catch((error) => {
        //console.log(error);
      })
    setToggle(!toggle);

  }


  return (
    <Summary>
      <SummaryItem>
        <SummaryItemTitle type="total">{t("name")}</SummaryItemTitle>
        <SummaryItemText>{subscription?.productName}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("packageName")}</SummaryItemTitle>
        <SummaryItemText>{sub.name}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("description")}</SummaryItemTitle>
        <SummaryItemText>{sub.desc}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("category")}</SummaryItemTitle>
        <SummaryItemText>{subscription?.categoryName}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <SummaryItem>
        <SummaryItemTitle type="total">{t("date")}</SummaryItemTitle>
        <SummaryItemInput type="date" value={dateState} onChange={({ target }) => setDateState(target.value)} />
      </SummaryItem>
      <Hr />
      <SummaryItem type="total">
        <SummaryItemTitle>{t("price")}</SummaryItemTitle>
        <SummaryItemText>{sub.price}</SummaryItemText>
      </SummaryItem>
      <Hr />
      <Buttons>
        <Button onClick={() => updateSubscription()}>{t("update")}</Button>
        <Button onClick={() => deleteSubscription(subscription.id)}>{t("delete")}</Button>
      </Buttons>
    </Summary>
  )
}

export default SubscriptionUpdateContext
