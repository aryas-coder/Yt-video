import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Downloads from './pages/Downloads'
import History from './pages/History'
import Settings from './pages/Settings'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="app-root" data-theme={localStorage.getItem('theme') || 'light'}>
      <Navbar />
      <main className="main-content" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
