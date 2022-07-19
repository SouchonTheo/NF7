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
        oldPwd: '',
        newPwd: ''
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        user_info.username = user.username;
        user_info.email = user.email;
        user_info.oldPwd = inputs.oldPwd;
        if (inputs.pwd == inputs.pwdConfirm) {
            user_info.newPwd = inputs.pwd;
        } else {
            console.log("passwords differrent");
        }
        console.log("user_info", user_info);
        axios.put('http://localhost:3500/users/pwd', user_info)
        .then(response => {user_info.pwd = ''; console.log("Password changed for the user : ", user_info);}) 
        .catch(error => { 
            if (error.response.status == 401) {
                setErr('Wrong password');
                console.log("wrong password", error.response);
            } else if (error.response.status == 400) {
                setErr('The two passwords must be identical');
                console.log("The two passwords must be identical", error.response);
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
            <h3>CHANGE PASSWORD</h3>    
            <label id = "old"> Old password :
                <input type="password" id="inputOld" required minLength="4" size="30" name="oldPwd" value={inputs.oldPwd || ""} onChange={handleChange} /><br/>
            </label>
            <label id = "pwd"> New password :              
                <input type="password" id="inputPwd" required minLength="4" maxLength="20" size="30" name="pwd"  value={inputs.pwd || ""} onChange={handleChange} /><br/>
            </label>
            <label id = "pwd"> Confirm new password :              
                <input type="password" id="confirmPwd" required minLength="4" maxLength="20" size="30" name="pwdConfirm"  value={inputs.pwdConfirm || ""} onChange={handleChange} /><br/>
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