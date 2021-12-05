const fs = require('fs');
const path = require('path');

module.exports = function (dirname, relativePath) {
  return fs.readFileSync(path.join(dirname, relativePath), 'utf-8');
};
