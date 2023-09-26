const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// CREATE new comment
router.post('/', async (req, res) => {
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
