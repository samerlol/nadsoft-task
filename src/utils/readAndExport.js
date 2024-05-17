'use strict';

const fs = require('fs');
const requireDir = require('require-dir');
const logger = require('../logger');


const readAndExport = (dirPath, replace = '', replaceWith = '') => {
  try {
    const filePaths = [];
    console.log('read');
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    console.log(files);

    const modules = requireDir(dirPath, {
      mapKey: function (value, baseName) {
        console.log(baseName);
        if (baseName !== 'index') {
          filePaths.push(`./${baseName}`);
        }
        return baseName.replace(replace, replaceWith);
      },
    });
    console.log({ modules });
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
