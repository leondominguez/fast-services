import { Link } from "react-router-dom";

export default function NotFound(props) {
    return (
        <div>
        <h1>Página no encontrada</h1>
            <h2 ><Link className="boton" to={'/login'} >Iniciar sesión</Link></h2>
        </div>
    )
}