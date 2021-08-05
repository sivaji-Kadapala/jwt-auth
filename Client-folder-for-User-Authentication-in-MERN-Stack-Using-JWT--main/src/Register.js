import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})//values are assigned
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
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
            <center>
            <form onSubmit={submitHandler} autocomplete="off">
                <h3 style={{color:"black"}}>Register</h3>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name" /><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" /><br />
                <input type="submit" value="Register" style={{backgroundColor:"blue",color:"white"}}/><br />
            </form>
            </center>
        </div>
    )
}

export default Register
