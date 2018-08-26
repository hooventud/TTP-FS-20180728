const express = require('express');
const morgan = require('morgan');
const routes = require('./api');
const path = require('path');
const db = require('./db');

const app = express();

//Database sync
db.sync({ force: true }).then(() => {
  console.log('Database is synced!');
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

//Logging middleware
app.use(morgan('dev'));

//Static middleware
app.use(express.static(path.join(__dirname, '..', 'dist')));

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//'API' routes
app.use('/api', routes);

//404 middleware
app.use((req, res, next) => {
  path.extname(req.path).length > 0
    ? res.status(404).send('Not found!')
    : next();
});

//send index.html
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

//error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
