import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import PollinPage from './Pages/PollinPage'
import Home from './Pages/Home'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/polling-page' element={<PollinPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App