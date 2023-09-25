const router = require('express').Router();
const { Post } = require('../models');
const isAuthed = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({});
    const posts = postData.map((post) => post.get({ plain: true }));
    return res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.get('/dashboard', isAuthed, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    const userPosts = userPostData.map((post) => post.get({ plain: true }));
    return res.render('dashboard', {
      title: 'Dashboard',
      userPosts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Login Route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login', {
    title: 'Login'
  });
});
// Signup Route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('signup', {
    title: 'Signup'
  });
});

module.exports = router;
