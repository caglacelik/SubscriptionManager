import { Search } from '@material-ui/icons';
import React from 'react'
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { languageOptions } from '../data';
const Container = styled.div`
  height: 80px;
  background-color: #f4f0f0;
  width: 1200px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 25px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: none;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: 0.5px solid lightgray;
  width: auto; 
  height: 35px;
  border-radius: 10px;
  font-size: 20px;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 50px;
  color: #474646;
  margin-left: 30px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    height: 50px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    width: auto;
    background-color: #f4f0f0;
`
const Option = styled.option`

`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 2px;
  width: auto;
`
const Searchbar = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem("lng")) || "Turkish");

  useLayoutEffect(() => {

    const lng = localStorage.getItem("lng");

    if(lng){
      const foundLng = JSON.parse(lng);
      setLanguage(foundLng);
    }
  },[])
  useEffect(() => {
    if (language != "") {
      localStorage.setItem('lng', JSON.stringify(language));
    }
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value == language) {
        i18n.changeLanguage(languageOptions[i].code);
      }
    }
  }, [language])

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>{t("dashboard")}</Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder={t("search")}>
            </Input>
            <Search style={{ color: "gray", fontSize: 25 }} />
          </SearchContainer>
        </Center>
        <Right>
          <Select value={language} onChange={({ target }) => setLanguage(target.value)}>
            {languageOptions.map((item) => (
              <Option key={item.code} value={item.value} >{item.label}</Option>
            ))}
          </Select>
        </Right>
      </Wrapper>
      <Hr />
    </Container>
  )
}

export default Searchbar
