const User = require('../models').Users;

module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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
    return User
      .findOne({
        where: { username: req.body.username, password: req.body.password },
        attributes: ['username', 'password'],
      }).then(user => {
        if (!user) {
          res.status(404).send('Invalid username or password');
        }
        res.status(200).send('Login successful ');
      });
  },
};
