import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import CreateProduct from './CreateProduct'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/createproduct' element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
