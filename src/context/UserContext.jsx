import axios from "axios";
import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {

const [token,setToken]= useState(localStorage.getItem('token'))



  async function handleRegister(values) {
    try {
      const res = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  }

  async function handelLogin(values) {
    try {
      const res = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        values
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  function logout(){
    localStorage.clear()
    setToken(null)
  }

  return (
    <userContext.Provider value={{ handleRegister,handelLogin ,setToken,token,logout}}>
      {children}
    </userContext.Provider>
  );
}
