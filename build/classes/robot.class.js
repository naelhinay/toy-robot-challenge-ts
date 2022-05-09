"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const enums_1 = require("../enums");
class Robot {
    constructor(x, y) {
        this._maxX = x;
        this._maxY = y;
    }
    isRobotPlaced() {
        return !!(this._robot);
    }
    place(robot, cb) {
        if (!(robot.direction in enums_1.Direction)) {
            return cb(new Error('PLACE command error, invalid direction'));
        }
        if (robot.x < 0 || robot.y < 0 || robot.x > this._maxX || robot.y > this._maxY) {
            return cb(new Error('PLACE command error, invalid position'));
        }
        this._robot = robot;
        return cb(null);
    }
    move(cb) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!this.isRobotPlaced()) {
            return cb(new Error('MOVE command error, robot not placed'));
        }
        let moved = false;
        switch ((_a = this._robot) === null || _a === void 0 ? void 0 : _a.direction) {
            case 'NORTH':
                if (((_b = this._robot) === null || _b === void 0 ? void 0 : _b.y) >= 0
                    && ((_c = this._robot) === null || _c === void 0 ? void 0 : _c.y) < this._maxY) {
                    this._robot.y += 1;
                    moved = true;
                }
                break;
            case 'SOUTH':
                if (((_d = this._robot) === null || _d === void 0 ? void 0 : _d.y) <= this._maxY
                    && ((_e = this._robot) === null || _e === void 0 ? void 0 : _e.y) > 0) {
                    this._robot.y -= 1;
                    moved = true;
                }
                break;
            case 'EAST':
                if (((_f = this._robot) === null || _f === void 0 ? void 0 : _f.x) >= 0
                    && ((_g = this._robot) === null || _g === void 0 ? void 0 : _g.x) < this._maxX) {
                    this._robot.x += 1;
                    moved = true;
                }
                break;
            case 'WEST':
                if (((_h = this._robot) === null || _h === void 0 ? void 0 : _h.x) <= this._maxX
                    && ((_j = this._robot) === null || _j === void 0 ? void 0 : _j.x) > 0) {
                    this._robot.x -= 1;
                    moved = true;
                }
                break;
            default:
                // do nothing;
                break;
        }
        if (!moved) {
            return cb(new Error('Falling off the table prevented, robot not moved'));
        }
        return cb(null);
    }
    left(cb) {
        var _a;
        if (!this.isRobotPlaced()) {
            return cb(new Error('LEFT command error, robot not placed'));
        }
        switch ((_a = this._robot) === null || _a === void 0 ? void 0 : _a.direction) {
            case 'NORTH':
                this._robot.direction = 'WEST';
                break;
            case 'SOUTH':
                this._robot.direction = 'EAST';
                break;
            case 'EAST':
                this._robot.direction = 'NORTH';
                break;
            case 'WEST':
                this._robot.direction = 'SOUTH';
                break;
            default:
                // do nothing;
                break;
        }
        return cb(null);
    }
    right(cb) {
        var _a;
        if (!this.isRobotPlaced()) {
            return cb(new Error('RIGHT command error, robot not placed'));
        }
        switch ((_a = this._robot) === null || _a === void 0 ? void 0 : _a.direction) {
            case 'NORTH':
                this._robot.direction = 'EAST';
                break;
            case 'SOUTH':
                this._robot.direction = 'WEST';
                break;
            case 'EAST':
                this._robot.direction = 'SOUTH';
                break;
            case 'WEST':
                this._robot.direction = 'NORTH';
                break;
            default:
                // do nothing;
                break;
        }
        return cb(null);
    }
    // Getters
    report(cb) {
        var _a, _b, _c;
        if (!this.isRobotPlaced()) {
            return cb(new Error('RIGHT command error, robot not placed'));
        }
        return cb(null, `Output: ${(_a = this._robot) === null || _a === void 0 ? void 0 : _a.x},${(_b = this._robot) === null || _b === void 0 ? void 0 : _b.y},${(_c = this._robot) === null || _c === void 0 ? void 0 : _c.direction}`);
    }
    checkPlaceCommand(command) {
        const re = /^PLACE[ ]{1,}[0-4],[0-4],(NORTH|EAST|SOUTH|WEST)[ ]{0,}/g;
        const isValid = re.test(command);
        if (!isValid) {
            return {
                isValid: false,
            };
        }
        const c = command.split(' ');
        const values = c[1].split(',');
        return {
            x: Number(values[0]),
            y: Number(values[1]),
            f: values[2],
            isValid: true,
        };
    }
    removeRobot() {
        this._robot = undefined;
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.class.js.map