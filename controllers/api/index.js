const router = require('express').Router();

// /api/users
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

// /api/blog (blog commenting)
const commentRoutes = require('./blog-routes');
router.use('/blog', commentRoutes);

module.exports = router;
