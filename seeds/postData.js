const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus provident facilis dolorum delectus voluptate, voluptatum atque est non iusto, sint consectetur itaque cumque quis eveniet asperiores temporibus? Animi, cum fugit.',
    author_id: 1
  },
  {
    title: 'Second Post',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus provident facilis dolorum delectus voluptate, voluptatum atque est non iusto, sint consectetur itaque cumque quis eveniet asperiores temporibus? Animi, cum fugit.',
    author_id: 1
  },
  {
    title: 'Third Post',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus provident facilis dolorum delectus voluptate, voluptatum atque est non iusto, sint consectetur itaque cumque quis eveniet asperiores temporibus? Animi, cum fugit.',
    author_id: 1
  },
  {
    title: 'Fourth Post',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus provident facilis dolorum delectus voluptate, voluptatum atque est non iusto, sint consectetur itaque cumque quis eveniet asperiores temporibus? Animi, cum fugit.',
    author_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
