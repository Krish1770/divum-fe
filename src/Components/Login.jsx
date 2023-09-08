import { Link,useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useEffect, useState } from "react";


function Login({ logDetails, setLogFormDetails,isAdmin,setIsAdmin}) {


     const [loginErrors,setLoginErrors]=useState("");
  const navigate=useNavigate();
  const checkForLogin = (e) => {
   setLogFormDetails(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(logDetails);
     if(logDetails.email && logDetails.password)
     {
        console.log("yes");
      const res = await axios.post("http://localhost:8080/user/login",logDetails);
      console.log(res.data);

      

     const status= (Object.values(res.data))[2].status;

     const role=(Object.values(res.data))[2].role;
        console.log(role);

        // useEffect(() => {
          if(role==="admin")
          setIsAdmin(true)
          else
          setIsAdmin(false)
        // }
        // )
      


   if(res.status==200)
   {
    
    navigate("/")
   }

       
      
    }

     
  };

  return (
    <div>
      <form className="LoginForm">
        <div className="header">
          <h2>Login</h2>
        </div>
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={logDetails.email}
          placeholder="Enter your email"
          onChange={checkForLogin}
        />
        Password
        <input
          type="text"
          id="password"
          name="password"
          value={logDetails.password}
          placeholder="Enter your password"
          onChange={checkForLogin}
        />
        <div className="buttons">
          <div className="LoginSubmit">
            <button onClick={handleSubmit}>submit</button>
            <button>forget Password</button>
          </div>
      
          <div className="signup">
            new user?
            <Link to="/form">
            <button>signup</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
