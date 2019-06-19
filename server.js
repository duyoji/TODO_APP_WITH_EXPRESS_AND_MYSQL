const express = require("express");
const bodyParser = require("body-parser");
const router = require("./resources/api.router");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todos", router);

module.exports = app;
