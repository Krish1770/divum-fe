import "./ForgetPassword.css"
function ForgetPassword()
{
    return(
         <div >

         <form className="forgetPwd-form">
          <div className="header">
            <h2>Reset Password</h2>
          </div>
           <label htmlFor="">New Password</label>
           <input 
           type="text"
           id="password1"
           name="password1"
          //  placeholder="En"
          />

           <label htmlFor="">Re-Enter Password</label>
           <input 
           type="text"
           id="password2"
           name="password2"
          //  placeholder="En"
          />

          <button>submit</button>
          </form>
        
         </div>

    )
}

export default ForgetPassword;