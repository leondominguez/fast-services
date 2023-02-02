import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import userLogoProfile from '../../images/user.png'
import { apiLink, getServices, getUser, putService } from '../../util'
import '../Profile/Profile.css'
import React from 'react'
import axios from 'axios'

export default function Profile(props) {
    let [services, setServices] = React.useState([])
    let states = ["Pendiente", "Aceptado", "Rechazado", "Finalizado"]
    let [user, setUser] = React.useState({})
    useEffect(() => {
        (async () => {
            let reqServices = await getServices()
            setServices(reqServices)
            let us = await getUser(localStorage.getItem("id"))
            setUser(us)

        })();
    }, [])

    function logOut() {
        localStorage.removeItem("token")
        window.location.reload()
    }

    function finishService(id, state) {
        putService(id, { state: state })
        window.location.reload()
    }


    return (
        <div className="cuerpoPerfil">
            <div className="contenedorNombreLogo">
                <h1>{user?.name}</h1>
                <img className="userLogoProfile" src={userLogoProfile} alt="User" />
                <p>{user?.address}</p>
            </div>
            <div className="contenedorPrincipal">
                <div className="row">
                    <div className="cell">Servicios en proceso</div>
                </div>
                <div className="row">
                    <div className="contenedorServicioEnProceso">
                        <div> Precio por hora | Horas |  Estado</div>
                        {services.map((service, index) => {
                            return (
                                <div className="servicioEnProceso" key={index}>
                                    <div style={{ color: 'white' }}>{service.description}...... {service.hours}.....{states[service.state - 1]}</div>
                                    {localStorage.getItem("role") == "user" && service.state < 3 ?
                                        <><i onClick={() => finishService(service.id, 4)} className='badge bg-info' >Pagar servicio </i>
                                        </> : <> {service.state ==1 ?
                                            <><i onClick={() => finishService(service.id, 3)} className='badge bg-info'>Rechazar servicio </i>
                                                <i onClick={() => finishService(service.id, 2)} className='badge bg-info'>Aceptar servicio </i></>
                                            :
                                            <i onClick={() => finishService(service.id, 3)} className='badge bg-info'>Cancelar servicio </i>}</>

                                    }
                                </div>
                            )
                        })}


                    </div>

                </div>
                <div className="row">

                    <div className="contenedorCerrarSesion">
                        <Link to="/searchservice"><button className='cell'>Pedir Servicios</button></Link> 
                        <button onClick={logOut} className="cell">Cerrar sesión</button>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}