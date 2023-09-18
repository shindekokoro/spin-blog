const User = require('./User');
const Post = require('./Post');

Post.belongsTo(User, {
  foreignKey: 'author_id'
});

module.exports = { User, Post };
