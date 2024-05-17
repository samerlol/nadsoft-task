'use strict';
const bcrypt = require('bcryptjs');

const hash = input => bcrypt.hash(input, 8);

const compare = (value, target) => bcrypt.compare(value, target);

module.exports = {
    hash,
    compare,
};

