import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import ResponsiveMenu from '../components/ResponsiveMenu';
import { useTranslation } from "react-i18next";

const Containerr = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
    background-color: #f4f0f0;
    display: flex;
    height: auto;
    width: auto;
`
const Container2 = styled.div`
    display: flex;
    background-color: #f4f0f0;
    width: 80%;
    align-items: center;
    padding: 20px 20px;
    justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px 20px;
  background-color: #cde3f6;
  border-radius: 10px;
  margin-right: 60px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  border-color: transparent;
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
`;


const Login = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [phoneReg, setPhoneReg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userid, setUserId] = useState(JSON.parse(localStorage.getItem("userid")) || "");
  const [user, setUser] = useState([]);
  const [LoginStatus, setLoginStatus] = useState(false);
  const [key, setKey] = useState(false);

  const userToLogin = {
    email: email,
    password: password
  }
  const userToUpdate = {
    id: userid,
    email: email,
    password: password,
    phoneNumber: phone
  }

  useLayoutEffect(() => {
    const loggedInUserId = localStorage.getItem("userid");
    if (loggedInUserId) {
      const foundUserId = JSON.parse(loggedInUserId);
      setUserId(foundUserId);
      getUser(userid);
    }
  }, [userid, LoginStatus])

  const handleSubmitSign = () => {
    if (LoginStatus) {
      alert("Please logout before login")
    }
    else {
      const url = 'https://localhost:7075/api/Users/Login';

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userToLogin)
      })
        .then(response => response.json())
        .then(responseFromServer => {
          if (responseFromServer.data != null) {
            //setUser(responseFromServer.data);
            setUserId(responseFromServer.data.id);
            setLoginStatus(true);
            localStorage.setItem('userid', responseFromServer.data.id);
          }
          else {
            alert(responseFromServer.Errors);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

  }
  const handleSubmitReg = () => {
    const userToReg = {
      email: emailReg,
      password: passwordReg,
      phoneNumber: phoneReg
    }

    const url = 'https://localhost:7075/api/Users/Register';

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userToReg)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.Errors == null) {
          setEmail(emailReg);
          setPassword(passwordReg);
          alert(responseFromServer.successMessage);
          setKey(true);
        }
        else {
          alert(responseFromServer.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setLoginStatus(false);
    localStorage.clear();
  }
  const getUser = (useridd) => {
    const url = 'https://localhost:7075/api/Users/GetById/' + useridd;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.data != null) {
          setUser(responseFromServer.data);
          setLoginStatus(true);
          setEmail(user.email);
          setPassword(user.password);
          setPhone(user.phoneNumber);
        }
        else {
          setLoginStatus(false);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
  }
  const updateUser = () => {
    const url = 'https://localhost:7075/api/Users/Update';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userToUpdate)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        if (responseFromServer.successMessage != null) {
          alert(t("updateSuccess"));
        }
      })
      .catch((error) => {
        // console.log(error);
      })
  }
  if (key) {
    handleSubmitSign();
    setKey(false);
  }
  return (
    <Container>
      <ResponsiveMenu />
      <Container2>
        {!LoginStatus && <Wrapper>
          <Title>{t("register")}</Title>
          <Form>
            <Input placeholder={t("email")} onChange={(e) => setEmailReg(e.target.value)} />
            <Input placeholder={t("password")} onChange={(e) => setpasswordReg(e.target.value)} />
            <Input placeholder={t("phoneNumber")} onChange={(e) => setPhoneReg(e.target.value)} />
            <Button onClick={() => handleSubmitReg()}>{t("register")}</Button>
          </Form>
        </Wrapper>}

        <Wrapper>
          <Title>{t("login")}</Title>
          <Form>
            <Input value={email} placeholder={t("email")} onChange={({ target }) => setEmail(target.value)} />
            <Input value={password} placeholder={t("password")} onChange={({ target }) => setPassword(target.value)} />
            {LoginStatus && <Input value={phone} placeholder={t("phoneNumber")} onChange={({ target }) => setPhone(target.value)} />}
            {LoginStatus && <Button onClick={() => updateUser()}>{t("update")}</Button>}
            {!LoginStatus && <Button onClick={() => handleSubmitSign()}>{t("login")}</Button>}
            {LoginStatus && <Button onClick={() => handleLogout()}>{t("logout")}</Button>}
          </Form>
        </Wrapper>
      </Container2>
    </Container>
  );
};

export default Login;
