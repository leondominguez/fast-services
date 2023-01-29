import { DataTypes} from "sequelize";
import sequelize  from "../db.js";
const Worker = sequelize.define("worker",{
    phone:{
        type: DataTypes.STRING,
    },
    name:{
        type:DataTypes.STRING(70)
    },
    address:{
        type:DataTypes.STRING(90)
    },
    addressGps:{
        type:DataTypes.GEOMETRY('POINT',4326),
        allowNull: true
    },
    email:{
        type:DataTypes.STRING(80),
        unique: true
    },
    password:{
        type: DataTypes.TEXT
    },
    identificationPhoto:{
        type:DataTypes.STRING(200)
    },
    profilePhoto:{
        type:DataTypes.STRING(200)
    }

})

export default Worker;