"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const sample_json_1 = __importDefault(require("./testData/sample.json"));
const cb = (err, res) => {
    if (err) {
        console.log(err.message);
    }
    if (!err && res) {
        console.log(res);
    }
};
const robot = new classes_1.Robot(4, 4);
sample_json_1.default.forEach((data) => {
    switch (data.command) {
        case 'MOVE':
            robot.move(cb);
            break;
        case 'LEFT':
            robot.left(cb);
            break;
        case 'RIGHT':
            robot.right(cb);
            break;
        case 'REPORT':
            robot.report(cb);
            break;
        default:
            const { x, y, f: direction, isValid } = robot.checkPlaceCommand(data.command); // eslint-disable-line
            if (isValid
                && typeof x === 'number'
                && typeof y === 'number'
                && direction) {
                robot.place({ x: x, y: y, direction }, cb);
            }
            else {
                console.log(`${data.command} [x]`);
            }
            break;
    }
});
//# sourceMappingURL=index.js.map