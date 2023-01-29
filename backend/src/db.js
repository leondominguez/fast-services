import {Sequelize} from 'sequelize';
import config from '../lib/config.js';


const sequelize = new Sequelize(`postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions : {}
})
export default sequelize;