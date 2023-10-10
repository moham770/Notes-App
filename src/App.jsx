import { RouterProvider, createHashRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import UserContextProvider from "./context/UserContext"
import NoteContextProvider from "./context/NoteContext"
import { Toaster } from "react-hot-toast"






function App() {
  const router = createHashRouter([
    {path:'',element:<ProtectedRoute><Layout/></ProtectedRoute>,children:[
      {index:true , element:<Home/>}
    ]},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
  ])
  return <>
<UserContextProvider>
  <NoteContextProvider>
<RouterProvider router={router}/>
<Toaster/>
  </NoteContextProvider>
</UserContextProvider>



  </>
     

  
}

export default App
