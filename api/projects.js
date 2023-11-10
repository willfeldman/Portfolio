const { projects } = require('../src/data/project');

module.exports = (req, res) => {
  res.status(200).json({ projects });
};
