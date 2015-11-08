'use strict'

let minimist = require('minimist');
let commands = require('./commands');
let storageFactory = require('./storage/storageFactory');

let storage = storageFactory.make(storageFactory.types.file);

var argv = minimist(process.argv.slice(2));

let command = argv._[0];
let args = argv._.slice(1);

if (command in commands) {
  commands[command](storage, args, console.log);
}
