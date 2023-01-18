

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport')
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());

const passportConfig = require('./passportConfig');
passportConfig(passport);


app.post('/register', (req, res) => {

  const mail = req.body.mail;
  const password = req.body.password;

  const query = "INSERT INTO User (`mail`, `password`) VALUES (?, ?)"
  const query2 = "SELECT * FROM User WHERE mail = ?"

  db.query(query2, [mail], (err, result) => {
    if (err) { throw err; }
    if (result.length > 0) {
      res.send({ message: "Username already exists" });
    }
    if (result.length === 0) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(query, [mail, hashedPassword], (err, result) => {
        if (err) { throw err; }
        res.send({ message: "User created" });
      })
    }
  })
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { throw err; }
    if (!user) { res.send('No user exists') }
    if (user) {
      req.login(user, (err) => {
        if (err) { throw err; }
        res.send("User logged in");
        console.log(user)
      })
    }
  })(req, res, next);
});

app.get('/getUser', (req, res) => {
  res.send(req.user);
})

app.listen(3001, () => {
  console.log('Server started on port 3001');
})
