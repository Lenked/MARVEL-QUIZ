import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer' 
import Welcome from '../Welcome'
import Login from '../Login'
import Signup from '../Signup'
import ErrorPage from '../ErrorPage'
import '../../App.css';
import ForgetPassword from '../ForgetPassword';
import { IconContext } from 'react-icons'; 

function App() {
  return (
    <BrowserRouter>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle'} }}>
    <Header/>
      <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/welcome' element={<Welcome />} /> 
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
      </Routes>
      <Footer/>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
