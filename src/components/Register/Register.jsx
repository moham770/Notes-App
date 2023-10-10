import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


export default function Register() {

const {handleRegister} = useContext(userContext)
const [isLoading,setIsLoading] =useState(false) 
const [errorMsg,setErrorMsg] =useState(false) 
const navigate = useNavigate()


async function register(values) {
  setIsLoading(true);
  try {
    await handleRegister(values);
      setIsLoading(false);
      navigate('/login');
  } catch (error) {
      setErrorMsg(error.response.data.msg)
    console.error(error);
    setIsLoading(false);
  }
}

const RegexPhone= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema=yup.object({
    name:yup.string().required('Name is required').max(10,'username must be less than 10 char').min(3,'username must be more than 3 char'),
    email:yup.string().email('email must be valid').required('email is required'),
    password:yup.string().matches(/^[A-z]/,'Password Must Start with Uppercase').required('password is required'),
    age:yup.number().min(18,'your age must be more than 18').max(60,'your age mus be less than 60').required('age is required'),
    phone:yup.string().matches(RegexPhone,'Please inter a valid number').required('phone is required')
  })



  const formik = useFormik({
    initialValues:{
    name:"",
    email:"",
    password:"",
    age:"",
    phone:""
    },validationSchema,
   
  
  })
  
  return <>
  <Navbar/>
  <section className='authSection'>
    <div className="container  vh-100 d-flex justify-content-center align-items-center">
      <div className="row text-center ">
        <div className="login-box mx-auto">
        <h4 className='text-white'>Create an account</h4>
        <p className='text-white'>Let's get started for free </p>
 
     <form onSubmit={formik.handleSubmit}>
     {errorMsg?<p className='text-danger'>{errorMsg}</p> :null}   
    <div className="user-box">
      <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
      <label>UserName</label>
      {formik.errors.name &&formik.touched.name ?<p className='text-danger M-0 text-start'>{formik.errors.name}</p>:null}
    </div>
    <div className="user-box">
      <input type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
      <label>UserEmail</label>
      {formik.errors.email &&formik.touched.email ?<p className='text-danger M-0 text-start'>{formik.errors.email}</p>:null}

    </div>
    <div className="user-box">
      <input type="password" name="password"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
      <label>Password</label>
      {formik.errors.password &&formik.touched.password ?<p className='text-danger M-0 text-start'>{formik.errors.password}</p>:null}

    </div>
    <div className="user-box">
      <input type="number" inputMode='numeric' name="age" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} />
      <label>Age</label>
      {formik.errors.age &&formik.touched.age ?<p className='text-danger M-0 text-start'>{formik.errors.age}</p>:null}

    </div>
    <div className="user-box">
      <input type="text" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
      <label>Phone</label>
      {formik.errors.phone &&formik.touched.phone ?<p className='text-danger M-0 text-start'>{formik.errors.phone}</p>:null}

    </div>

    <center>
    <a onClick={()=>{
      register(formik.values)
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
