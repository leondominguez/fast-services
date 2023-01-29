import './App.css';
import Login from './components/Login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from './components/Register/UserRegister';
import Profile from './components/Profile/Profile';
import SearchService from './components/SearchService/SearchService';
import SelectWorker from './components/SelectWorker/SelectWorker';
import EditProfile from './components/EditProfile/EditProfile';
import { useEffect, useState } from 'react';
import { verifyToken } from './util';
import NotFound from './components/NotFound/NotFound';
import LoginOrRegister from './views/loginOrRegister';
import Navbar from './components/Nav/Navbar';
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    (async () => {

      if (localStorage.getItem('token')) {
        const tokenVerified = await verifyToken(localStorage.getItem("token"));

        if (tokenVerified.validation) {
          setIsLogged(true);
          
        }
        
      }
      setIsLoading(false);
    })();
  }, [])

  return (
    <div className="App">
       
      { isLogged ?
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchservice" element={<SearchService />} />
          <Route path="/selectworker" element={<SelectWorker />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path='*' element={<Navigate to='/profile' />} />

        </Routes>
        : <>
        {isLoading ? <h1>Cargando...</h1> : <LoginOrRegister />}
        
        </>
      }


    </div>
  );
}

export default App;