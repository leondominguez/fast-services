import { DataTypes} from "sequelize";
import sequelize  from "../db.js";
import Job from "./Job.js";
import Worker from "./Worker.js";
import User from "./User.js";

let Request = sequelize.define("request", {
    date:{
        type: DataTypes.DATE,
    },
    payment:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    state:{
        type: DataTypes.SMALLINT, //1-pending, 2-accepted, 3-rejected, 4-finished
        defaultValue: 1
    },
    rating:{
        type: DataTypes.SMALLINT,
        validate: {
            min: 1,
            max: 5
        },
        defaultValue: 1
    },
    hours:{
        type: DataTypes.SMALLINT
    },
    description:{
        type: DataTypes.TEXT
    }
},
{timestamps: false})

Request.belongsTo(Job);
Job.hasMany(Request);
Request.belongsTo(User);
User.hasMany(Request);
Request.belongsTo(Worker);
Worker.hasMany(Request);

export default Request;
