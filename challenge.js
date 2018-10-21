
const dash = require('./dash.js');

var robots = [
    dash.create({
        x: 1,
        y: 1,
        direction: 0,
        valid: true,
        id: 0,
        trail: []
    }),
    dash.create({
        x: 1,
        y: 1,
        direction: 90,
        valid: true,
        id: 90,
        trail: []
    }),
    dash.create({
        x: 1,
        y: 1,
        direction: 180,
        valid: true,
        id: 180,
        trail: []
    }),
    dash.create({
        x: 1,
        y: 1,
        direction: 270,
        valid: true,
        id: 270,
        trail: []
    }),
];

function a(robots) {
    dash.goForward(robots, 30);
    dash.turnRight(robots, 90);
    robots = dash.ifObstInFront(robots, 
        robots => robots, 
        robots => {
            dash.turnLeft(robots, 90); 
            return robots;
        }
    );
    return robots;
}

function b(robots) {
    dash.goForward(robots, 30);
    dash.turnRight(robots, 90);
    robots = dash.ifObstInFront(robots, 
        robots => {
            dash.turnLeft(robots, 90);
            return robots;
        }, 
        robots => robots
    );
    return robots;
}

function c(robots, lemon) {
    dash.turnLeft(robots, 180);
    while(lemon>0) {
        dash.goForward(robots, 30);
        lemon -= 1;
    }
    dash.turnLeft(robots, 90);
    dash.goForward(robots, 60);
    return robots;
}

var orange = 3;
robots = dash.ifObstInFront(robots, 
    robots => {
        while(orange>0) {
            var banana = orange;
            var lemon = orange;
            dash.turnLeft(robots, 90)
            robots = a(robots);
            while(banana > 0) {
                robots = b(robots);
                banana -= 1;
            }
            robots = c(robots, lemon);
            orange -= 1;
        }
        return robots;
    }, 
    robots => robots
);

robots = dash.ifObstInFront(robots, 
    robots => {
        dash.turnRight(robots, 90)
        dash.goForward(robots, 30);
        dash.turnLeft(robots, 90);
        return robots;
    }, 
    robots => robots
);


robots = robots.filter(robot => robot.valid)

console.log(robots.length);

for(var y=5; y>0; y--) {
    for(var x=1; x<9; x++) {
        var number = robots.filter(robot => robot.x==x && robot.y==y).length
        if(number < 10) process.stdout.write('0');
        process.stdout.write(number.toString(10));
        process.stdout.write(" ");
    }
    process.stdout.write("\n");
}

console.log(robots.filter(robot => robot.x==7 && robot.y == 2));