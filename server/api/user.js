const router = require('express').Router();
const { User, Portfolio } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  const email = req.query.email;
  try {
    const users = await User.findOne({
      where: {
        email
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password
    });
    const portfolio = await Portfolio.create();
    portfolio.setUser(user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
