'use strict'

let add = function(storage, data, cb) {
  if (!validParams(data)) {
    return cb('Error: wrong params');
  }

  storage.add({name: data[0], phone: data[1]}, data[2],
              (err) => {
                if (err) return cb(err);
                cb('Successful contact added!');
              });
};

let validParams = function(data) {
  return true;
};

module.exports = add;
