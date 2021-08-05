import React,{useState} from 'react'
import axios from 'axios';
import "./register.css"
const Register = () => {
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://mern-stack-jwt.herokuapp.com/register',data).then(
            res => {alert(res.data);setData({
                username:'',
                email:'',
                password:'',
                confirmpassword:''
            })}
        )

    }
    return (
        <div>
            <div class="container1">
            <form class="needs-validation"  novalidate onSubmit={submitHandler} autocomplete="off">
                 <center>
                <div class="form-row  " >
                     
                        
                
            <center><h3>REGISTER</h3></center>
                <input class="form-control" id="validationCustom01" type="text" onChange={changeHandler} name="username" placeholder="User Name" required /><br />
                <input class="form-control"  id="validationCustom01" type="email" onChange={changeHandler} name="email" placeholder="Email" required /><br />
                <input  class="form-control" id="validationCustom01" type="password" onChange={changeHandler} name="password" placeholder="Password" required /><br />
                <input class="form-control"  id="validationCustom01" type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" required/><br />
                <input   class="form-control" type="submit" value="Register" /><br />
               
              
                </div>
                </center>
            </form>
            </div>
        </div>
    )
}

export default Register
