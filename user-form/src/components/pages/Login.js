import React, { useState, useEffect } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import { loginUser } from '../validationForm/formValidation'
import { toast , ToastContainer } from 'react-toastify'
import axios from 'axios'

const Login = () => {
   
    const [passTog , setPassTog] = useState(false)
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const initialState = {
           email:"",
           password:""
       
    }

     const {  values , errors ,  handleChange , handleSubmit } = useFormik({
         initialValues:initialState,
         validationSchema:loginUser,
         onSubmit : async (data)=>{
               setLoading(true)  
               try{
                const result = await axios.post(`${process.env.REACT_APP_HOST}/api/login` , data)
                if(result.status === 201){
                       setLoading(false)
                       toast.success(result.data.message)
                       navigate('/')
                       window.localStorage.setItem('user' , JSON.stringify(result.data.data))
                }
             }
             catch(err){
           
                if(err.response.status === 499){
                    setLoading(false)
                    return toast.error(err.response.data.message) 
                }
                if(err.response.status === 401){
                    setLoading(false)
                    return toast.error(err.response.data.message)      
                }
                if(err.response.status === 404){
                    setLoading(false)
                    return toast.error(err.response.data.message)
                }
                else{
                     setLoading(false)
                     return toast.errors(err.message)
                }
             }

         }
     })   

  return (
    <div className='container-fluid p-0'>
         <div className='container p-0 d-flex justify-content-center align-items-center' style={{ height:'100vh'}}>
              <div className='shadow custom border b-2 p-4 d-flex flex-column gap-3'> 
                     <div>
                         <h4 className='text-primary fst-italic text-center'>Login Form</h4>
                     </div>
                     <form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
                         <div>
                            <label className='form-label'>Email Address</label>
                            <input type='email' placeholder='Email Address' className='form-control' name='email' value={values.email} onChange={handleChange} />
                            { errors.email  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.email}</p>}

                         </div>
  
                         <div className='' style={{position:"relative"}}>
                            <label className='form-label'>Password</label>
                            <input type={passTog?'text':'password'} placeholder='Password'  className='form-control'  name='password' value={values.password} onChange={handleChange}/>
                            <div className='' style={{position:"absolute", top:'1.7rem' , right:'1rem'}}>
                                {
                                     passTog ?
                                     <button className='btn fs-4' style={{ border:'transparent' }} onClick={()=>setPassTog(false)} ><i class="bi bi-eye"></i></button>
                                     :
                                     <button className='btn fs-4' style={{border:'transparent'}}  onClick={()=>setPassTog(true)} ><i class="bi bi-eye-slash"></i></button>
                                }
                            </div>
                         </div>
                        
                         <button className='btn bg-primary text-white border b-0 p-2 fw-bold' >
                         {
                                loading ? <div class="d-flex justify-content-center">
                                             <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                             </div>
                                           </div> :
                                 <h6>Login</h6>
                             }
                         </button>
                     </form>
                     <div className='text-center'>
                        <p className='fw-light'>Don't have an account?Click here<NavLink to='/register' className='text-primary'>Register</NavLink></p>
                     </div>
              </div>
         </div>
         <ToastContainer />
    </div>
  )
}

export default Login