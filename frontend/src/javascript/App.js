import '../css/App.css';
import Navbar from './nav'
import Mint from './mint'
import Home from './home'
import AllNFTs from './allNFTs'
import UserGallery from './userGallery'
import Login from './log'
import SignIn from './signIn';
import Account from './account';
import ChangeUsername from './changeUsername';
import ChangeEmail from './changeEmail';
import ChangePwd from './changePwd';
import DeleteAccount from './deleteAccount';
import { UserProvider } from './UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <UserProvider>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allNFTs' element={<AllNFTs />} />
          <Route path='/mint' element={<Mint />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userGallery' element={<UserGallery />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/account' element={<Account />} />
          <Route path='/changeUsername' element={<ChangeUsername />} />
          <Route path='/changeEmail' element={<ChangeEmail/>} />
          <Route path='/changePwd' element={<ChangePwd/>} />
          <Route path='/deleteAccount' element={<DeleteAccount/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserProvider>
  );
}

export default App;
