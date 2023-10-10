import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userContext } from '../../context/UserContext'
import {  useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Login() {
  const {handelLogin,setToken} = useContext(userContext)
  const [isLoading,setIsLoading] =useState(false) 
  const [errorMsg,setErrorMsg] =useState(false) 
  const navigate = useNavigate()
  
  
  async function login(values) {
    setIsLoading(true);
    try {
     const data=  await handelLogin(values);
        setIsLoading(false);
        console.log(data.token)
        setToken(data.token)
        localStorage.setItem('token',data.token)
        navigate('/');
    } catch (error) {
        setErrorMsg(error.response.data.msg)
        setIsLoading(false);
      console.error(error);
    
    }
  }
  
  
    let validationSchema=yup.object({
      email:yup.string().email('email must be valid').required('email is required'),
      password:yup.string().matches(/^[A-z]/,'Password Must Start with Uppercase').required('password is required'),
    })
  
  
  
    const formik = useFormik({
      initialValues:{
      email:"",
      password:"",
    
      },validationSchema,
     
    
    })
    
    return <>
    <Navbar/>

    <section className='authSection'>
      <div className="container  vh-100 d-flex justify-content-center align-items-center">
        <div className="row text-center ">
         
          <div className="login-box mx-auto">
          <h4 className='text-white '>Login</h4>
   
       <form onSubmit={formik.handleSubmit}>
       {errorMsg?<p className='text-danger'>{errorMsg}</p> :null}   
     
      <div className="user-box ">
        <input type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
        <label>UserEmail</label>
        {formik.errors.email &&formik.touched.email ?<p className='text-danger M-0 text-start'>{formik.errors.email}</p>:null}
  
      </div>
      <div className="user-box">
        <input type="password" name="password"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
        <label>Password</label>
        {formik.errors.password &&formik.touched.password ?<p className='text-danger M-0 text-start'>{formik.errors.password}</p>:null}
      </div>
      <center>
      <a onClick={()=>{
        login(formik.values)
      }} className='cursor-pointer'>
          {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "SEND"}   
         <span></span>
      </a></center>
    </form>

  </div>
          
          
           </div>
        </div>
  
      </section>
    </>
       
}
