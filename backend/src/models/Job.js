import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const Job = sequelize.define("job", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(30)
    }
})
export default Job;