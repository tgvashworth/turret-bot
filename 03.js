var five = require('johnny-five');
var board = new five.Board();

function resetServo(servo) {
    servo.stop();
    servo.center();
}

board.on('ready', function () {
    var led = new five.Led(13);
    var panServo = new five.Servo(9);
    var tiltServo = new five.Servo(10);
    led.on();
    this.repl.inject({
        led: led,
        panServo: panServo,
        tiltServo: tiltServo
    });

    panServo.sweep();
    tiltServo.sweep();
    board.wait(3000, function () {
        resetServo(panServo);
        resetServo(tiltServo);
    });
});
