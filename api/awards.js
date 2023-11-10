// api/awards.js
const { awards } = require('../src/data/award');

module.exports = (req, res) => {
  res.status(200).json({ awards });
};
