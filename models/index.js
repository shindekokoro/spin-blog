const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A post has one user(author)
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
// User can have many post(s)
User.hasMany(Post, {
  foreignKey: 'user_id'
});
// A post has many comments, referenced by the post_id
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
// A comment belongs to one user(author)
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };
