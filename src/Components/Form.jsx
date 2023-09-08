import React, { useEffect, useState } from "react";
import "./Form.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Form({
  load,
  total,
  SetTotal,
  values,
  setValues,
  isEditable,
  setIsEditable,
}) {
  //  const[fname,setFname]=useState("");
  //  const[lname,setLname]=useState("");
  //  const[email,setEmail]=useState("");
  //  const[phone_number,setmobilenum]=useState("");
  //  const[Address,setAddress]=useState("");
  //  const[date_of_birth,setdob]=useState("");

  const [isSuccessful, setIsSuccessfull] = useState(false);

  const [ReadOnly, setReadOnly] = useState(false);
  // if(isEditable===true)
  // setReadOnly(true);

  // else
  // setReadOnly(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
  });

  const fnameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const phone_numberRegex = /(0|91)?[6-9][0-9]{9}/;
  const dobRegex =
    /(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]201[4-9]|20[2-9][0-9]/;

  useEffect(() => {
    load();
  });
  useEffect(() => {
    load();
    isEditable ? setReadOnly(true) : setReadOnly(false);
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // return;
    if (name === "first_name") setValues({ ...values, first_name: value });
    else if (name === "last_name") setValues({ ...values, last_name: value });
    else if (name === "email") setValues({ ...values, email: value });
    else if (name === "phone_number") {
      console.log("phone number", value);
      setValues({ ...values, phone_number: value });
    } else if (name === "address") setValues({ ...values, address: value });
    else setValues({ ...values, date_of_birth: value });
  };

  const navigate = useNavigate();
  const postData = async (e) => {
    e.preventDefault();
    console.log(values);
    if (
      errors.first_name !== "" ||
      errors.last_name !== "" ||
      errors.email !== "" ||
      errors.phone_number !== "" ||
      errors.address !== "" ||
      errors.date_of_birth !== "" ||
      validateEmail() === true ||
      validateFirstName() ===true||
      validateLastName()===true ||
      validateDOB()===true||
      validatePhoneNumber()===true
    ) {
      console.log("empty");
      return;
    } else if (isEditable === true) {
      setIsEditable(false);
      console.log("yes");
      await axios
        .put("http://localhost:8080/user/update/" + values.email, values)
        .then((res) => {
          // console.log("the data passed is", res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("SAve", values);
      await axios
        .post("http://localhost:8080/user/createUser", values)
        .then((res) => {
          // console.log("the data passed is", res.data);
        })
        .catch((err) => console.log(err));
    }
            setValues({first_name:""})
            setValues({last_name:""})
            setValues({email:""})
            setValues({phone_number:""})
            setValues({address:""})
            setValues({date_of_birth:""})
    navigate("/");
  };

  const validateFirstName = () => {
    if (values.first_name !== "") {
      const temp = values.first_name;

      if (fnameRegex.test(values.first_name) == false)
        setErrors({ ...errors, first_name: "enter a valid first name" });
      else setErrors({ ...errors, first_name: "" });
    } else setErrors({ ...errors, first_name: "Enter first name" });
  };

  const validateLastName = () => {
    if (values.Last_name !== "") {
      const temp = values.last_name;

      if (fnameRegex.test(values.last_name) == false) {
        setErrors({ ...errors, last_name: "enter a valid last name" });
      } else
        setErrors({
          ...errors,
          last_name: "",
        });
    } else setErrors({ ...errors, last_name: "enter the Last_name" });
  };
  const validateEmail = () => {
    load();
    console.log(total);
    if (values.email != null) {
      const temp = values.email;

      let flag = 0;
      if (emailRegex.test(temp)) {
        // if(total !== undefined){
        console.log(temp, "temp");
        for (let i = 0; total.length > 0 && i < total.length; i++) {
          if (temp === total[i].data) {
            setErrors({ ...errors, email: "user already exists" });
            flag = 1;
          }
        }
        // }
        if (flag == 0) setErrors({ ...errors, email: "" });
      } else {
        setErrors({ ...errors, email: "enter a valid email" });
      }
    } else setErrors({ ...errors, email: "enter the email" });
  };

  const validatePhoneNumber = () => {
    if (values.phone_number != null) {
      const temp = values.phone_number;

      if (phone_numberRegex.test(temp) !== false)
        setErrors({ ...errors, phone_number: "invalid phone Number" });
      else setErrors({ ...errors, phone_number: "" });
    } else setErrors({ ...errors, phone_number: "enter the phone_number" });
  };

  const validateDOB = () => {
    if (values.date_of_birth === null)
      setErrors({ ...errors, date_of_birth: "enter the date_of_birth" });
  };

  return (
    <div>
      <form className="register-form">
        <div className="formheader">
          <h2>User Details</h2>
          <Link to="/">
            {" "}
            <button className="closebtn">X</button>
          </Link>
        </div>
        firstname{" "}
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={values.first_name}
          onBlur={validateFirstName}
          onChange={handlechange}
          placeholder="Enter your first_name"
          data-testid="firstname"
        />
        <p data-testid="firstname-error">{errors.first_name}</p>
        last_name
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={values.last_name}
          onChange={handlechange}
          onBlur={validateLastName}
          placeholder="Enter your last_name"
          data-testid="lastname"
        />
        <p data-testid="lastname-error">{errors.last_name}</p>
        email{" "}
        <input
          type="text"
          id="email"
          name="email"
          value={values.email}
          onBlur={validateEmail}
          readOnly={ReadOnly}
          onChange={handlechange}
          placeholder="Enter your email"
          data-testid="email"
        />
        <p data-testid="email-error">{errors.email}</p>
        phone_number{" "}
        <input
          // value={+91}
          type="text"
          id="phone_number"
          value={values.phone_number}
          name="phone_number"
          onBlur={validatePhoneNumber}
          onChange={handlechange}
          placeholder="Enter your mobile number"
          maxLength={10}
          data-testid="phone_number"
        />
        <p data-testid="phonenumber-error">{errors.phone_number}</p>
        Date Of Birth
        <input
          type="Date"
          id="date_of_birth"
          name="date_of_birth"
          onBlur={validateDOB}
          onChange={handlechange}
          max={new Date().toISOString().split("T")[0]}
        />
        <p>{errors.date_of_birth}</p>
        Address
        <textarea
          id="address"
          name="address"
          value={values.address}
          onChange={handlechange}
          placeholder="Enter your Address"
          maxLength={50}
        />
        <p>{errors.address}</p>
        <button type="submit" onClick={postData} data-testid="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Form;
