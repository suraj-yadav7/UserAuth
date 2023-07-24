import React, { useEffect, useState } from 'react'

const Home = () => {
  const [userData, setUserData] = useState("")
  const [searchVal, setSearchVal]=useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit] = useState(4)

  // initial Fetching data
  const fetchData = (start,end, increment)=>{
    fetch(`http://localhost:3001/users?_start=${start}&_end=${end}`).then((response)=>{
      return response.json()
    }).then((result)=>{
      setUserData(result)
      setCurrentPage(currentPage+increment)
    }).catch((error)=> console.log("error while fetching user data", error))
  }

  // Handling Search 
const handleSearch = (val)=>{

  fetch(`http://localhost:3001/users?q=${val}`).then((response)=>{
    return response.json()
  }).then((result)=>{
    setUserData(result)
  }).catch((error)=> console.log("error while filtering user data", error))
  setSearchVal('')
}

// Handling sort
const handleSort = (sortVal)=>{
  fetch(`http://localhost:3001/users?_sort=${sortVal}&_order=asc`).then((response)=>{
    return response.json()
  }).then((result)=> {
    console.log("sort result", result)
    setUserData(result)}).catch((error)=> console.log("Error while sorting user data", error))
}

// Handling filter
const handleFilter = (filtVal)=>{
  fetch(`http://localhost:3001/users?status=${filtVal}`).then((response)=>{
    return response.json()
  }).then((result)=> {
    console.log("filter result", result)
    setUserData(result)}).catch((error)=> console.log("Error while filtering user data", error))
}

// handle pagination
const Pagination = ()=>{
  if(currentPage == 0){
    return(
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">{currentPage+1}</a></li>
          <li class="page-item"><a class="page-link" href="#" onClick={()=> fetchData(4,8,1)}>next</a></li>
        </ul>
      </nav>  
    )
  }
  else if(currentPage < pageLimit-1 && userData.length == pageLimit){
    return(
      <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#" onClick={()=>fetchData((currentPage -1)*4, (currentPage)*4, -1)}>Prev</a></li>
      <li class="page-item"><a class="page-link" href="#">{currentPage+1}</a></li>
      <li class="page-item"><a class="page-link" href="#" onClick={()=> fetchData((currentPage+1)*4,(currentPage+2)*4,1)}>next</a></li>
    </ul>
  </nav>
      )
    }
  else{
    return(
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#" onClick={()=>fetchData((currentPage -1)*4, (currentPage)*4, -1)}>Prev</a></li>
        <li class="page-item"><a class="page-link" href="#">{currentPage+1}</a></li>
        {/* <li class="page-item"><a class="page-link" href="#" onClick={()=> fetchData((currentPage+1)*4,(currentPage+2)*4,1)}>next</a></li> */}
      </ul>
    </nav>
    )
  }
}
const handleReset = (start,end)=>{
  fetch(`http://localhost:3001/users?_start=${start}&_end=${end}`).then((response)=> {
    return response.json()}).then((result)=> {
      setUserData(result)
      setCurrentPage(0)
    })
}
  useEffect(()=>{
fetchData(0,4,0)
  },[])
  return (
    <>
    <div className='container'>
    </div>
      <h1>Welcome to home</h1>
      <div className='container'>
        
      <div className='searchField'>
        <div className='filterBtn' style={{display:"flex"}}>
            <p className='pt-1' >Filter by:</p>
          <button className='btn btn-success mx-1' value="active" onClick={(e)=>handleFilter(e.target.value)}>Active </button>
          <button className='btn btn-danger mx-1' value="inactive" onClick={(e)=>handleFilter(e.target.value)}>InActive</button>
          <button className='btn btn-dark mx-1'  onClick={()=> handleReset(0,4)}>Reset </button>
        </div>
        <div id="toolbar" style={{display:"flex"}}>
        <span className='p-1'>Sort:</span>
        <select onChange={ (e)=>handleSort(e.target.value)} class="form-control">
            <option value="">Select value 🔽</option>
            <option value="id">Id</option>
            <option value="gender">Gender</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
        </select>
      </div>
      <div class="input-group "  style={{width: "300px"}}>
         <input type="search" class="form-control rounded" value={searchVal }onChange={(e)=>setSearchVal(e.target.value)} placeholder='search user' aria-label="Search" aria-describedby="search-addon" />
          <button type="button" class="btn btn-outline-primary" onClick={()=>handleSearch(searchVal)}>search</button>
    </div>
        {/* <input for="sarchBtn" type='search' value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} placeholder='type-gender-status' /><span><button id="sarchBtn" className='btn btn-info' onClick={()=>handleSearch(searchVal)}>Search</button></span> */}
        </div>
        <div className='card'>
            <div className='card-title'>
                <h2>User List</h2>
        {/* <div ><Link className='btn btn-success' to={"/employee/create"}>Add (+)</Link></div> */}
            </div>
            <div className='card-body'>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <td>S.No</td>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Gender</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Address</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                        <tbody>
                                {
                                    userData && userData.map((elem,index)=>(
                                        <tr key = {elem.id}>
                                        <td>{index+1}</td>
                                        <td>{elem.id} </td>
                                        <td>{elem.name} </td>
                                        <td>{elem.gender}</td>
                                        <td>{elem.email} </td>
                                        <td>{elem.mobileNo} </td>
                                        <td>{elem.address}</td>
                                        <td>{elem.status}</td>
                                        <td>
                                            <a className='btn btn-success' onClick={()=> navigate(`employee/edit/${elem.id}`)}>Edit</a>
                                            <a className='btn btn-danger' onClick={()=>handleRemove(elem.id)}>Remove</a>
                                            <a className='btn btn-primary' onClick={()=>navigate(`/employee/details/${elem.id}`)}>Details</a>
                                             </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                </table>
            </div>
        </div>
        <div className='paginationContainer'>
          {<Pagination/>}
        </div>
      </div>
    </>
  )
}
export default Home
