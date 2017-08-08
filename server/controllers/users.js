const User = require('../models').Users;
const bcrypt = require('bcrypt');

module.exports = {
  create(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        membership: req.body.membership,
      })
      .then(user => res.status(201).send({
        message: 'User created successfully, you can login now',
      }))
      .catch(error => res.status(400).send({
        message: 'Username or email already exists',
      }));
  },
  signin(req, res) {
    return User.findOne(
      {
        where: {
          username: req.body.username,
        },
      })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          res.status(201).send('Login successful');
        }
        res.status(400).send('Wrong username or password');
      });
  },
};
