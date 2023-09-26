const router = require('express').Router();
const { Post, User } = require('../../models');
const isAuthed = require('../../utils/auth');

// Get post by id to update
router.get('/:id', isAuthed, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    const post = dbPostData.get({ plain: true });
    // Render blog post
    return res.render('updatePost', {
      title: post.title,
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// PUT update to blog post
router.put('/:id', async (req, res) => {
  try {
    console.log('put?');
    const dbPostData = await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id, user_id: req.session.user_id } }
    );
    return res.status(200).json(dbPostData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// CREATE new comment
router.post('/', isAuthed, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    return res.status(200).json(dbCommentData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
