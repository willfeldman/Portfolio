const getNumFiles = async (dir) => {
  const { promises: fs } = require("fs");
  const files = await fs.readdir(dir);
  return files.length;
};

async function getImageDimensions(src) {
    const probe = require('probe-image-size');
    let result = await probe(require('fs').createReadStream(src));
    return result;
}

getNumFiles("src/components/gallery/gallery-images").then((num) => {
    console.log(num);
});

getImageDimensions("src/components/gallery/gallery-images/1.jpg").then((dim) => {
    console.log("Width: " + dim.width);
    console.log("Height: " + dim.height);
});
