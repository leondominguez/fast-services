import { DataTypes } from "sequelize";
import sequelize from "../db.js";

import User from "./User.js";
import Worker from './Worker.js'
import Job from './Job.js'
import Request from './Request.js'
const WorkerJob = sequelize.define("worker_job", {
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 5000,
        validate: {
            min: 5000,
        }
    },
},{ 
    timestamps: false,
  
})
Worker.belongsToMany(Job, { through: 'worker_job' });
Job.belongsToMany(Worker, { through: 'worker_job' });