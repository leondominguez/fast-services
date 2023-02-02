import express from 'express';
import Job from '../models/Job.js';
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const jobs = await Job.findAll();
        res.json(jobs);
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );

router.post('/', async(req, res) => {
    try {
        const job = await Job.create(req.body);
        res.json(job);
        
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
        
    }
})
export default router;