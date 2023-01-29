import { DataTypes} from "sequelize";
import sequelize  from "../db.js";
const User = sequelize.define("user",{
    phone:{
        type: DataTypes.STRING,
        primaryKey: true
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
        //type:DataTypes.STRING(90)
    },
    email:{
        type:DataTypes.STRING(80),
        unique: true
    },
    password:{
        type: DataTypes.TEXT
    },
    paymentMethod:{
        type:DataTypes.SMALLINT //1-credit card, 2-debit card, 3-cash
    },
    photoPublicService:{
        type:DataTypes.STRING(200)
    },
    cardNumber:{
        type:DataTypes.STRING(20) //ya incluye la fecha de expiracion
    }

})

export default User;