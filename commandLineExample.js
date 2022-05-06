const readline = require('readline');
const Tello = require('./dist/Tello.js');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tello = new Tello();

rl.on('line', (command) => {

    if (command === 'exit') {
        console.log('Tello Landing...');
        tello.land();
        rl.close();
    }

    try{
        let response = tello.sendCommandWithReturn(command);
        response.then(console.log(response));
    }
    catch(error){
        console.log(error);
    }

  });



