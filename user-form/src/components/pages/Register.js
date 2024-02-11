import React, { useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import { formValidation } from '../validationForm/formValidation'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Register = () => {
   
    const [passTog , setPassTog] = useState(false)
    const [repassTog, setRePassTog] = useState(false) 
    const [valid , setValid] = useState(false)
    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()
    
    const initialState = {
           email:"",
           username:"",
           phonenumber:"",
           password:"",
           repassword:""
    }

     const {  values , errors ,  handleChange , handleSubmit } = useFormik({
         initialValues:initialState,
         validationSchema:formValidation,
         onSubmit : async (data)=>{
               setLoading(true)
               try{
                  const result = await axios.post(`${process.env.REACT_APP_HOST}/api/register` , data)
                  
                  if(result.status === 201){
                         setLoading(false)
                         toast.success(result.data.message)
                         navigate('/login')
                  }
               }
               catch(err){
            
                  if(err.response.status === 403){
                      setLoading(false)
                      return toast.error(err.response.data.message)      
                  }
                  else{
                      setLoading(false)
                      return toast.error(err.message)
                  }
               }

            }
     })   

  return (
    <div className='container-fluid p-0'>
         <div className='container p-0 d-flex justify-content-center align-items-center' style={{ height:'100vh'}}>
              <div className='shadow custom border b-2 p-4 d-flex flex-column gap-3'> 
                     <div>
                         <h4 className='text-primary fst-italic text-center'>Register Form</h4>
                     </div>
                     <form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
                         <div>
                            <label className='form-label'>Email Address</label>
                            <input type='email' placeholder='Email Address' className='form-control' name='email' value={values.email} onChange={handleChange} />
                            { valid && errors.email  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.email}</p>}
                         </div>
                         <div>
                            <label className='form-label'>User Name</label>
                            <input type='text' placeholder='User Name'  className='form-control' name='username' value={values.username} onChange={handleChange}/>
                            { valid && errors.username && <p className='m-0 p-0 text-danger fw-lighter'>{errors.username}</p>}
                         </div>
                         <div>
                            <label className='form-label'>Phone Number</label>
                            <input type='number' placeholder='Phone Number' className='form-control' name='phonenumber' value={values.phonenumber} onChange={handleChange}/>
                            {  valid && errors.phonenumber && <p className='m-0 p-0 text-danger fw-lighter'>{errors.phonenumber}</p>}
                         </div>
                         <div className='' style={{position:"relative"}}>
                            <label className='form-label'>Password</label>
                            <input type={passTog?'text':'password'} placeholder='Password'  className='form-control'  name='password' value={values.password} onChange={handleChange}/>
                             <p className="p-0 m-0 fw-lighter ms-3" style={{ fontSize:'0.7rem'}}>Example:Test@1</p>
                            { valid && errors.password && <p className='m-0 p-0 text-danger fw-lighter'>{errors.password}</p>}
                            <div className='' style={{position:"absolute", top:'1.7rem' , right:'1rem'}}>
                                {
                                     passTog ?
                                     <button className='btn fs-4' style={{ border:'transparent' }} onClick={()=>setPassTog(false)} ><i class="bi bi-eye"></i></button>
                                     :
                                     <button className='btn fs-4' style={{border:'transparent'}}  onClick={()=>setPassTog(true)} ><i class="bi bi-eye-slash"></i></button>
                                }
                            </div>
                         </div>
                         <div style={{position:'relative'}}>
                            <label className='form-label'>ReEnter-Password</label>
                            <input type={repassTog?'text':'password'} placeholder='ReEnter-Password' className='form-control' name='repassword' value={values.repassword} onChange={handleChange} />
                            {  valid && errors.repassword && <p className='m-0 p-0 text-danger fw-lighter'>{ errors.repassword }</p>}
                            <div style={{position:"absolute", top:'1.7rem' , right:'1rem'}}>
                                {
                                     repassTog ?
                                     <button className='btn fs-4' style={{ border:'transparent' }} onClick={()=>setRePassTog(false)} ><i class="bi bi-eye"></i></button>
                                     :
                                     <button className='btn fs-4' style={{border:'transparent'}}  onClick={()=>setRePassTog(true)} ><i class="bi bi-eye-slash"></i></button>
                                }
                            </div>
                         </div>
                         <button className='btn bg-primary text-white border b-0 p-1 mt-2 fw-bold' onClick={()=>setValid(true)}>
                             {
                                loading ? <div class="d-flex justify-content-center">
                                             <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                             </div>
                                           </div> :
                                 <h6>Register</h6>
                             }
                         </button>
                     </form>
                     <div className='text-center'>
                        <p className='fw-light'>Already have account?Click here<NavLink to='/login' className='text-primary'>Login</NavLink></p>
                     </div>
              </div>
         </div>
            <ToastContainer />
    </div>
  )
}

export default Register