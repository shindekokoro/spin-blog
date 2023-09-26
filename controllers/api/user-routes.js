const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = dbUserData.get({ plain: true });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      req.session.user_id = newUser.id;

      return res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!dbUserData) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.user_id = dbUserData.id;

      return res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    return res.status(404).end();
  }
});

module.exports = router;
