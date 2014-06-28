var five = require('johnny-five');
var board = new five.Board();

function resetServo(servo) {
    servo.stop();
    servo.center();
}

board.on('ready', function () {
    var status = new five.Led(13);
    var frickinLaserBeam = new five.Led(11);
    var panServo = new five.Servo(9);
    var tiltServo = new five.Servo(10);
    status.on();
    this.repl.inject({
        status: status,
        frickinLaserBeam: frickinLaserBeam,
        panServo: panServo,
        tiltServo: tiltServo
    });

    frickinLaserBeam.strobe(500);
    panServo.sweep();
    tiltServo.sweep();
    board.wait(3000, function () {
        frickinLaserBeam.off();
        resetServo(panServo);
        resetServo(tiltServo);
    });
});
