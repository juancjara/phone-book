'use strict'

let change = function(storage, data, cb) {
  if (!validParams(data)) {
    return cb('Error: wrong params');
  }

  storage.update(data[0], data[1], data[2], (err) => {
    if (err) return cb(err);
    cb('Contact updated');
  })
};

let validParams = function(data) {
  return true;
};

module.exports = change;
