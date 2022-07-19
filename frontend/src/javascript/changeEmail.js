import '../css/Form.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native';
import { UserContext } from './UserContext';
import { useContext } from 'react';


export default function ChangeEmail() {
    
    const [inputs, setInputs] = useState({});
    const [user, setUser] = useContext(UserContext);

    const [err, setErr] = useState('');


    var user_info = {
        username:'',
        email: '',
        pwd: ''
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        user_info.username = user.username;
        user_info.email = inputs.email;
        user_info.pwd = inputs.pwd;
        axios.put('http://localhost:3500/users/email', user_info)
        .then(response => {user_info.pwd = ''; setUser(prevUser => (user_info));console.log("new information on the user : ", user_info); }) 
        .catch(error => {
            if (error.response.status == 401) {
                setErr('Wrong password');
                console.log("Wrong password : ", user_info);
            } else  if (error.response.status == 409) {
                setErr('This email adress is already in use. Please choose another one');
                console.log("User already exists !", error.response.status);
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
            <h3>CHANGE EMAIL</h3>    
            <label id = "user"> New email :
                <input type="text" id="inputEmail" required minLength="4" size="30" name="email" value={inputs.email || ""} onChange={handleChange} /><br/>
            </label>
            <label id = "pwd"> Password :              
                <input type="password" id="inputPwd" required minLength="4" maxLength="20" size="30" name="pwd"  value={inputs.pwd || ""} onChange={handleChange} /><br/>
            </label>
            <div className='btn'>
                <Button class="btn" color="primary" onPress={handleSubmit} title="Confirm" />
            </div>{ err &&
                    <div className="error"> { err } 
                </div> }
            </form>
        </div>    
    )
}