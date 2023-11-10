const { educations } = require('../src/data/education');

module.exports = (req, res) => {
  res.status(200).json({ educations });
};
