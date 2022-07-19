import '../css/Form.css';
import '../css/Error.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native';
import { UserContext } from './UserContext';
import { useContext } from 'react';



export default function SignIn() {
    
    const [user, setUser] = useContext(UserContext);
    const [inputs, setInputs] = useState({});

    const [err, setErr] = useState('');

    var user_info = {
        username:'',
        email: '',
        meta: '',
        pwd: ''
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        user_info.username = inputs.username;
        user_info.email = inputs.email;
        user_info.pwd = inputs.pwd;
        user_info.meta = inputs.meta;
        setErr('');
        console.log(user_info);
        axios.post('http://localhost:3500/register', user_info)
        .then(response => {console.log(response.data); 
            setUser(prevUser => ({
                username: user_info.username,
                email: user_info.email
            }));
            user_info.pwd = '';
            console.log(user);
        })
        .catch(error => {
            if (error.response.status == 409) {
                setErr('This username or email already exists. Please choose another one');
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
        <div  className= "background">
            <form onSubmit={handleSubmit} className= "form-box">
                <h3>Create a new account in order to benefit all the advantages of our site  : </h3>
                <label id = "user"> Username :
                    <input type="text" id="inputUsername" size="30" name="username"  onChange={handleChange} /><br/>
                </label>
                <label id = "mail"> Email :
                    <input type="text" id="inputEmail"  name="email" onChange={handleChange} /><br/>
                </label>
                <label id = "pwd"> Metamask adress :
                    <input type="text" id="inputMeta" required minLength="4" maxLength="50" size="30" name="meta" onChange={handleChange} /><br/>
                </label>
                <label id = "pwd"> Password :
                    <input type="password" id="inputPwd" required minLength="4" maxLength="20" size="30" name="pwd" onChange={handleChange} /><br/>
                </label>
                <div className='btn'>
                    <Button onPress={handleSubmit} color="primary" title="Sign In" />
                </div>
                { err &&
                    <div className="error"> { err } 
                </div> }
            </form>
        </div>    
    )
}
