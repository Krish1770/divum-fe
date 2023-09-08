import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import "./ViewTable.css";
// import Display from "./Display";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ViewTable({
  load,
  total,
  setTotal,
  values,
  setValues,
  isAdmin,
  isEditable,
  setIsEditable,
  checkForAdmin,
  isDeletable,
  setIsDeletable,
}) {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [email, setEmail] = useState("");
  const getData = async () => {
    const res = await axios.get("http://localhost:8080/user/getUsers");
    setdata(res.data.content);
    // console.log(res.data, "data");
    // console.log(res, "axios data");
    console.log(res.data.content, "data");
  };

  const changePopup = () => {
    isDeletable === true ? setIsDeletable(false) : setIsDeletable(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div id="Tablepage" className="Tablepage opacity-1">
        <div className="Top-Bar">
          <img src="Divum_Logo_Color(1).png" alt="grfhgrfrh" />
          <h1>Table Details</h1>
          <Link to="/form">
            {" "}
            <button type="reset" className="addbutton" data-testid="addbutton">
              Add User 
            </button>
          </Link>
        </div>

        <table className="list" id="user_list">
          <thead>
            <tr>
              <th>First_name</th>
              <th>Last_name</th>
              <th>Email</th>
            
              <th>phone_number</th>
              <th>Date_of_birth</th>
             {isAdmin===true && <th>Actions</th>}
            </tr>
            {data.map((datas) => (
              <tr>
                <td>{datas.first_name}</td>
                <td>{datas.last_name}</td>
                <td>{datas.email}</td>
              
                <td>{datas.phone_number}</td>
                <td>{datas.date_of_birth}</td>
               { isAdmin===true &&  <td className="actionbtns">
                  <AiOutlineEdit
                    onClick={() => {
                      setValues(datas);
                      setIsEditable(true);
                      navigate("/form");
                    }}
                  />
                  {/* <button> */}
                  <AiOutlineDelete
                    onClick={() => {
                      console.log("hello");
                      setEmail(datas.email);
                      setIsDeletable(true);
                    }}
                  />
                  {/* </button> */}
                </td>}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      {isDeletable === true && (
        <div className="confirm-popup">
          <div className="background-opacity"></div>
          <div className="alert">
            <p>Are you sure to delete the given user</p>
            <div className="confirmbuttons">
              <button
                onClick={async () => {
                  await axios
                    .delete("http://localhost:8080/user/delete/" + email)
                    .then((res) => {
                      // console.log("the data passed is", res.data);
                    })
                    .catch((err) => console.log(err));
                  getData();
                  setIsDeletable(false);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeletable(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTable;
