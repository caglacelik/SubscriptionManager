import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { useState, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ChangeContext from '../context/ToggleContext';
import { useContext } from 'react';

const Container = styled.div`
    margin-left: 5%;
    max-width: 530px;
    height: auto;
    display: flex;
    background-color: transparent;
    position: relative;
    overflow: hidden;
    margin-left: 100px;
`
const Container2 = styled.div`
    width: auto;
    height: auto;
    padding: 20px 20px;
    margin-bottom: 20px;
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction == "left" && "10px"};
    right: ${props => props.direction == "right" && "10px"};
    cursor: pointer;
    z-index: 2;
    margin-left: -20px;
    margin-right: -29px;
`
const Wrapper = styled.div`
    width: auto;
    height: auto;
    display: flex;
    transition: all 1.5s ease;
    background-color: transparent;
    transform: translateX(${props => props.sliderIndex * -170}px);
`
const Slide = styled.div`
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};
`
const ImgContainer = styled.div`
    display: flex;
    background-color: #f4f0f0;
    padding: 0px 10px;
`
const Img = styled.img`
    max-height: 120px;
    max-width: 120px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 30%;
    background-color: white;
    z-index: 3;
    margin-left: 30px;
    margin-top: 20px;
`
const Logo = styled.h1`
  font-weight: bold;
  margin: 10px 50px;
  color: #646262;
  font-size: 30px;
`
const Slider = () => {
    const { t } = useTranslation();
    const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
    const [subs, setSubs] = useState([]);
    const [sliderIndex, setSliderIndex] = useState(0);
    const { toggle, setToggle } = useContext(ChangeContext);
    let navigate = useNavigate();

    useLayoutEffect(() => {
        if (userid == "") {
            const loggedInUserId = localStorage.getItem("userid");

            if (loggedInUserId) {
                const foundUserId = JSON.parse(loggedInUserId);
                setUserId(foundUserId);
            }
        }
        getSubs();
    }, []);
    useEffect(() => {
        if (userid == "") {
            const loggedInUserId = localStorage.getItem("userid");

            if (loggedInUserId) {
                const foundUserId = JSON.parse(loggedInUserId);
                setUserId(foundUserId);
            }
        }
        getSubs();
    }, [toggle]);
    const getSubs = () => {
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
    const imgsrc = (name) => {

        for (let i = 0; i < sliderItems.length; i++) {
            if (sliderItems[i].name == name) {
                return sliderItems[i].img;
            }
        }
    }
    const handleClick = (direction) => {
        if (direction == "left") {
            if (sliderIndex > 0) {
                setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : subs.length - 1)
            }
        }
        else {
            if (sliderIndex < subs.length - 3) {
                setSliderIndex(sliderIndex < subs.length - 3 ? sliderIndex + 1 : 0)
            }
        }
    }
    const handleUpdate = (id) => {
        navigate('/UpdateExpense/' + id);
    }
    return (
        <Container2>
            <Logo>{t("subscriptions")}</Logo>
            <Container>
                <Arrow direction="left" onClick={() => handleClick("left")}>
                    <KeyboardArrowLeft fontSize='large' />
                </Arrow>
                <Wrapper sliderIndex={sliderIndex}>
                    {subs.map(item => (
                        <Slide key={item.id}>
                            <ImgContainer>
                                <Img src={imgsrc(item.productName)} onClick={() => handleUpdate(item.id)} />
                            </ImgContainer>
                        </Slide>
                    ))}
                </Wrapper>
                <Arrow direction="right" onClick={() => handleClick("right")}>
                    <KeyboardArrowRight fontSize='large' />
                </Arrow>
            </Container>
        </Container2>

    )
}

export default Slider
