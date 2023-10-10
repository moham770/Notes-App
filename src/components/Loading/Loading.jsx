import React from 'react'
import style from './Loading.module.css'

export default function Loading() {
  return <>
      <div className=' my-5 d-flex align-items-center justify-content-center'>
      <div className={style.loader}>
    <span>Loading...</span>
</div>  
      </div>
  
  </>
       
}
