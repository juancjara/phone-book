let assert = require('assert');
let fs = require('fs');

let fileStorage = require('../storage/fileStorage');

const fileName = 'testphonebook';
const contactInfo = {
  name: 'testName',
  phone: '1234'
};

let readData = function(path) {
  return fs.readFileSync(path, 'utf8');
};

describe('file Storage', () => {

  it('create empty file', (done) => {
    fileStorage.create(fileName, (err) => {
      if (err) return done(err);
      var data = readData(fileName);
      assert.equal(data, '[]');
      fs.unlinkSync(fileName);
      done();
    })
  });

  describe('action creating file before', () => {
    beforeEach((done) => {
      fileStorage.create(fileName, done);
    });

    afterEach(() => {
      fs.unlinkSync(fileName);
    });

    it('add contact to file', (done) => {
       fileStorage.add(contactInfo, fileName,
        (err) => {
          if (err) return done(err);
          let data = readData(fileName);
          assert.equal('[' + JSON.stringify(contactInfo) + ']',
                       data);
          done();
        });
    });

    describe('value added before', () => {

      beforeEach((done) => {
        fileStorage
          .add(contactInfo, fileName,
               (err) => {
                 done();
               });
      });

      it('add duplicated error', (done) => {
        fileStorage
          .add(contactInfo, fileName,
               (err) => {
                 assert.equal('Error: duplicated name', err);
                 done();
               });
      });

      it('get contacts', (done) => {
        fileStorage
          .getContacts(fileName, (err, contacts) => {
            assert.equal(err, null);
            assert.deepEqual(contacts, [].concat(contactInfo));
            done();
          });
      });

      it('update contact', (done) => {
        let newInfo = {
          name: contactInfo.name,
          phone: '4'
        };

        fileStorage
          .update(contactInfo.name, newInfo.phone, fileName,
                  (err) => {
                    assert.equal(err, null);
                    let newData = readData(fileName);
                    assert.deepEqual(JSON.parse(newData)[0], newInfo);
                    done();
                  });
      });

    });

  });

});
