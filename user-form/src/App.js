import React from 'react'
import { BrowserRouter , Routes ,  Route } from 'react-router-dom'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Home from './components/Home'



const App = () => {
  return (
    <div className='container-fluid p-0'>
        <BrowserRouter>
           <Routes>
                <Route  path='/' element={<Home />}/>
                <Route  path='/login' element={<Login />} />
                <Route  path='/register' element={<Register />}/> 
           </Routes>
        </BrowserRouter>
    </div>
  ) 
}

export default App
