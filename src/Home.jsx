import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./contextAPI";

const Home = () => {
  // initial userdata
  const [userData, setUserData] = useState("");

  // storing search values when user type
  const [searchVal, setSearchVal] = useState("");

  //this sort value is only useful to reset options when clicked reset
  const [sortVal, setSortVal] = useState("");

  //Managing pagination values
  const [currentPage, setCurrentPage] = useState(0);

  //limiting the user data per page
  const [pageLimit] = useState(4);

  const arrOptions = ["id", "gender", "email", "phone"];

  //Imp value used as univeral variable to perform diff task like sort,search, filter
  const [allVall, setAllVal] = useState("");

  //used to perform switch case functionality
  const [operation, setOperation] = useState("");

  // global context
  const { removeUser } = useGlobalContext();

  // initial Fetching data
  const fetchData = (start, end, increment, optnType, sortFilterVal) => {
    console.log(
      "start:" + start,
      "end:" + end,
      "increment:" + increment,
      "operation:" + optnType,
      "values:" + sortFilterVal
    );
    switch (optnType) {
      case "search": {
        setAllVal(sortFilterVal);
        setOperation(optnType);
        fetch(
          `http://localhost:3001/users?q=${sortFilterVal}&_start=${start}&_end=${end}`
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setUserData(result);
            setCurrentPage(currentPage + increment);
          })
          .catch((error) =>
            console.log("error while filtering user data", error)
          );
        break;
      }
      case "filter": {
        setAllVal(sortFilterVal);
        setOperation(optnType);
        fetch(
          `http://localhost:3001/users?status=${sortFilterVal}&_start=${start}&_end=${end}`
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setCurrentPage(currentPage + increment);
            setUserData(result);
          })
          .catch((error) =>
            console.log("Error while filtering user data", error)
          );
        break;
      }
      case "sort": {
        setAllVal(sortFilterVal);
        setOperation(optnType);
        fetch(
          `http://localhost:3001/users?_sort=${sortFilterVal}&_order=asc&_start=${start}&_end=${end}`
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setCurrentPage(currentPage + increment);
            setUserData(result);
          })
          .catch((error) =>
            console.log("Error while sorting user data", error)
          );
        break;
      }
      case "reset": {
        setSearchVal("");
        setSortVal("");
        setAllVal("");
        setOperation("");
        fetch(`http://localhost:3001/users?_start=${start}&_end=${end}`)
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setUserData(result);
            setCurrentPage(currentPage + increment);
          })
          .catch((error) =>
            console.log("error while fetching user data", error)
          );
        break;
      }
      default:
        console.log("default cases run delete function");
        fetch(`http://localhost:3001/users?_start=${start}&_end=${end}`)
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setUserData(result);
            setCurrentPage(currentPage + increment);
          })
          .catch((error) =>
            console.log("error while fetching user data", error)
          );
    }
  };

  // checking initial data at global level
  // console.log("initla data", userData ,"allvalues:"+allVall,"operation:"+operation)

  // Handling Search
  const handleSearch = (val) => {
    fetchData(0, 4, 0, "search", val);
  };

  // Handling sort
  const handleSort = (eachSortVal) => {
    setSortVal(eachSortVal);
    fetchData(0, 4, 0, "sort", eachSortVal);
  };

  // Handling filter
  const handleFilter = (filtVal) => {
    fetchData(0, 4, 0, "filter", filtVal);
  };

  // handle pagination
  const Pagination = () => {
    if (userData.length < 4 && currentPage === 0) return null;
    if (currentPage == 0) {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                {currentPage + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => fetchData(4, 8, 1, operation, allVall)}
              >
                next
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (currentPage < pageLimit - 1 && userData.length == pageLimit) {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() =>
                  fetchData(
                    (currentPage - 1) * 4,
                    currentPage * 4,
                    -1,
                    operation,
                    allVall
                  )
                }
              >
                Prev
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                {currentPage + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() =>
                  fetchData(
                    (currentPage + 1) * 4,
                    (currentPage + 2) * 4,
                    1,
                    operation,
                    allVall
                  )
                }
              >
                next
              </a>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() =>
                  fetchData(
                    (currentPage - 1) * 4,
                    currentPage * 4,
                    -1,
                    operation,
                    allVall
                  )
                }
              >
                Prev
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                {currentPage + 1}
              </a>
            </li>
            {/* <li className="page-item"><a className="page-link" href="#" onClick={()=> fetchData((currentPage+1)*4,(currentPage+2)*4,1)}>next</a></li> */}
          </ul>
        </nav>
      );
    }
  };

  //Navigating to edit page
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(0, 4, 0);
  }, []);

  return (
    <>
      <div className="container">
        <div className="searchField">
          <div className="filterBtn" style={{ display: "flex" }}>
            <p className="pt-1">Filter by:</p>
            <button
              className="btn btn-success mx-1"
              value="active"
              onClick={(e) => handleFilter(e.target.value)}
            >
              Active{" "}
            </button>
            <button
              className="btn btn-danger mx-1"
              value="inactive"
              onClick={(e) => handleFilter(e.target.value)}
            >
              InActive
            </button>
            <button
              className="btn btn-dark mx-1"
              onClick={() => fetchData(0, 4, 0, "reset")}
            >
              Reset{" "}
            </button>
          </div>
          <div id="toolbar" style={{ display: "flex" }}>
            <span className="p-1">Sort:</span>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="form-control"
              value={sortVal}
            >
              <option value="">Select value 🔽</option>
              {arrOptions.map((elem, index) => {
                return (
                  <option key={index} value={elem}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-group " style={{ width: "300px" }}>
            <input
              type="search"
              className="form-control rounded"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="search user"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleSearch(searchVal)}
            >
              search
            </button>
          </div>
        </div>
        <div className="card" >
          <div className="card-title">
            <h2>User List</h2>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
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
                {userData &&
                  userData.map((elem, index) => (
                    <tr key={elem.id}>
                      <td>{index + 1}</td>
                      <td>{elem.id} </td>
                      <td>{elem.name} </td>
                      <td>{elem.gender}</td>
                      <td>{elem.email} </td>
                      <td>{elem.mobileNo} </td>
                      <td>{elem.address}</td>
                      <td>{elem.status}</td>
                      <td>
                        <a
                          className="btn btn-success"
                          onClick={() => navigate(`/edit/${elem.id}`)}>
                          Edit
                        </a>
                        <a
                          className="btn btn-danger"
                          onClick={() => removeUser(elem, elem.id, fetchData)}
                        >
                          Remove
                        </a>
                        <a
                          className="btn btn-primary"
                          onClick={() => navigate(`/details/${elem.id}`)}
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="paginationContainer">{<Pagination />}</div>
      </div>
    </>
  );
};
export default Home;
