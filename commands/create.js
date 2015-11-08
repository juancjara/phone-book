'use strict'

let create = function(storage, data, cb) {
  if (!validParams(data)) {
    return cb('Error: wrong params');
  }

  let phonebook = data[0];
  storage.create(phonebook, (err) => {
    if (err) return cb(err);
    cb(`created phonebook ${phonebook} in the current directory`);
  });
};

let validParams = function(data) {
  if (!data.length) return false;
  if (data.length !== 1) return false;
  return true;
};

module.exports = create;
