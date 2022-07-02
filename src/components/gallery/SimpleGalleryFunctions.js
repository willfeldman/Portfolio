const { promises: fs } = require('fs');
const dir = '/';

const getNumFiles = async (dir) => {
  const files = await fs.readdir(dir);
  console.log(files.length);
}

console.log(getNumFiles("src/components/gallery/gallery-images"));