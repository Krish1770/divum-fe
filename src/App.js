import React, { useEffect, useState } from "react";
import Form from "./Components/Form";
import "./App.css";
import ViewTable from "./Components/ViewTable";
import ForgetPassword from "./Components/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login";

function App() {
  // const[fname,setFname]=useState("");
  // const[lname,setLname]=useState("");
  // const[email,setEmail]=useState("");
  // const[mobilenum,setmobilenum]=useState("");
  // const[Address,setAddress]=useState("");
  // const[dob,setdob]=useState("");

  const [total, setTotal] = useState([]);

  const load = async () => {
    const temp = await axios.get("http://localhost:8080/user/getUsers");
    // console.log("Load ", temp.data);
    setTotal(temp.data);
  };
  const [isEditable, setIsEditable] = useState(false);

  const [logDetails, setLogDetails] = useState({
    email: "",
    password: "",
  });

  const[isAdmin,setIsAdmin]=useState(false);
  const setLogFormDetails = (name, value) => {
    setLogDetails({ ...logDetails, [name]: value });
  }
    
  const [isDeletable, setIsDeletable] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
  });


  const [isEdit, setIsEdit] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ViewTable
              values={values}
              setValues={setValues}
              isEditable={isEditable}
              load={load}
              total={total}
              setTotal={setTotal}
              isDeletable={isDeletable}
              setIsDeletable={setIsDeletable}
              setIsEditable={setIsEditable}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        <Route
          exact
          path="/Login"
          element={
            <Login
              logDetails={logDetails}
              setLogFormDetails={setLogFormDetails}
              setLogDetails={setLogDetails}
              setIsAdmin={setIsAdmin}

            />
          }
        />
        <Route
          path="/view"
          element={
            <ViewTable
              values={values}
              setValues={setValues}
              isEditable={isEditable}
              isDeletable={isDeletable}
              setIsDeletable={setIsDeletable}
              setIsEditable={setIsEditable}
            />
          }
        />

<Route
          path="/forgot"
          element={
            <ForgetPassword/>
          }
        />

        <Route
          path="/form"
          element={
            <Form
              values={values}
              setValues={setValues}
              isEditable={isEditable}
              setIssEditable={setIsEditable}
              load={load}
              setTotal={setTotal}
              total={total}
              setIsEditable={setIsEditable}
              isDeletable={isDeletable}
              setIsDeletable={setIsDeletable}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
        
}

export default App;
