import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Add from '../pages/Add'

export default function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
    </Routes>
  )
}
