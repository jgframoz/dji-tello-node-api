const Tello = require('./dist/Tello.js');

let tello = new Tello();


(async () => {

    await tello.initialize();
    await tello.takeOff();

    await tello.move_forward(50);

    await tello.land();
    
  })();