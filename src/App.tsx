import './App.css'
import LogInPage from './pages/LogInPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'


function App() {
  return (
    <Routes>
      <Route path='/' element={<RegisterPage/>} />
      <Route path='/login' element={<LogInPage/>} />
    </Routes>
  )
}

export default App
