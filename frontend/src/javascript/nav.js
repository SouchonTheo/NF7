import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import { useContext } from 'react';



 function NotLoggedOptions() {
  const [user, setUser] = useContext(UserContext);
    return (
    <ul className="nav-links">
      <li>
        <Link to="/allNFTs">All NFTs</Link>
      </li>
      <li>
        <Link to="/login">Log in/Sign in</Link>
      </li>
    </ul>
  );
}

  function LoggedOptions() {
    const [user, setUser] = useContext(UserContext);
    return (
      <ul className="nav-links">
        <li>
          <Link to="/allNFTs">All NFTs</Link>
        </li>
        <li>
          <Link to="/userGallery">Your Gallery</Link>
        </li>
        <li>
          <Link to="/mint">Mint your NFT</Link>
        </li>
        <li>
          <Link to="/account">Account ({user.username})</Link>
        </li>
      </ul>
    );
  }


export default function Navbar() {
  const [user, setUser] = useContext(UserContext);
  var isLoggedIn = ! user.username == '';
  return (
    <div>
      <nav>
        <div className="logo">
            <Link to="/">NF7</Link>
        </div>
        {isLoggedIn
        ? <LoggedOptions/>
        : <NotLoggedOptions/>
        }
        <div className="nav-bar">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
        <script src="script.js"></script>
      </nav>
    </div>
  )
}