//bootstrap navbar component
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import navbarLogo from '../../images/R.png';
import { verifyToken } from '../../util';


export default function Navbar(props) {
    let [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("token")) {
                let token = localStorage.getItem("token")
                let sessionInfo = await verifyToken(token)
                setIsLogged(sessionInfo.validation)
            }
        })();
    }, [])

    function closeSession() {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <a className="navbar-brand" href="http://localhost:3000/profile">  FastService</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isLogged ?
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Perfil</NavLink>
                            </li>
                            {localStorage.getItem("role") == "user" ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/searchservice">Buscar servicio</NavLink>
                                </li> : null
                            }

                        </ul> : null
                    }
                    <form className="d-flex">

                        {isLogged ?
                            <button onClick={closeSession} className="btn btn-outline-success" type="submit">Cerrar sesión</button>
                            :
                            <Link to={'/login'}> <button className="btn btn-outline-success" >Iniciar sesión</button> </Link>
                        }

                    </form>
                </div>
            </div>
        </nav>
    )
}
