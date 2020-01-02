const db = require('../utils/db');

module.exports = {
  add: entity => db.add('image', entity),
};
