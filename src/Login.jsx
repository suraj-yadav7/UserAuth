import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./contextAPI";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [loginData, setLoginData] = useState({})
    const [initialData, setInitialData]= useState('')
    const [navigateVal, setNavigateVal] = useState(false)
    const {handleLoginSmt,naviHome} = useGlobalContext()

    const handleLoginChng =(e)=>{
                setLoginData({...loginData, [e.target.name]:e.target.value})
    }
  
    
  const navigate = useNavigate()
  //navigating to home when all condition is satisfied in contextAPI(handleLoginSmt) and this function is called there.
  const handleNavigate =()=>{
    navigate("/")

  }

    useEffect(()=>{
        fetch("http://localhost:3001/users").then((response)=>{
            return response.json()
        }).then((result)=> setInitialData(result))
    },[])
  return (
    <>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={(e)=>handleLoginSmt(e,loginData,initialData,handleNavigate)}>
            <div className="card">
              <div className="card-header">
                <h2>Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    User Name <span className="errMsg">*</span>
                  </label>
                  <input type="text" className="form-control" name="username" onChange={handleLoginChng}></input>
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="errMsg">*</span>
                  </label>
                  <input type="password" className="form-control" name="password" onChange={handleLoginChng}></input>
                </div>
                <div className="card-footer"> <button type="submit" className="btn btn-primary">
                Register
              </button></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
