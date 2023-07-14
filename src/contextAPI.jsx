import { useContext,createContext,useReducer } from "react";
import { reducer } from "./reducer";

const AppContext=createContext()

const initial ={
    name:"",
    address:'',
}

const AppProvider = ({children})=>{
const [state, dispatch] = useReducer(reducer, initial)

const addUser = (data)=>{
    dispatch({
        type:"addUser",
        payload:data
    })
}

return(
    <AppContext.Provider value={{...state,addUser}}>{children}</AppContext.Provider>
    )
}

//Custom hook to provide appContext and useContext

const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export{useGlobalContext,AppProvider}