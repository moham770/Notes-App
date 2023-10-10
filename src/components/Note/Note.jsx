import React, { useContext } from 'react'
import style from './Note.module.css'
import { userContext } from '../../context/UserContext'
import { showDeleteModal, showModalUpdate } from '../../utils/note'
import { noteContext } from '../../context/NoteContext'

export default function Note({noteArray,number}) {

const {token}= useContext(userContext)
const {notes,setNotes} = useContext(noteContext)



  return <>
    <div className="col-md-4 col-sm-6  border border-2 my-3 h-100">
  
      <div className={style.header}>
      <h2 className={` h5 text-center text-white fw-bolder`}> {number+1}</h2>
      </div>
       <p className={`fw-bold  m-0  ${style.title}`}>{noteArray.title}  </p>
      <p className='p-1 lead fs-5  d-flex flex-wrap overflow-x-auto'>{noteArray.content}</p>

      <div className={style.footer}>
        <i onClick={()=>{
          showDeleteModal(noteArray._id,token,setNotes)
     
        }} className='fas fa-trash-can cursor-pointer mx-2 fs-5'></i>
        <i onClick={()=>{
          showModalUpdate(
            noteArray.title,
            noteArray.content,
            noteArray._id,
            token,
            setNotes
          )
        }} className="fa-regular fa-pen-to-square cursor-pointer mx-2 fs-5"></i>
      </div>
    </div>
  </>
       
}
