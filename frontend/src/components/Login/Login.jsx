import React from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import userLogo from '../../images/user.png'
import { apiLink, postSession } from "../../util"

export default function Login(params) {
    let [input, setInput] = React.useState({
        email: "",
        password: "",
        role:"user"
    })
    let [loading, setLoading] = React.useState(false)
    useEffect(() => {
        localStorage.setItem("role", "user")
    }, [])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function changeRole(e) {
        let newrole = input.role=="user"?"worker":"user"
        localStorage.setItem("role", newrole)
        setInput({
            ...input,
            role: newrole
        })
    }
    let spanishRole = input.role=="user"? "usuario":"trabajador"
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let sessionInfo = await postSession(input)
        
        if (sessionInfo.msg) {
            alert(sessionInfo.msg)
        }
        if (sessionInfo.token) {
            localStorage.setItem("token", sessionInfo.token)
            let id =sessionInfo.id?sessionInfo.id:sessionInfo.phone
            localStorage.setItem("id", id)
            window.location.reload()
        }
        setLoading(false)


    }


    return (
        <div className="cuerpoApp">
            <h1>Estas iniciando sesión como {spanishRole} </h1>
             <button className="boton" onClick={changeRole}>Soy {spanishRole=='usuario'?'trabajador':'usuario'}</button>
            <p className="text">Bienvenido a la Aplicacion</p>
            <form className="login">
                <input value={input.email} type="text" onChange={handleChange} placeholder="Correo" name='email' />
                <input value={input.password} onChange={handleChange} type="password" placeholder="Contraseña" name='password' />
                {loading ?
                    <div className="loading">Cargando..</div>
                    : <button onClick={handleSubmit} className="iniciarSesion">Iniciar Sesion</button>}
            </form>
            <button  className="registrarse"><Link to={'/UserRegister'}><p>Registrarme como Usuario</p></Link></button>
            <button  className="registrarse"><Link to={'/WorkerRegister'}><p>Registrarme como Trabajador</p></Link></button>
        </div>
    )
}