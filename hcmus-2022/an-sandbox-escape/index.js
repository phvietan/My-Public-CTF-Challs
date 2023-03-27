#!/usr/local/bin/node

// In order to keep clean environment for players
const objToHideFromPlayerToKeepCleanEnvironment = {
  rl: require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  exit: process.exit,
}
process.stdout.write(`#!/usr/local/bin/node
require=null;
process=null;
> `);

require=null;
process=null;

objToHideFromPlayerToKeepCleanEnvironment.rl.on('line', function(line) {
  delete objToHideFromPlayerToKeepCleanEnvironment.rl;
  eval(line);
  console.log('Bye!');
  objToHideFromPlayerToKeepCleanEnvironment.exit();
});
