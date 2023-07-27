import React from 'react';
import './App.css';
import Form from './Form.jsx';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './Edit';
import Details from './Details';
function App() {
  return (
<>
<ToastContainer />
<Router>
<Header />
<Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path ="/login" element= {<Login/>} />
  <Route exact path="/registration/" element= {<Form />} />
  <Route exact path="/edit/:id" element= {<Edit />} />
  <Route exact path="/details/:id" element={<Details/>} />
  </Routes>
</Router>
</>
  );
}

export default App;
