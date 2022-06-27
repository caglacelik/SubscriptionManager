import React, { useEffect, useState, useLayoutEffect, createContext } from "react";
import styled from 'styled-components'
import ResponsiveMenu from '../components/ResponsiveMenu'
import Searchbar from '../components/Searchbar'
import { useNavigate, useParams } from 'react-router-dom'
import { sliderItems } from "../data";
import SubscriptionUpdateContext from "../components/SubscriptionUpdateContext";
import UpdatePackage from "../components/UpdatePackage";

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
export const packageContext = createContext(null);
const UpdateExpense = () => {
    let { SubscriptionId } = useParams();
    const [subdata, setSubData] = useState([]);
    const [userid, setUserId] = useState("");
    const [packageId, setPackageId] = useState("");
    const [update, setUpdate] = useState(true);
    let navigate = useNavigate();
 
    useLayoutEffect(() => {
        const loggedInUserId = localStorage.getItem("userid");
        if (!loggedInUserId) {
          navigate('/Login');
        }
        getSubscription(SubscriptionId);
    }, [])
    useEffect(() => {
        for (let i = 0; i < subdata.packages?.length; i++) {
            if (subdata.packages[i].name == subdata.packageName) {
                setPackageId(subdata.packages[i].id);
            }
        }
    }, [subdata])

    const getSubscription = (subId) => {
        const url = 'https://localhost:7075/api/Subscriptions/GetBySubscriptionId/' + subId;

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(subsFromServer => {
                setSubData(subsFromServer.data);
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
        <packageContext.Provider value={{ packageId, setPackageId }}>
            <Container>
                <ResponsiveMenu />
                <Container2>
                    <Searchbar />
                    <Container3>
                        <Content>
                            <Top>
                                <ImageText>{subdata.productName}</ImageText>
                                <Image src={imgsrc(subdata.productName)} />
                            </Top>
                            <Center>
                                <PackageContainer>
                                    {subdata.packages?.map((item) => (
                                        <UpdatePackage item={item} key={item.id} />
                                    ))}
                                </PackageContainer>
                            </Center>
                            <Bottom>
                                <SubscriptionUpdateContext subscription={subdata} key={subdata.id} />
                            </Bottom>
                        </Content>
                    </Container3>
                </Container2>
            </Container>
        </packageContext.Provider>
    )
}

export default UpdateExpense
