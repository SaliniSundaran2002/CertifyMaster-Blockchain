import React from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IssueCertificate from './components/IssueCertificate'
import ViewCertificate from './components/ViewCertificate'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/issue' element={<IssueCertificate />}></Route>
        <Route path='/view' element={<ViewCertificate/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App