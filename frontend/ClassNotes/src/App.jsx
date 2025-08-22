import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Home from './pages/Dashboard/Home.jsx'
import Upload from './pages/Dashboard/Upload.jsx'
import Search from './pages/Dashboard/Search.jsx'
import Dashboard from './pages/Nav/Dashboard.jsx'
import Contact from './pages/Nav/Contact.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
