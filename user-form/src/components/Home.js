import React from 'react'
import { useNavigate ,   NavLink } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='container-fluid border b-2'>
       <div className="container-fluid  d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}> 
  {localStorage.getItem('user') ? 
           <h1>Hello , Welcome</h1>
           <h5>email : {JSON.parse(localStorage.getItem('user')).email}</h5>
           <h5>name : {JSON.parse(localStorage.getItem('user')).username}</h5>
           <button className='btn btn-primary p-2' onClick={()=> {window.localStorage.removeItem('user'); navigate('/login')}}>Logout</button>
        </div> :
    <NavLink to='/login' className='text-primary fs-3'>Login</NavLink>
    <NavLink to='/register' className='text-primary fs-3'>Register</NavLink>
  }
    </div>
  )
}

export default Home
