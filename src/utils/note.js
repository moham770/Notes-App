import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"



export function showModalAddNote({token,updater}){
    Swal.fire({
        title: 'Add Note ❤️',
     html:`
     <input name='title' id="title" type='text' placeholder="Enter a Title" class="form-control"/>
     <textarea name='content' id="content" style="min-height: 100px;" class="form-control mt-2" placeholder="Enter Your Description"></textarea>
     `,
        showCancelButton: true,
        confirmButtonText: 'ADD',
        showLoaderOnConfirm: true,
        preConfirm: () => {
        const title=document.getElementById('title').value
        const content=document.getElementById('content').value

        return {title,content }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {

        addNoteToApi(result.value,token,updater)
     
      })
}



async function addNoteToApi(values,token ,updater){
const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{
    headers:{
        token:`3b8ny__${token}`
    }
}).catch((err)=>{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.msg,
      })
   })

if(data.msg==='done'){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Note Added Succefully',
        showConfirmButton: false,
        timer: 1000
  
    })  
    getAllNotes(token,updater)
}
}




export async function getAllNotes(token ,updater){
    try {
        const {data}= await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
        headers:{
            token:`3b8ny__${token}`
        }
    })
    updater(data.notes)
    } 
    catch (error) {
    if(error.response.data.msg ==='not notes found'){
        updater([])
       
    } 

     
    }
    
}


// ******************************************************
export  function showDeleteModal(id,token,updater){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteNoteFromApi(id,token,updater)
          Swal.fire(
            'Deleted!',
            'Your Note has been deleted.',
            'success'
          )
        }
      })

}


async function deleteNoteFromApi(id,token,updater){
    try {
        const {data}= await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
            headers:{
                token:`3b8ny__${token}`
            }
        })

        getAllNotes(token,updater)
      
    } catch (error) {
       
    }

}





// ******************************************************
export function showModalUpdate(titlevalue,contentvalue,id,token,updater){

    Swal.fire({
        title: 'Update Note 📝',
     html:`
     <input name='title' id="title" type='text' placeholder="Enter a Title" class="form-control" value="${titlevalue}"/>
     <textarea name='content' id="content" style="min-height: 100px;" class="form-control mt-2" placeholder="Enter Your Description">${contentvalue}</textarea>
     `,
        showCancelButton: true,
        confirmButtonText: 'UPDATE',
        showLoaderOnConfirm: true,
        preConfirm: () => {
        const title=document.getElementById('title').value
        const content=document.getElementById('content').value
        return {title,content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        updateNote(id,token,result.value,updater)
       
      })
    
}


async function updateNote(id,token,values,updater){
    try {
        const {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,values,{
            headers:{
                token:`3b8ny__${token}`
            }
        })
        getAllNotes(token,updater)
        toast.success('Note Updated Succefully')
       
    } catch (error) {
        
    }
}


































