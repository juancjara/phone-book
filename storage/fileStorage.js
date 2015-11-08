'use strict'

let fs = require('fs');

let fileStorage = {
  openFile(path, cb) {
    fs.readFile(path, 'utf8', cb);
  },

  writeFile(path, data, cb) {
    console.log('ggwp');
    fs.writeFile(path, JSON.stringify(data), cb);
  },

  create(path, cb) {
    this.writeFile(path, [], cb);
  },

  getContacts(path, cb) {
    this.openFile(path, (err, rawContacts) =>{
      if (err) return cb(err);
      cb(null, JSON.parse(rawContacts));
    })
  },

  update(name, newPhone, phonebook, cb) {
    this.getContacts(phonebook, (err, contacts) => {
      if (err) return cb(err);

      let found = null;
      for (let i = 0, len = contacts.length; i < len; i++) {
        if (contacts[i].name === name) {
          found = contacts[i];
          break;
        }
      }

      if (!found) return cb('Error: contact not found');
      found.phone = newPhone;
      this.writeFile(phonebook, contacts, cb);
    })
  },

  remove(name, phonebook, cb) {
    this.getContacts(phonebook, (err, contacts) => {
      if (err) return cb(err);
      let updatedContacts = contacts.
        filter((contact) => {
          return contact.name !== name;
        });

      if (updatedContacts.length === contacts.length) {
        return cb('Error: contact not exist');
      }

      this.writeFile(phonebook, updatedContacts, cb);
    })
  },

  add(contactInfo, phonebook, cb) {
    this.getContacts(phonebook, (err, contacts) => {

      let matches = contacts
        .filter((contact) => {
          return contact.name === contactInfo.name;
        });

      if (matches.length) {
        return cb('Error: duplicated name');
      }

      contacts.push(contactInfo);
      this.writeFile(phonebook, contacts, cb);
    });
  }

};

module.exports = fileStorage;
