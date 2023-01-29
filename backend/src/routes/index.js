import { Router } from 'express';
import User from '../models/User.js';
import sessionRoutes from './session.js';
import profileRoutes from './profile.js';
import jobRoutes from './job.js';
import requestRoutes from './request.js';
import sequelize from '../db.js';
const router = Router();

router.use('/profile', profileRoutes);
router.use('/session', sessionRoutes);
//jobs
 router.use('/job', jobRoutes);
//requests
router.use('/request', requestRoutes);
router.get('/query', async(req, res) => {
    let {query} = req.query;
    try {
        const dbquery= await sequelize.query(`${query}`)
        res.json(dbquery);
    } catch (error) {
        console.log(error);
        res.json({msg:'error'})
    }
} );

export default router;