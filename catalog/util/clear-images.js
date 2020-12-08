const fs = require('fs');
const path = require('path');

const clearImages = filePaths => {
  for (let [_, filePath] of Object.entries(filePaths)) {
    filePath = path.join(__dirname,  '..', 'images', filePath);
    fs.unlink(filePath, err => {
      if (err) console.error(err);
    });
  }
};

module.exports = { clearImages };