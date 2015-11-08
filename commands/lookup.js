'use strict'

let findContacts = function(contacts, who) {
  return contacts.
    filter((contact) => {
      return contact.name.search(who) !== -1;
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
