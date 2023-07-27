import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const [userDetails, setUserDetails] = useState("")
    const empId = useParams()
    useEffect(()=>{
        fetch(`http://localhost:3001/users/${empId.id}`).then((response)=> {
            return response.json()
        }).then((result) => {
            setUserDetails(result)
            console.log("result in details", result)}).catch((err)=>console.log("error occured while fetching user detals", err))
    },[])
  return (
    <>
    {userDetails && 
      <div className="detailsContainer">
        <h2 >User Details</h2>
        <div class="card" style={{"width": "20rem"}}>
          <div class="card-body">
            <h3 class="card-title" style={{textAlign:"center"}}>{userDetails.username}</h3>
            <h5 class="card-subtitle mb-2 text-body-secondary">
             Full name: {userDetails.name}
            </h5>
        
            <div class="card" style={{"width": "18rem"}}>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Gender : {userDetails.gender}</li>
                <li class="list-group-item">Status : {userDetails.status}</li>
                <li class="list-group-item">Phone No: {userDetails.mobileNo}</li>
                <li class="list-group-item">Mail Id : {userDetails.email}</li>
                <li class="list-group-item">Address: {userDetails.address} {userDetails.country}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default Details;
