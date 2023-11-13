import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import IndexPage from './pages/IndexPage'

import './App.css'


function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
    </Routes>
  )
}

export default App
