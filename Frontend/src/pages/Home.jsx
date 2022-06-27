import React from 'react'
import Dashboard from './Dashboard'
import AddExpense from './AddExpense'
import Login from './Login'
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import ChooseExpense from './ChooseExpense'
import UpdateExpense from './UpdateExpense'

const Home = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />       
          <Route path="/AddExpense/:ProductId" element={<AddExpense />} />
          <Route path="/UpdateExpense/:SubscriptionId" element={<UpdateExpense />} />
          <Route path="/ChooseExpense" element={<ChooseExpense />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Home
