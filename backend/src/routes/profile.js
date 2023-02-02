//expres routes for user
import express from 'express';
const router = express.Router();
import User from "../models/User.js";
import Worker from "../models/Worker.js";
import Request from "../models/Request.js";
import bcrypt from "bcryptjs";
import Job from '../models/Job.js';
import sequelize from '../db.js';
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

router.get('/', async(req, res) => {
    try {
        const users = await User.findAll({include:[Request]});
        if(req.query.job){
            const workers = await sequelize.query(
                `SELECT * FROM "jobs"
                join "worker_jobs" on "jobs"."id" = "worker_jobs"."jobId" 
                join "workers" on "worker_jobs"."workerId" = "workers"."id" 
                where "jobs"."id" = ${req.query.job}
                order by "worker_jobs"."price" asc`,
                 { type: sequelize.QueryTypes.SELECT });
            return res.json(workers);
        }
        const workers = await Worker.findAll({include: [Job]});
        
        res.json({users,workers});
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );

router.get('/:id', async(req, res) => {
    try {
        if(req.params.id.length>9){
            //id en este caso es el phone tiene mas de 9 caracteres
        const user = await User.findByPk(req.params.id,{ include: [Request] });
        res.json(user);
        }
        else{
            //id en este caso es el id de la tabla worker
        const worker = await Worker.findByPk(req.params.id,{include:[Job,Request]});
        res.json(worker);
        }
        
    } catch (error) {
        res.json({msg:'error'})
    }
} );

router.post('/', async(req, res) => {
    const { password,role } = req.body;
    if (!password??password.length < 5) {
        return res.json({msg:'Contraseña muy corta'});
    }
    const hashPassword = bcrypt.hashSync(password, salt);   
    try {
        if(role=="user"){
        const point = req.body.addressGps? {
            type: 'Point',
            coordinates: [req.body.addressGps.long, req.body.addressGps.lat],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          }:null;
        const user = await User.create({
            ...req.body,
            password: hashPassword,
            addressGps: point
        }); 
        return res.json({user, msg:'Usuario creado'});
        }
        const point = req.body.addressGps? {
            type: 'Point',
            coordinates: [req.body.addressGps.long, req.body.addressGps.lat],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          }:null;
        const worker = await Worker.create({
            ...req.body,
            password: hashPassword,
            addressGps: point
        });


        let promises = await req.body.jobs?.map( (j) => {
            return Job.findByPk(j.id)
            .then(job=>worker
                .addJob(job, { through: { price: j.price } })) ;
          });
        const jobs = await Promise.all(promises);
        //await worker.addJobs(jobs);
        return res.json({worker, msg:'Trabajador creado'});
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );
//los trabajos no se pueden actualizar
router.put('/', async(req, res) => {
    try {
        console.log(req.body);
        if(req.body.role=="user"){
        const [user] = await User.update(req.body, {
            where: {
                phone: req.body.phone
            }
        });
        if(user==0) return res.json({msg:'No se encontro el usuario'});
        return res.json({user, msg:'Usuario actualizado'});
        
        }
        else{
            //id en este caso es el id de la tabla worker
        const [worker] = await Worker.update(req.body, {
            where: {
                id: req.body.id
        }
        });
        if(!worker) return res.json({msg:'No se encontro el trabajador'});
        return res.json({worker, msg:'Trabajador actualizado'});
    }
    } catch (error) {
        console.log(error);
        res.json({msg:'error', error})
    }} );


export default router;