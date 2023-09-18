const router = require('express').Router();
const { Post, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    return res.render('homepage', {
      posts: posts,
      user: posts.user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the blog post
    try {
      const postData = await Post.findByPk(req.params.id, {});
      const post = postData.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// Login Route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login');
});
// Signup Route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('signup');
});

module.exports = router;
