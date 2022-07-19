import { useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = props => { 
    const [user, setUser] = useState(
        {
            username: '',
            email: '',
        }
    )
    
    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}