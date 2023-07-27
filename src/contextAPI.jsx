import { useContext,createContext,useReducer } from "react";
import { reducer } from "./reducer";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AppContext=createContext()

const initial ={
    navilogin:"",
    naviRegt:'',
    naviHome:false,
}

const AppProvider = ({children})=>{
const [state, dispatch] = useReducer(reducer, initial)

const addUser = (data)=>{
    dispatch({
        type:"addUser",
        payload:data
    })
}

const isValidate = (userData)=>{
    let proceedVal=true
    let errMsg = "please enter value in the"
    if(userData.username==null || userData.username==""){
        proceedVal=false
        toast.warning(errMsg+" username field")
    }
    if(userData.password == null || userData.password==""){
        proceedVal=false
        toast.warning(errMsg+" password field")
    }
    if(userData.name == null || userData.name==""){
        proceedVal=false
        toast.warning(errMsg+" fullname field")
    }
    if(userData.email == null || userData.email==""){
        proceedVal=false
        toast.warning(errMsg+" email field")
    }
    if(userData.mobileNo == null || userData.mobileNo==""){
        proceedVal=false
        toast.warning(errMsg+" mobile number field")
    }
    if(userData.address == null || userData.address==""){
        proceedVal=false
        toast.warning(errMsg+" address field")
    }
    if(userData.gender == null || userData.gender==""){
        proceedVal=false
        toast.warning(errMsg+" gender field")
    }

    return proceedVal
}

const handleSubmit = (e,userData)=>{
    console.log("handle submit post method context run")
    e.preventDefault()
    let validationReult = isValidate(userData)
    if(validationReult){
    fetch("http://localhost:3001/users",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(userData)
    }).then((res)=>{
      toast.success("Registration Successfully")
    }).catch((err)=>console.log("Error while posting user data in server",err))
}
  }

  const isValidateLogin = (userData)=>{
    let proceedVal=true
    let errMsg = "please enter value in the"
    if(userData.username==null || userData.username==""){
        proceedVal=false
        toast.warning(errMsg+" username field")
    }
    if(userData.password == null || userData.password==""){
        proceedVal=false
        toast.warning(errMsg+" password field")
    }
    return proceedVal
}

    const handleLoginSmt = (e,loginData,initialData,handleNavigate)=>{
        e.preventDefault()
        let callValidateLogin= isValidateLogin(loginData)
        console.log("login in context api", typeof(loginData.username), loginData.username)

        if(callValidateLogin){
        let userId=initialData.filter((elem)=> elem.username == loginData.username && elem.password == loginData.password)
        console.log("filter id data", userId, userId.length)
        
        if(userId.length>=1){
        fetch("http://localhost:3001/users/"+userId[0].id).then((response)=>{
            return response.json()
        }).then((result)=>{
            console.log("fetch login result", result)
        }).catch((error)=>{
            console.log("error to fetch login userdata", error)
        })
        toast.success("Login Successful")
        handleNavigate()
    }
    else{
        toast.warning("Provide Correct Credintials")
    }
    }
    }
    const removeUser =(userData,userId,fetchData)=>{
        fetch(`http://localhost:3001/users/${userId}`,{
            method:"DELETE",
            headers:{
                "content-type":"application-json"
            },
        }).then((response)=>{
            if(response.status == 200){
                toast.success("User is successfully deleted")
                fetchData(0,4,0)
                return response.json()
            }
            else{
                toast.warning("user data doesn't match")
            }
        }).catch((err)=>console.log("Error occured while deleting user", err))
    }

return(
    <AppContext.Provider value={{...state,addUser,handleSubmit,isValidate,handleLoginSmt,removeUser}}>{children}</AppContext.Provider>
    )
}

//Custom hook to provide appContext and useContext
const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export{useGlobalContext,AppProvider}