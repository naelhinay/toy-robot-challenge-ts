import { Robot } from './classes';
import testData from './testData/sample.json';

const cb = (err: Error | null, res?: string) : void => {
  if (err) {
    console.log(err.message);
  }

  if (!err && res) {
    console.log(res);
  }
};

const robot = new Robot(4, 4);

testData.forEach((data) => {
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
        robot.place({ x: x!, y: y!, direction }, cb);
      } else {
        console.log(`${data.command} [x]`);
      }
      break;
  }
});