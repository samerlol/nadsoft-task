'use strict';

const fs = require('fs');
const requireDir = require('require-dir');
const logger = require('../logger');


const readAndExport = (dirPath, replace = '', replaceWith = '') => {
  try {
    const filePaths = [];
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const modules = requireDir(dirPath, {
      mapKey: function (value, baseName) {
        if (baseName !== 'index') {
          filePaths.push(`./${baseName}`);
        }
        return baseName.replace(replace, replaceWith);
      },
    });
    for (const file of files) {
      modules[file] = requireDir(`${dirPath}/${file}`, {
        mapKey: function (value, baseName) {
          filePaths.push(`./${file}/${baseName}`);
          return baseName.replace(replace, replaceWith);
        },
      });
    }
    return { modules, filePaths };
  } catch (error) {
    logger.error(error);
  }
};


module.exports = readAndExport;
