const getNumFiles = async (dir) => {
  const { promises: fs } = require("fs");
  const files = await fs.readdir(dir);
  return files.length;
};

async function getImageDimensions(src) {
  const probe = require("probe-image-size");
  let result = await probe(require("fs").createReadStream(src));
  return result;
}

async function createImageData() {
  var loopNum = await getNumFiles("src/components/gallery/gallery-images");
  var galleryData = [];
  for (let i = 1; i < loopNum; i++) {
    var imgDims = await getImageDimensions(`src/components/gallery/gallery-images/${i}.webp`);
    var object = {
        URL: `https://willfeldman.com/img/ig/${i}.webp`,
        width: imgDims.width,
        height: imgDims.height
    };
    galleryData.push(object);
  }
  return galleryData;
}

getNumFiles("src/components/gallery/gallery-images").then((num) => {
  console.log(num);
});

getImageDimensions("src/components/gallery/gallery-images/1.webp").then(
  (dim) => {
    console.log("Width: " + dim.width);
    console.log("Height: " + dim.height);
  }
);

let imageData = createImageData().then(
    (res) => {
        console.log(res);
    }
);