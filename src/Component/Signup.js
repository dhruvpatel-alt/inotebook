import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const check=(passwordhere)=>{
    let checkPassword=true;
    var y = passwordhere;
    if (y.length < 5) {
      checkPassword=false;
    }
    if (y.search[/a-z/i] < 1) {
      checkPassword=false;
    }
    if (y.search[/A-Z/i] < 1) {
      checkPassword=false;
    }
    if (y.search[/0-9/] < 1) {
      checkPassword=false;
    }
  
return checkPassword;  }
    let history=useNavigate(); 
    const [credentials,setCredentials]=useState({name:"",cpassword:"",email:"",password:""});
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        };
    const handleSubmit=async (e)=>{
        const host="http://localhost:5000";
e.preventDefault();
const response = await fetch(`${host}/api/auth/createuser`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
        },
 body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  const json =await response.json();
  if(json.success){
    //redirect
    localStorage.setItem("token",json.token);
    localStorage.setItem("success",json.success);
    props.showalert("Account created Successfully","success");
    history('/');
  }

  else if(json.already){
    props.showalert("Email already exists","warning");
  }
  else{
    props.showalert("Invalid Credentials","danger");
  }
    }
    return (
        <div className="container my-3">
          <h2 className="container my-4">SignUp for using  iNotebook</h2>
        <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label forhtml="name" className="form-label">Enter Your Name</label>
  <input type="text" className="form-control" value={credentials.name} id="name" name="name"  onChange={onChange}/>
</div>
<div className="mb-3">
  <label forhtml="email" className="form-label">Email address</label>
  <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange}/>
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label forhtml="password" className="form-label">Password</label>
  <input type="password" name="password" value={credentials.password} id="password" className="form-control" minLength={5} onChange={onChange} required/>
  <small style={{color:check(credentials.password)?'green':'red'}}>Password must be atleast contain 5 letters and should have atleast a digit(0-9), lowercase(a-z) & Uppercase(A-Z). </small>
</div>
<div className="mb-3">
  <label forhtml="cpassword" className="form-label">Confirm Password</label>
  <input type="password" name="cpassword" value={credentials.cpassword} id="cpassword" className="form-control" minLength={5} onChange={onChange} required/>
  <small style={{color:credentials.password!==credentials.cpassword?'red':'black'}}>Confirm password should match password.</small>
</div>

<button type="submit" className="btn btn-primary" disabled={!check(credentials.password)||credentials.name<1||credentials.password!==credentials.cpassword}>Sign Up</button>
</form>
      </div>
    )
}

export default Signup
