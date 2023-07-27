import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./contextAPI";
import {toast } from 'react-toastify';


const Form = ({id, data,valTrue}) => {
  console.log("username", data)
  const [userData, setUserData] = useState({})

  const [userUpdateData, setUserUpdateData]=useState(data? data :"")

  const {handleSubmit} =useGlobalContext()
  const handleChange =(e)=>{
    console.log("first handle change runned")
    setUserData({...userData, [e.target.name]:e.target.value})
  }

console.log("update value:", userUpdateData)
const hadleUpdateChange =(e)=>{
  console.log("handle update change", userUpdateData)
  setUserUpdateData({...userUpdateData, [e.target.name]:e.target.value})
}

  const updateUserData = (e)=>{
    console.log("updated clicked")
    e.preventDefault()
    fetch(`http://localhost:3001/users/${id}`,
    {
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(userUpdateData)
    }
    ).then((response) =>{
      console.log("the put response", response)
      if(response.status == 200){
        toast.success("UserData Updated Successfull")
      }
      else{
        toast.warning("Userdata ID don't match")
      }
      return response.json()
    }).then((result)=> {

    }).catch((err)=> console.log("error while updating userdata: ", err))  
  }
  useEffect(()=>{
    setUserUpdateData(data)
  },[])

  // console.log("state value", userData)
  return (
    <>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={userUpdateData ? (e)=>updateUserData(e,userUpdateData): (e)=>{handleSubmit(e,userData)}}>
          <div className="card">
            <div className="card-header">
              {
                userUpdateData ? <h1>Update User Details</h1> : <h1>Registration</h1>
              }
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name <span className="errMsg">*</span>
                    </label>
                    <input className="form-control" name="username" value={userUpdateData && userUpdateData.username}  onChange={userUpdateData?hadleUpdateChange:handleChange} ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errMsg">*</span>
                    </label>
                    <input type="password" className="form-control" disabled={valTrue?true:false} name="password" onChange={handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name<span className="errMsg">*</span>
                    </label>
                    <input type="text" className="form-control" name="name" value={userUpdateData && userUpdateData.name}  onChange={userUpdateData?hadleUpdateChange:handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errMsg" >*</span>
                    </label>
                    <input type="email" className="form-control" name="email" value={userUpdateData && userUpdateData.email}  onChange={userUpdateData?hadleUpdateChange:handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Mobile Number<span className="errMsg">*</span>
                    </label>
                    <input type="number" className="form-control" name="mobileNo" value={userUpdateData && userUpdateData.mobileNo}  onChange={userUpdateData?hadleUpdateChange:handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errMsg">*</span>
                    </label>
                    <select className="form-control" name="country" onChange={userUpdateData?hadleUpdateChange:handleChange}>
                      <option value="null">Select Country ▽</option>
                      <option value="india">INDIA</option>
                      <option value="usa">USA</option>
                      <option value="Russia">Russia</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Address (city)<span className="errMsg">*</span>
                    </label>
                    <textarea className="form-control" name="address" value={userUpdateData && userUpdateData.address}  onChange={userUpdateData?hadleUpdateChange:handleChange}></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Status
                    </label>
                    <br/>
                    <input type="radio" className="app-check" value="active" checked={userUpdateData && userUpdateData.status=="active"?true:null} name="status" onChange={userUpdateData?hadleUpdateChange:handleChange}/>
                    <label>Active</label>
                    <input type="radio" className="app-check" value="inactive" checked={userUpdateData && userUpdateData.status=="inactive"?true:null} name="status" onChange={userUpdateData?hadleUpdateChange:handleChange}/>
                    <label>InActive</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Gender
                    </label>
                    <br/>
                    <input type="radio" className="app-check" value="male" checked={userUpdateData && userUpdateData.gender=="male"?true:null} name="gender" onChange={userUpdateData?hadleUpdateChange:handleChange}/>
                    <label>Male</label>
                    <input type="radio" className="app-check" value="female" checked={userUpdateData && userUpdateData.gender=="female"?true:null} name="gender" onChange={userUpdateData?hadleUpdateChange:handleChange}/>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">{
              userUpdateData? <button type="submit" className="btn btn-dark">
              Update
            </button>:
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              }
            </div>
          </div>
        </form>
      </div>

    </>
  );
};
export default Form;
