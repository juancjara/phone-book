'use strict'

let findContacts = function(contacts, phone) {
  return contacts.
    filter((contact) => {
      return contact.phone === phone;
    });
};

let lookup = function(storage, data, cb) {
  if (!validParams(data)) {
    return cb('Error: wrong params');
  }

  storage.getContacts(data[1], (err, contacts) => {
    if (err) return cb(err);
    cb(findContacts(contacts, data[0]));
  });
};

let validParams = function(data) {
  return true;
};

module.exports = lookup;
