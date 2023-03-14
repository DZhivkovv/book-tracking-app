import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import Libary from './pages/Library'
import About from './pages/About'
import Attributions from './pages/Attributions'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/addBook' element={<AddBook/>}></Route>
          <Route path='/library' element={<Libary/>}></Route>
          <Route path='/aboutMe' element={<About/>}></Route>
          <Route path='/attributions' element={<Attributions/>}></Route>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
