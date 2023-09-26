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
        const dbPostData = await Post.findByPk(req.params.id, {
          include: [{ model: User, attributes: ['username'] }]
        });
        const post = dbPostData.get({ plain: true });
        const comments = await Comment.findAll({
          include: [{ model: User, attributes: ['username'] }],
          order: [['createdAt', 'ASC']],
          where: { post_id: req.params.id },
          raw: true
        });
        // Render blog post
        return res.render('post', {
          title: post.title,
          post,
          comments,
          loggedIn: req.session.loggedIn
        });
      }
      // Render "new" post entry form
      return res.render('newPost', {
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
  })
  .delete(isAuthed, async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: { id: req.params.id }
      });
      if (deletedPost) {
        return res.status(200).json(deletedPost);
      }
      return res.status(400).json({ message: 'Unable to delete' });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  });

module.exports = router;
