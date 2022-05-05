import dgram from 'dgram';

class Tello {
    TELLO_IP: string;      // Tello IP
    SR_PORT: number;       // Send Command & Receive Response port 
    STATE_IP: string;      // Receive Tello State IP
    STATE_PORT: number;    // Receive Tello State Port
    STREAM_IP: string      // Receive Tello Video Stream IP
    STREAM_PORT: number    // Receive Tello Video Stream POrt
    socketIO: dgram.Socket;
    socketState: dgram.Socket;
    socketStream: dgram.Socket;

    RESPONSE_TIMEOUT: number;

    constructor() {
        this.TELLO_IP = '192.168.10.1';
        this.SR_PORT = 8889;
        this.STATE_IP = '0.0.0.0';
        this.STATE_PORT = 8890;
        this.STREAM_IP = '0.0.0.0';
        this.STREAM_PORT = 11111;
        this.RESPONSE_TIMEOUT = 7;

        this.socketIO = dgram.createSocket('udp4');
        this.socketState = dgram.createSocket('udp4');
        this.socketStream = dgram.createSocket('udp4');

        this.socketState.bind(this.STATE_PORT);

        this.socketState.on('message', function (msg, info) {
            console.log('Tello State : ' + msg.toString());
        });

        this.socketIO.on('message', function (msg, info) {
            //console.log('Tello Global : ' + msg.toString()); 
        });

    }


    /**
     * Sends a command to Tello using a udp socket
     * This is an internal method
     * @param  {string} command
     */
    sendCommand(command: string) {
        return new Promise((resolve, reject) => {

            this.socketIO.send(command, this.SR_PORT, this.TELLO_IP, function (error) {
                if (error) {
                    reject(error);
                }
                resolve(command);
            });
        });

    }


    /**
     * Sends a command to Tello using a udp socket and waits for the response
     * This is an internal method
     * @param  {string} command
     */
    sendCommandWithReturn(command: string) {
        return new Promise((resolve, reject) => {

            console.log(command);
            this.socketIO.send(command, this.SR_PORT, this.TELLO_IP, function (error) {
                if (error) {
                    reject(error);
                }

            });

            this.socketIO.once('message', function (msg, info) {
                console.log('Tello response : ' + msg.toString());
                resolve(msg.toString());
            });
        });

    }


    /**
     * Sends a control command to Tello using a udp socket and waits for its response
     * This is an internal method
     * @param  {string} command
     */
    sendControlCommand(command: string) {
        return new Promise((resolve, reject) => {

            console.log(command);
            this.socketIO.send(command, this.SR_PORT, this.TELLO_IP, function (error) {
                if (error) {
                    reject(error);
                }

            });

            this.socketIO.once('message', function (msg, info) {
                console.log('Tello response command : ' + msg.toString());
                if (msg.toString() === 'ok') {
                    resolve(msg.toString());
                }
                else {
                    reject(msg.toString());
                }

            });
        });

    }


    /**
     * Entry SDK mode
     * Response 'ok' or 'error
     */
    initialize() {
        console.log('Tello is about to start');
        return this.sendControlCommand('command');
    }

    /**
     * Tello auto takeoff
     * Response 'ok' or 'error
     */
    takeOff() {
        console.log('Tello is going to take off');
        return this.sendControlCommand('takeoff');
    }

    /**
     * Tello auto land
     * Response 'ok' or 'error'
     */
    land() {
        console.log('Tello landed')
        return this.sendControlCommand('land');
    }
    /**
     * Set video stream on
     * Response 'ok' or 'error'
     */
    streamOn() {
        return this.sendControlCommand('streamon');
    }

    /**
     * Set video stream off
     * Response 'ok' or 'error'
     */
    streamOff() {
        return this.sendControlCommand('streamoff');
    }

    /**
     * Stop all motors immediately
     * Response 'ok' or 'error'
     */
    stop() {
        return this.sendControlCommand('emergency');
    }


    /**
     * Tello fly up with distance x cm
     * @param  {number} x : 20 - 500
     */
    move_up(x: number) {
        return this.sendControlCommand('up ' + x)
    }

    /**
    * Tello fly down with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_down(x: number) {
        return this.sendControlCommand('down ' + x)
    }

    /**
    * Tello fly left with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_left(x: number) {
        return this.sendControlCommand('left ' + x)
    }

    /**
    * Tello fly right with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_right(x: number) {
        return this.sendControlCommand('right ' + x)
    }

    /**
    * Tello fly forward with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_forward(x: number) {
        console.log('Tello moved forward');
        return this.sendControlCommand('forward ' + x);
    }

    /**
    * Tello fly back with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_back(x: number) {
        return this.sendControlCommand('back ' + x)
    }

    /**
     * Tello rotate x degree clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_cw(x: number) {
        return this.sendControlCommand('cw ' + x)
    }

    /**
     * Tello rotate x degree counter-clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_ccw(x: number) {
        return this.sendControlCommand('ccw ' + x)
    }

    /**
     * Tello turns on motors without flying (mainly for cooling)
     */
    turnMotorOn() {
        return this.sendControlCommand('motoron')
    }

    /**
     * Tello turns off the motor cooling mode
     */
    turnMotorOff() {
        return this.sendControlCommand('motoroff')
    }

    /**
     * Get current battery percentage 
     * Value between 0 and 100
     */
    get_battery() {
        return this.sendCommandWithReturn('battery?')
    }

    /**
     * Get current speed (cm/s)
     * Value between 1 and 100
     */
    get_speed() {
        return this.sendCommandWithReturn('speed?')
    }

    /**
     * Get current fly time (s)
     */
    get_time() {
        return this.sendCommandWithReturn('time?')
    }


    /**
     * Get current height (cm) 
     * Value between 0 and 3000
     */
    get_height() {
        return this.sendCommandWithReturn('height?')
    }


    /**
     * Get temperature (℃)
     * Value between 0 and 90
     */
    get_temp() {
        return this.sendCommandWithReturn('temp?')
    }

}

export = Tello;