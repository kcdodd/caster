"use strict";
// requires everything in the same folder
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const routes = require("express").Router();

const basePath = path.join(__dirname, "./");
const env = process.env.NODE_ENV || "development";
const config = require("../config.json")[env];

/**
 * Connect to database
 */
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: "postgres",
  pool: config.db.pool
    ? config.db.pool
    : {
      max: 5,
      min: 0,
      idle: 10000
    }
});

//https://github.com/sequelize/express-example/blob/master/models/index.js
var db = {
  sequelize: sequelize,
  routes: routes
};

fs.readdirSync(basePath).filter((filename) => {
  return (filename.indexOf(".") !== 0) && (filename !== "index.js");
}).forEach((filename) => {
  var model = sequelize.import (path.join(basePath, filename));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }

  if ("routes" in db[modelName]) {
    routes.use("/" + modelName.toLowerCase(), db[modelName].routes(db));
  }
});

module.exports = db;
