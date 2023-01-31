import { Link } from 'react-router-dom';
import './WorkerRegister.css';
import { getJobs, postProfile } from '../../util';
import React from 'react';
import _ from 'lodash';

export function WorkerRegister() {
    let [jobs, setJobs] = React.useState([])
    let [selectedJobs, setSelectedJobs] = React.useState([])
    let [input, setInput] = React.useState({
        "phone": "",
        "name": " ",
        "address": "",
        "addressGps": null,
        "email": "",
        "password": "",
        role: "worker",
        "jobs": [
            // {
            //     "id": 1,
            //     "price": 14000
            // },
            // {
            //     "id": 2,
            //     "price": 30000
            // },
            // {
            //     "id": 3,
            //     "price": 30000
            // }
        ]
    })

    React.useEffect(() => {
        (async () => {
            let jobs = await getJobs()
            let uniquesJobs = _.uniqBy(jobs, function (e) {
                return e.title;
            });
            setJobs(uniquesJobs)
        })();
    }, [])

    function addJob(e) {
        //id, price
        let job = jobs.find(j => j.id == e.target.value)
        setSelectedJobs([...selectedJobs, job])
    }
    function editSelectedJobs(e) {
        let newSelectedJobs = selectedJobs.map(j => {
            if (j.id == e.target.id) {
                return { ...j, price: e.target.value }
            }
            return j
        })
        setSelectedJobs(newSelectedJobs)
        setInput({ ...input, jobs: newSelectedJobs })
        console.log(newSelectedJobs)
    }
    function handleOnChange (e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postProfile(input)
        alert('Verifica que puedes iniciar sesión')
        window.location.reload();
    }
    ///un html con un formulario de registro
    return (
        <div className="py-5">
            <form className="Registro">
                <h1 className ="textl">Registro de Trabajador</h1>
                <input onChange={handleOnChange} className="control" type="text" name="name" placeholder="Nombre Completo" />
                <input onChange={handleOnChange} className="control" type="email" name="email" placeholder="Correo Electronico" />
                <input onChange={handleOnChange} className="control" type="text" name="phone" placeholder="Telefono" />
                <input onChange={handleOnChange} className="control" type="text" name="address" placeholder="Direccion" />
                <input onChange={handleOnChange} className="control" type="password" name="password" placeholder="Contraseña" />
                <input className="control" type="password" name="contraseña" placeholder="Repetir Contraseña" />
                <select onChange={addJob} name='jobs' requeried className="control">
                    <option hidden>Seleccione varios trabajos</option>
                    {jobs.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}

                </select>
                {selectedJobs.map(job => <>
                    <span key={job.id}>{job.title}</span>
                    <input id={job.id} className='form-control' onChange={editSelectedJobs} placeholder='precio mayor 5000' type="number" /><br /></>)
                }
                <button onClick={handleSubmit} className="boton">Registrar</button>
                <p className="text"> <a href=""><Link to={'/login'}>Tengo una cuenta</Link></a> </p>
            </form>
        </div>
    )
}