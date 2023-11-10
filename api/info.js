const { info } = require('../src/data/info');

module.exports = (req, res) => {
  res.status(200).json({ info });
};