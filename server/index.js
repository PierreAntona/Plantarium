

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.post('/login', (req, res) => {
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
})

app.listen(3001, () => {
  console.log('Server started on port 3000');
})
