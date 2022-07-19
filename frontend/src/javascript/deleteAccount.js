import '../css/Form.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native';
import { UserContext } from './UserContext';
import { useContext } from 'react';


export default function ChangeUsername() {
    
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
        user_info.email = user.email;
        user_info.pwd = inputs.pwd;
        console.log("user_info qui vont etre envoyés",user_info);
        axios.post('http://localhost:3500/users/delete', user_info)
        .then(response => {user_info.pwd = ''; console.log("Account correctly deleted"); window.location.assign("/");}) 
        .catch(error =>  {
            if (error.response.status == 401) {
            setErr('Wrong password');
            console.log("wrong password", error.response);
        } else {
            setErr(error.response.data.message);
            console.error('There was an error!', error.response);
        };});
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <div className= "background">
            <form className= "form-box">
            <h3>Are you sure you want to delete your account ?</h3>    
            <label id = "pwd"> Enter your password :              
                <input type="password" id="inputPwd" required minLength="4" maxLength="20" size="30" name="pwd"  value={inputs.pwd || ""} onChange={handleChange} /><br/>
            </label>
            <div className='btn'>
                <Button class="btn" color="primary" onPress={handleSubmit} title="Confirm" />
            </div>
            { err &&
                    <div className="error"> { err } 
                </div> }
            </form>
        </div>    
    )
}