import React, { useEffect, useState, createContext, useLayoutEffect } from "react"
import styled from 'styled-components'
import Cart from './Cart'
import { categoryOptions, categoryCurrency } from '../data'
import { useTranslation } from "react-i18next"
import ChangeContext from "../context/ToggleContext";
import { useContext } from "react"

const Container = styled.div`
    background-color: white;
    width: 400px;
    height: 630px;
    border-radius: 40px;
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
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FilterText = styled.span`
    font-size: 15px;
    font-weight: 600;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    height: 50px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    width: auto;
`
const Option = styled.option`
    
`

const ProductList = () => {
    const { t } = useTranslation();
    const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
    const [subs, setSubs] = useState([]);
    const [categoryitem, setCategoryItem] = useState("All");
    const [currencyitem, setCurrencyItem] = useState(JSON.parse(localStorage.getItem("mny")) || "TL");
    const { toggle, setToggle } = useContext(ChangeContext);

    useLayoutEffect(() => {
        if (userid == "") {
            const loggedInUserId = localStorage.getItem("userid");

            if (loggedInUserId) {
                const foundUserId = JSON.parse(loggedInUserId);
                setUserId(foundUserId);
            }
        }
        getSubsByCategory();
    }, []);
    useEffect(() => {
        localStorage.setItem('mny', JSON.stringify(currencyitem));
        getSubsByCategory();
    }, [currencyitem, categoryitem, toggle]);


    const getSubsByCategory = () => {
        if (categoryitem == "All") {
            const url = 'https://localhost:7075/api/Subscriptions/GetAllSubscriptionsByUserId/' + userid;

            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(subsFromServer => {
                    setSubs(subsFromServer.data);
                })
                .catch((error) => {
                    //console.log(error);
                    // alert(error);
                })
        }
        else {
            const url = 'https://localhost:7075/api/Subscriptions/GetSubscriptionsByCategory/' + userid + '/' + categoryitem;

            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(subsFromServer => {
                    setSubs(subsFromServer.data);
                })
                .catch((error) => {
                    //console.log(error);
                    // alert(error);
                })
        }
    }



    return (
        <Container>
            <Title>{t("expenses")}</Title>
            <FilterContainer>
                <Filter>
                    <Select value={categoryitem} onChange={({ target }) => setCategoryItem(target.value)} >
                        {categoryOptions.map((option) => (
                            <Option value={option.value} key={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                </Filter>
                <Filter>
                    <Select value={currencyitem} onChange={({ target }) => setCurrencyItem(target.value)}>
                        {categoryCurrency.map((option) => (
                            <Option value={option.value} key={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                </Filter>
            </FilterContainer>
            {subs && subs.map((subscription) => (
                <Cart subscription={subscription} key={subscription.id} />
            ))}
        </Container>
    )
}


export default ProductList
