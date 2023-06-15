import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import './assets/styles/App.scss';

export default function App() {

  return(
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>          
            <Route path='/signup' element={<Signup/>}/>          
            <Route path='/login' element={<Login/>}/>          
          </Routes>
        </BrowserRouter>
    </div>
  )
}
