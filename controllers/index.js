const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const blogRoutes = require('./blog-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
