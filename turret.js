var five = require('johnny-five');
var board = new five.Board();

function resetServo(servo) {
    servo.stop();
    servo.center();
}

function ledOnFor(led, time) {
    led.on();
    setTimeout(function () {
        led.stop();
    }, time);
}

board.on('ready', function () {
    var status = new five.Led(13);
    var frickinLaserBeam = new five.Led(11);
    var panServo = new five.Servo(9);
    var tiltServo = new five.Servo(10);
    status.on();
    frickinLaserBeam.brightness(255);
    frickinLaserBeam.off();
    this.repl.inject({
        status: status,
        frickinLaserBeam: frickinLaserBeam,
        panServo: panServo,
        tiltServo: tiltServo
    });

    var http = require('http');
    var server = http.createServer();
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
      socket.on('xy', function (pos) {
        panServo.to(pos.x);
        tiltServo.to(pos.y);
      });
      socket.on('on', function () {
        frickinLaserBeam.on();
      });
      socket.on('off', function () {
        frickinLaserBeam.off();
      });
    });
    server.listen(9582);
});
