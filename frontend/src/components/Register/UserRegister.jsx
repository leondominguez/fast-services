import { Link } from 'react-router-dom';
import './UserRegister.css';
import React from 'react';
import { postProfile } from '../../util';
import { useNavigate } from 'react-router-dom';


    

export function UserRegister() {
    let [input, setInput] = React.useState(
        {
            "email": "",
            "password": "",
            "addressGps": null,
            "phone": "",
            "name": "",
            "address": "",
            "paymentMethod": "1",
            "cardNumber": "",
            role: "user"
        })
    let [errors, setErrors] = React.useState(
        {
            email: ""
        }
    )
    const navigate = useNavigate();
      

        function handleChange(e) {
            console.log({
                ...input,
                [e.target.name]: e.target.value
            })
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }


        async function  onSubmit(e) {
            e.preventDefault();
            console.log(input);
            await postProfile(input);
 
           alert('Verifica que puedes iniciar sesión')
        //    window.location.reload();


        }
    ///un html con un formulario de registro
    return (
        <div className="cuerpoRegistro">
        <form className="Registro">
            <h1>Registro de Usuario</h1>
            <input onChange={handleChange} className="control" type="text" name="name" placeholder="Nombre Completo"/>
            <input onChange={handleChange} className="control" type="email" name="email" placeholder="Correo Electronico"/>
            <input onChange={handleChange} className="control" type="text" name="phone" placeholder="Telefono"/>
            <input onChange={handleChange} className="control" type="text" name="address" placeholder="Direccion"/>
            <select onChange={handleChange} name='paymentMethod' className="control">
                <option hidden>Metodo de pago</option>
                <option value={'1'}>Tarjeta de credito</option>
                <option value={'2'}>Tarjeta de debito</option>
            </select>
            <input onChange={handleChange}  className="numeroCuenta" type="text" name="cardNumber" placeholder="Numero de cuenta"/>
            
            <input onChange={handleChange} className="control" type="password" name="password" placeholder="Contraseña"/>
            <input className="control" type="password" name="password2" placeholder="Repetir Contraseña"/>
            <button onClick={onSubmit} className="boton">Registrar</button>
            <p > <a href=""><Link to={'/login'}>tengo una cuenta</Link></a> </p>
        </form>
        </div>

    )
}


