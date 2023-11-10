const { experiences } = require('../src/data/experience');

module.exports = (req, res) => {
  res.status(200).json({ experiences });
};
