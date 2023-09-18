const { User } = require('../models');

const userData = [
  {
    username: 'Big Spiral',
    email: 'spiral@gmail.com',
    password: '$2b$10$Zj1EvlI1gY1mW/UZenZkSOkq74yNmaRDL7UnYsCgbANNSFxhAZ6f2'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
