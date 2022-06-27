import React from 'react'
import { AccountBoxOutlined, AddBoxOutlined, ExitToAppOutlined, FormatListBulletedOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const Sidebar = styled.div`
    width: 320px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 720px;
    @media screen and (max-width: 768px){
        width: 50px; 
        .list-item-text{
            display:none;
        } 
    }
`
const Top = styled.div`
    display: flex;
    flex: 1;
    margin-top: 50px;
`
const Center = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`
const Bottom = styled.div`
    padding: 10px 0px;
    margin-bottom: 20px;
    flex: 1;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    cursor: pointer;
    &:hover{
        background-color: #374151;
        color: white;
    }
    border-radius: 10px;
    max-height: 50px;
`
const Center2 = styled.div`
    align-items: center;
    display: flex;
`
const Logout = styled.div`
    margin-left: 80px;
    font-size: 40px;
    font-weight: 500;
`
const Logo = styled.div`
    font-size: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    color: #ac060f;
`
const List = styled.div`
    list-style: none;
    padding: 0;
    width: 100%;
`
const ListItem = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    &:hover{
        background-color: #374151;
        color: white;
    }
`

const ResponsiveMenu = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();

    const routeLogin = () => {
        const loggedInUserId = localStorage.getItem("userid");
        if (!loggedInUserId) {
            navigate('/Login');
        }
        else {
            let path = `/Login`;
            navigate(path);
        }
    }
    const routeChooseExpense = () => {
        const loggedInUserId = localStorage.getItem("userid");
        if (!loggedInUserId) {
            navigate('/Login');
        }
        else {
            let path = `/ChooseExpense`;
            navigate(path);
        }
    }
    const routeDashboard = () => {
        const loggedInUserId = localStorage.getItem("userid");
        if (!loggedInUserId) {
            navigate('/Login');
        }
        else {
            let path = `/`;
            navigate(path);
        }
    }
    const logout = () => {
        localStorage.clear();
        navigate('/Login');
    }

    return (
        <Sidebar>
            <Top>
                <Logo>{t('greeting')}</Logo>
            </Top>
            <Center>
                <List>
                    <ListItem onClick={routeLogin}>
                        <Center2>
                            <AccountBoxOutlined fontSize='large' />
                            <span className='list-item-text'>{t("profile")}</span>
                        </Center2>
                    </ListItem>
                    <ListItem onClick={routeChooseExpense}>
                        <Center2>
                            <AddBoxOutlined fontSize='large' />
                            <span className='list-item-text'>{t("addSubscription")}</span>
                        </Center2>

                    </ListItem>
                    <ListItem onClick={routeDashboard}>
                        <Center2>
                            <FormatListBulletedOutlined fontSize='large' />
                            <span className='list-item-text'>{t("subscriptions")}</span>
                        </Center2>
                    </ListItem>
                </List>
            </Center>

            <Bottom onClick={() => logout()}>
                <ExitToAppOutlined fontSize='large' />
                <span className='list-item-text' style={{ 'fontSize': '250%' }}>{t("logout")}</span>
            </Bottom>

        </Sidebar>
    )
}

export default ResponsiveMenu
