function create(robot, branch) {
    let trail = robot.trail.slice(0);
    trail.push(branch);
    return {
        x: robot.x,
        y: robot.y,
        direction : robot.direction,
        valid: robot.valid,
        id: branch ? robot.id + '.' + branch : robot.id,
        trail: trail
    }
}

function turnLeft(robots, value) {
    robots.forEach(robot => robot.direction-=value);
}

function turnRight(robots, value) {
    robots.forEach(robot => robot.direction+=value);
}

function goForward(robots, value) {
    robots.forEach(robot => {
        switch((3600 + robot.direction) % 360) {
            case 0: robot.y+=(value/30); break;
            case 90: robot.x+=(value/30); break;
            case 180: robot.y-=(value/30); break;
            case 270: robot.x-=(value/30); break;
            default: throw "Invalid direction "+robot.direction;
        }
        robot.valid = robot.valid && robot.x > 0 && robot.x < 9 && robot.y > 0 && robot.y < 6;
        robot.trail.push(robot.x+','+robot.y)
    });
}

function ifObstInFront(robots, positiveLogic, negativeLogic) {
    var positiveRobots = [];
    robots.forEach(robot => positiveRobots.push(create(robot, 'y')));

    var negativeRobots = [];
    robots.forEach(robot => negativeRobots.push(create(robot, 'n')));

    return positiveLogic(positiveRobots).concat(negativeLogic(negativeRobots));
}

module.exports = {
    create,
    turnRight,
    turnLeft,
    goForward,
    ifObstInFront
};