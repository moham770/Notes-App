import React, { useContext, useEffect } from 'react'
import style from './Home.module.css'
import { getAllNotes, showModalAddNote } from '../../utils/note'
import { userContext } from '../../context/UserContext'
import { noteContext } from '../../context/NoteContext'
import Note from '../Note/Note'
import Loading from '../Loading/Loading'


export default function Home() {
  const {token}=useContext(userContext)
  const {notes,setNotes} = useContext(noteContext)
  


  useEffect(()=>{
    getAllNotes(token,setNotes)
  },[])



  
  return <>
      <section >
      <div className="container my-3">
        <div className={`d-flex align-items-center justify-content-between ${style.notes}`}>
          <div className="d-flex align-items-center">
      <i className="fa-solid text-main fa-note-sticky fs-4 mx-1"></i>
       <h2 className={` `}>My Notes</h2>
          </div>
         <button onClick={()=>{showModalAddNote({token ,updater:setNotes})}} type="button" className={style.button+' mb-1'}>
           <span className={style.button__text}>Add Item</span>
           <span className={style.button__icon}><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className={style.svg}><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
        </div>
          <div className="row g-0 my-2">
            {notes ==null ? <Loading/> :notes.length==0 ?<h2 className='my-2 text-main text-center h1'>No Notes Found</h2>: notes.map((note,index)=>{
          return <Note number={index} key={note._id} noteArray={note} />
        }) }
  </div>
      


      </div>
      </section>
  
  
  </>
       
}
