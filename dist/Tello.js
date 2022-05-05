"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dgram_1 = __importDefault(require("dgram"));
class Tello {
    constructor() {
        this.TELLO_IP = '192.168.10.1';
        this.SR_PORT = 8889;
        this.STATE_IP = '0.0.0.0';
        this.STATE_PORT = 8890;
        this.STREAM_IP = '0.0.0.0';
        this.STREAM_PORT = 11111;
        this.socketIO = dgram_1.default.createSocket('udp4');
        this.socketState = dgram_1.default.createSocket('udp4');
        this.socketStream = dgram_1.default.createSocket('udp4');
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
    sendCommand(command) {
        return new Promise((resolve, reject) => {
            this.socketIO.send(command, this.SR_PORT, this.TELLO_IP, function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Command sent: ' + command);
                }
                resolve('command');
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
        console.log('Tello landed');
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
    move_up(x) {
        this.sendCommand('up ' + x);
    }
    /**
    * Tello fly down with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_down(x) {
        this.sendCommand('down ' + x);
    }
    /**
    * Tello fly left with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_left(x) {
        this.sendCommand('left ' + x);
    }
    /**
    * Tello fly right with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_right(x) {
        this.sendCommand('right ' + x);
    }
    /**
    * Tello fly forward with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_forward(x) {
        console.log('Tello moved forward');
        return this.sendCommand('forward ' + x);
    }
    /**
    * Tello fly back with distance x cm
    * @param  {number} x : 20 - 500
    */
    move_back(x) {
        this.sendCommand('back ' + x);
    }
    /**
     * Tello rotate x degree clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_cw(x) {
        this.sendCommand('cw ' + x);
    }
    /**
     * Tello rotate x degree counter-clockwise
     * @param  {number} x : 1 - 3600
     */
    rotate_ccw(x) {
        this.sendCommand('ccw ' + x);
    }
}
module.exports = Tello;
//# sourceMappingURL=Tello.js.map