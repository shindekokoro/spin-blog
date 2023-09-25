const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const isAuthed = require('../utils/auth');

// CREATE new blog post

router
  .route('/:id?')
  .get(isAuthed, async (req, res) => {
    try {
      // If there is an ID in the get route, user is requesting a post not a new entry.
      if (req.params.id) {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            { model: User, attributes: ['username'] },
            { model: Comment, attributes: ['content', 'createdAt'] }
          ]
        });
        const post = postData.get({ plain: true });
        // Render blog post
        return res.render('post', {
          title: post.title,
          post,
          loggedIn: req.session.loggedIn
        });
      }
      // Render "new" blog post entry form
      return res.render('blog', {
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  })
  // Create(POST) a new blog post
  .post(isAuthed, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
      return res.status(200).json(dbPostData);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  });

module.exports = router;
