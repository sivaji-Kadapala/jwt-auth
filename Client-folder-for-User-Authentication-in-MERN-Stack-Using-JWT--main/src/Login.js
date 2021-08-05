import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from './App';
import { Redirect } from 'react-router';
import "./login.css"
const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://mern-stack-jwt.herokuapp.com/login',data).then(
            res => setToken(res.data.token)
        )
    }
    if(token){
       return <Redirect to='/myprofile' />
    }
    return (
        <div>
            <center>
            <form class="needs-validation" novalidate onSubmit={submitHandler} autocomplete="off">
              <div class="form-row" >
                      <center><h3>LOGIN</h3></center>
                <input type="email" class="form-control" id="validationCustom01" onChange={changeHandler} name="email" placeholder="Email" required  /><br />
                <input type="password"  class="form-control" id="validationCustom01"  onChange={changeHandler} name="password" placeholder="Password" required/><br />
                <input type="submit" value="Login" /><br />
                </div>
            </form>
            </center>
        </div>
    )
}

export default Login
