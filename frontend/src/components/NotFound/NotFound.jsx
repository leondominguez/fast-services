import { Link } from "react-router-dom";

export default function NotFound(props) {
    return (
        <div>
        <h1>Mande::::Alguien te necesita   Alguien te puede ayudar</h1>
            <h2 ><Link className="boton" to={'/login'} >Iniciar sesión</Link></h2>
        </div>
    )
}