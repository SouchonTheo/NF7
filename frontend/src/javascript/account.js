import '../css/Account.css';
import '../css/Form.css';

import { Link } from "react-router-dom";
import { Button } from 'react-native';
import { UserContext } from './UserContext';
import { useContext } from 'react';


export default function Account() {
    const [user, setUser] = useContext(UserContext);
    const LogOut = (event) => {
        console.log('log out');
        setUser(prevUser => ({
            username:'',
            email: '',
        }))
        window.location.assign("/");
    }
    return (
        <section className="container">
            <h2> Hi {user.username} !</h2>
            <h1>Here you can see the parameters of your account</h1>
            <ul>
                <li>Username : {user.username} <br/>
                <Link className="linkchange" to="/changeUsername">Change your username</Link>
                 </li>
                <li>Email : {user.email} <br/>
                <Link className="linkchange" to="/changeEmail">Change your email</Link>
                </li>
                <Link className="linkchange" to="/changepwd">Change your password</Link>
                <Link className="linkchange" to="/deleteAccount">Delete your account</Link>

            </ul>
            <div className="btn">
                <Button onPress={LogOut} color="primary" title="Log out" />
            </div>
        </section>
    )
}