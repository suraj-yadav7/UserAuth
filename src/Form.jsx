import React, { useState } from "react";
import { useGlobalContext } from "./contextAPI";

const Form = () => {
  const [userData, setUserData] = useState({})
  const {handleSubmit} =useGlobalContext()
  const handleChange =(e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
  }

  // console.log("state value", userData)
  return (
    <>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={(e)=>{handleSubmit(e,userData)}}>
          <div className="card">
            <div className="card-header">
              <h1>Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name <span className="errMsg">*</span>
                    </label>
                    <input className="form-control" name="username" onChange={handleChange} ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errMsg">*</span>
                    </label>
                    <input type="password" className="form-control" name="password" onChange={handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name<span className="errMsg">*</span>
                    </label>
                    <input type="text" className="form-control" name="name" onChange={handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errMsg" >*</span>
                    </label>
                    <input type="email" className="form-control" name="email" onChange={handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Mobile Number<span className="errMsg">*</span>
                    </label>
                    <input type="number" className="form-control" name="mobileNo" onChange={handleChange}></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errMsg">*</span>
                    </label>
                    <select className="form-control" name="country" onChange={handleChange}>
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
                    <textarea className="form-control" name="address" onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Gender
                    </label>
                    <br/>
                    <input type="radio" className="app-check" value="male" name="gender" onChange={handleChange}/>
                    <label>Male</label>
                    <input type="radio" className="app-check" value="female" name="gender" onChange={handleChange}/>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Form;
