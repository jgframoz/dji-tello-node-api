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

    constructor() {
        this.TELLO_IP = '192.168.10.1';
        this.SR_PORT = 8889;
        this.STATE_IP = '0.0.0.0';
        this.STATE_PORT = 8890;
        this.STREAM_IP = '0.0.0.0';
        this.STREAM_PORT = 11111;

        this.socketIO = dgram.createSocket('udp4');
        this.socketState = dgram.createSocket('udp4');
        this.socketStream = dgram.createSocket('udp4');

        this.socketIO.on('message', function (msg, info) {
            console.log('Data received from server : ' + msg.toString());
            console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
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
                        console.log(error);
                    } else {
                        console.log('Command sent: ' + command);
                    }
                resolve(command);
                });
        });
        
    }

    /**
     * Entry SDK mode
     * Response 'ok' or 'error
     */
    initialize() {
        console.log('Tello is about to start');
        return this.sendCommand('command');
    }

    /**
     * Tello auto takeoff
     * Response 'ok' or 'error
     */
    takeOff() {
        console.log('Tello is going to take off');
        return this.sendCommand('takeoff');
    }

    /**
     * Tello auto land
     * Response 'ok' or 'error'
     */
    land() {
        console.log('Tello landed')
        return this.sendCommand('land');
    }
    /**
     * Set video stream on
     * Response 'ok' or 'error'
     */
    streamOn() {
        this.sendCommand('streamon');
    }

    /**
     * Set video stream off
     * Response 'ok' or 'error'
     */
    streamOff() {
        this.sendCommand('streamoff');
    }

    /**
     * Stop all motors immediately
     * Response 'ok' or 'error'
     */
    stop() {
        this.sendCommand('emergency');
    }


    /**
     * Tello fly up with distance x cm
     * @param  {number} x : 20 - 500
     */
    move_up(x: number) {
        this.sendCommand('up ' + x)
    }

    /**
    * Tello fly down with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_down(x: number) {
        this.sendCommand('down ' + x)
    }

    /**
    * Tello fly left with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_left(x: number) {
        this.sendCommand('left ' + x)
    }

    /**
    * Tello fly right with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_right(x: number) {
        this.sendCommand('right ' + x)
    }

    /**
    * Tello fly forward with distance x cm
    * @param  {number} x : 20 - 500
    */
   move_forward(x: number) {
        console.log('Tello moved forward');
        return this.sendCommand('forward ' + x);
    }

    /**
    * Tello fly back with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_back(x: number) {
        this.sendCommand('back ' + x)
    }

    /**
     * Tello rotate x degree clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_cw(x: number) {
        this.sendCommand('cw ' + x)
    }

    /**
     * Tello rotate x degree counter-clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_ccw(x: number) {
        this.sendCommand('ccw ' + x)
    }

}

export = Tello;