var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
    var led = new five.Led(13);
    var servo = new five.Servo(9);
    led.on();
    this.repl.inject({
        led: led,
        servo: servo
    });

    servo.to(0);
    board.wait(1000, function () {
        servo.to(180);
        board.wait(1000, function () {
            servo.to(90);
        });
    });
});
