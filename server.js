"use strict";

const express = require("express");
const http = require("http");
const nextjs = require("next");
const socketio = require("socket.io");
const compress = require("compression");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");


const model = require("./model");

const env = process.env.NODE_ENV || "development";
const config = require("./config.json")[env];

const dev = env === "development";
const nextLayer = nextjs({ dev });

const server = {
  "http": null,
  "express": null,
  "io": null
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(config.http.port);


model.sequelize.authenticate()
.then(() => {
  console.error("Database connection has been established successfully.");
  return model.sequelize.sync({force: true});
})
.then(() => {
  return nextLayer.prepare();
})
.then(() => {
  // create the server
  server.express = express();

  server.express.set("port", port);

  /*
   * Create HTTP server.
   */

  server.http = http.createServer(server.express);

  /*
   * Add socket.io to server
   */

  server.io = socketio(server.http);

  /*
   * Add compression
   */
  if (config.compress) {
    server.express.use(compress());
  }

  /*
   * Serve favicon
   */
  if (config.favicon) {
    const favicon = require("serve-favicon");
    server.express.use(favicon(path.join(__dirname, config.favicon)));
  }

  /*
   * Simulate server response delay (ms)
   */
  if (config.artificialDelay) {
    server.express.use((req, res, next) => {
      setTimeout(() => {
        next();
      }, config.artificialDelay);
    });
  }

  /*
   * Add model routes
   */
  server.express.use("/model", model.routes);

  /*
   * Add app routes
   */


  server.express.get("*", nextLayer.getRequestHandler());

  // catch 404 and forward to error handler
  //server.express.use((req, res, next) => {
  //  var err = new Error("Resource not found.")
  //  err.status = 404
  //  next(err)
  //})

  /*
   * Add error response handler
   */
  server.express.use((err, req, res, next) => {

    console.error(err.stack);
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message,
        stack: err.stack,
        code: err.code || "internalerror"
      }
    });
  });

  /*
  * Listen on provided port, on all network interfaces.
  */
  server.http.listen(port);

  /*
   * Server error event
   */
  server.http.on("error", (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const serverBinding = (port => {
      if (typeof port === "string"){
        return "Pipe " + port;
      }else{
        return "Port " + port;
      }
    })(port);


    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(serverBinding + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(serverBinding + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  /*
   * Server listening event
   */
  server.http.on("listening", () => {
    const addr = server.http.address();

    const serverBinding = (addr => {
      if (typeof addr === "string"){
        return "Pipe " + addr;
      }else{
        return "Port " + addr.port;
      }
    })(addr);

    console.error("Listening on " + serverBinding);
  });
})
.catch((error) => {
  console.error(error.stack);
  process.exit(1);
});

module.exports = server;
