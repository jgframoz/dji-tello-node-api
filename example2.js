const Tello = require('./dist/Tello.js');

let tello = new Tello();


(async () => {
	try {
		let init = await tello.initialize();
		console.log(init);

		let battery = await tello.get_battery();
		console.log(battery);

	}
	catch (error) {
		console.log(error);
	}

})();