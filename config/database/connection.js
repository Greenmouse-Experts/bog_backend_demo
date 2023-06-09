require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("./environment")[process.env.NODE_ENV];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: "mysql",
    raw: true,
    pool: {
      max: 15,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database establised");
  })
  .catch(err => {
    console.error(`Unable to connect to database: ${err}`);
  });
module.exports = sequelize;
