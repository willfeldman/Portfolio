const { organizations } = require('../src/data/organization');

module.exports = (req, res) => {
  res.status(200).json({ organizations });
};
