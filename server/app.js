const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// middleware
// Setup Logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' + ':status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// req body middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// backend routing


module.exports = app;