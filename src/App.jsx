import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import RegisterCandidate from './pages/RegisterCandidate'
import RegisterVoter from './pages/RegisterVoter'

import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/voter" element={<RegisterVoter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
