import '../css/Form.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native';
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import { useContext } from 'react';


export default function Log() {
    
    const [inputs, setInputs] = useState({});
    const [user, setUser] = useContext(UserContext);

    const [err, setErr] = useState('');

    var user_info = {
        username:'',
        email: '',
        pwd: ''
      };

    const handleSubmit = (event) => {
        //event.preventDefault();
        if (inputs.user.includes("@")) {
            user_info.username = '';
            user_info.email = inputs.user;
        } else {
            user_info.username = inputs.user;
            user_info.email = '';
        }
        user_info.pwd = inputs.pwd;
        setErr('');
        axios.post('http://localhost:3500/auth', user_info)
        .then(response => {
            user_info.pwd = '';
            setUser(prevUser => ({
                username: response.data.user_info.username,
                email: response.data.user_info.email,
                pwd:''
            }));
            console.log("user that logged in : ",user);
        }) 
        .catch(error => {
            console.error('There was an error!', error);
            if (error.response.status == 401) {
                setErr('Wrong password');
            } else {
                setErr(error.response.data.message);
                console.error('There was an error!', error.response.status);
            }});
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <div className= "background">
            <form className= "form-box">
            <h3>LOG IN</h3>    
            <label id = "user"> Username / email :
                <input type="text" id="inputUser" required minLength="4" size="30" name="user" value={inputs.user || ""} onChange={handleChange} /><br/>
            </label>
            <label id = "pwd"> Password :              
                <input type="password" id="inputPwd" required minLength="4" maxLength="20" size="30" name="pwd"  value={inputs.pwd || ""} onChange={handleChange} /><br/>
            </label>
            <div className='btn'>
                <Button class="btn" color="primary" onPress={handleSubmit} title="Log in" />
            </div>
            { err &&
                    <div className="error"> { err } 
                </div> }
            <Link className="link" to="/signIn">Create your own account</Link>
            </form>
        </div>    
    )
}