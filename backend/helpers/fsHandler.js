const fs = require('fs');

const getJsonFromFile = (filePath) => fs.promises.readFile(filePath)
  .then((data) => JSON.parse(data));

module.exports = {
  getJsonFromFile,
};
