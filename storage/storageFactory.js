'use strict'

let fileStorage = require('./fileStorage');

let factory = {
  types: {
    file: 'file'
  },

  make(type) {
    switch(type) {
    case 'file':
      return fileStorage;
    default:
      return null;
    }
  }
};

module.exports = factory;
