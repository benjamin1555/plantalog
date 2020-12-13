const sharp = require('sharp');
const { nanoid } = require('nanoid');

const SIZES = {
  regular: 128,
  thumbnail: 48,
  icon: 16
};

const makeImage = async (randomToken, file, size, format) => {
  const newFilename = `${randomToken}-${size}-${file.originalname.split('.')[0]}.${format}`;
  await sharp(file.buffer)
    .resize(SIZES[size], SIZES[size])
    .toFormat(format)
    .toFile(`images/${newFilename}`);
  return newFilename;
};

const resizeImage = async (req, res, next) => {
  if (!req.file){
    req.body.images = {
      regular: 'default/default_regular.png',
      thumbnail: 'default/default_thumbnail.png',
      icon: 'default/default_icon.png'
    };
    return next();
  }

  const randomToken = nanoid();
  const file = req.file;
  const results = await Promise.all([
    makeImage(randomToken, file, 'regular', 'jpeg'),
    makeImage(randomToken, file, 'thumbnail', 'jpeg'),
    makeImage(randomToken, file, 'icon', 'png'),
  ]);

  req.body.images = {
    regular: results[0],
    thumbnail: results[1],
    icon: results[2]
   };
   console.log(req.body.images)
  next();
};

module.exports = resizeImage;