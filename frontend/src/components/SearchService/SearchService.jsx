import { useEffect } from "react"
import { useState } from "react"
import { getJobs, getWorkersFiltered, postRequest } from "../../util"
import _ from "lodash"

export default function SearchService(props) {
    let [jobs, setJobs] = useState([])
    let [jobSelected, setJobSelected] = useState(false)
    let [loading, setLoading] = useState(false)
    let [reqdUsers, setReqdUsers] = useState(false)
    let [theJob, setTheJob] = useState({})
    let [workers, setWorkers] = useState([])
    let [input, setInput] = useState({
        date: "",
        "date":"2022-08-18T04:41:16.061Z",
        "payment":323223,
        "state": 1, //1-pending, 2-accepted, 3-rejected, 4-finished
        "rating":4,
        "hours":2,
        "jobId": 0,
        "userPhone": localStorage.getItem("id"),
        "workerId": 0,
        description: ""
    })

    useEffect(() => {
        (async () => {
            let reqJobs = await getJobs()
            let uniquesJobs = _.uniqBy(reqJobs, function (e) {
                return e.title;
            });
            setJobs(uniquesJobs)
        })();
    }, [])

    
    function selectJob(e) {

        let theJob = jobs.find(j => j.id == e.target.value)
        setInput({...input, jobId: theJob.id})
        setTheJob(theJob)
        setJobSelected(true)

    }


    async function getWorkers() {
        setReqdUsers(true)
        setLoading(true)
        let wrs = await getWorkersFiltered(theJob.id)

        setWorkers(wrs)
        setLoading(false)

    }

    function onsubmit(e) {
        e.preventDefault()
        setInput({...input, workerId: e.target.value})
        console.log({...input, workerId: e.target.value});
        setLoading(true)
        postRequest({...input, workerId: e.target.value})

        alert("Solicitud enviada, espera que te la acepten")
        window.location.reload()
        
    }
    return (
        <div className="container">
            <h1>Busca el trabajador que necesitas</h1>
            {reqdUsers ? <>
                {loading ? <div className="spinner-border text-primary" role="status"></div>
                    : <div>
                        <h3>lista de usuarios</h3>
                        {workers.map(wr =>

                            <div  key={wr.id} className="card my-2">
                                <div className="card-header">
                                    {wr.name}
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>Precio {wr.price}</p>
                                        <footer className="blockquote-footer">Dirección: {wr.address} <button onClick={onsubmit} value={wr.id} className="btn btn-info">Escoger</button></footer>
                                    </blockquote>
                                </div>
                            </div>
                        )}
                    </div>

                }

            </> : <div>
                <div className="py-2">
                    {jobs.map(job => <button onClick={selectJob} value={job.id} className="badge bg-info" key={job.id}  >{job.title}</button>
                    )}
                </div>
                <div>

                    {jobSelected ?
                        <div>
                            <h1>{theJob.title}</h1>
                            Añade una descripción
                            <textarea name="description" onChange={(e)=>setInput({...input, description:e.target.value})} cols="40" rows="10"></textarea>
                            <input type='number' onChange={(e)=>setInput({...input,hours:e.target.value})} name='hours' placeholder='Horas' />
                            <button onClick={() => getWorkers()} className="btn btn-secondary">Selecionar trabajador</button>
                        </div>
                        : null
                    }

                </div>

            </div>
            }

            
        </div>
    )
}