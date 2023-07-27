import React, { useEffect, useState } from 'react'
import Form from './Form'
import { useParams } from 'react-router-dom'

const Edit = () => {
    const userId = useParams()
    console.log("user id in edit", userId.id)
    const [userData, setUserData] = useState("")
    const fetchingUserData = ()=>{
        fetch(`http://localhost:3001/users/${userId.id}`).then((response) =>{
            return response.json()
        }).then((result) => {
            setUserData(result)     
            console.log("user data inital",result)
        }
            ).catch((error) =>console.log("error while fetching userData", error))
        }
    useEffect(()=>{
        fetchingUserData()
    },[])
  return (
    <>
    <Form key={userData.id} id={userId.id} data={userData} valTrue={true}/>
    </>
  )
}

export default Edit
