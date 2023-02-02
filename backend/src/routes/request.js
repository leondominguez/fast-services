import express from 'express';
import Job from '../models/Job.js';
import Request from '../models/Request.js';
import User from '../models/User.js';
import Worker from '../models/Worker.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const requests = await Request.findAll({include:[Job,User]});
        res.json(requests);
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );

router.get('/:id', async(req, res) => {
    try {  
    
        const request = await Request.findByPk(req.params.id,{include:[User,Worker,Job]});
        res.json(request);
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );


router.post('/', async(req, res) => {
    try {
        
        const request = await Request.create({
            ...req.body
        });

        res.json(request);
        
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
        
    }
} );

router.put("/:id", async(req, res) => {
    try {
        const request = await Request.findByPk(req.params.id);
        await request.update(req.body);
        res.json(request);
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );






export default router;