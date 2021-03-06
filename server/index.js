const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const app = express();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || '588BB1DDFEDEDD',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

db.sync({ force: true }).then(() => {
  console.log('Database is synced!');
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res, next) => {
  path.extname(req.path).length > 0
    ? res.status(404).send('Not found!')
    : next();
});

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
