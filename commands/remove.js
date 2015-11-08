'use strict'

let remove = function(storage, data, cb) {
  if (!validParams(data)) {
    return cb('Error: wrong params');
  }

  storage.remove(data[0], data[1], (err) => {
    if (err) return cb(err);
    cb('Contact remove');
  })
};

let validParams = function(data) {
  return true;
};

module.exports = remove;
