import { Direction } from '../enums';
import { LogCallback } from '../types';
import { IRobot, Place } from '../interfaces';

export class Robot {
  private _maxX: number;
  private _maxY: number;
  private _robot?: IRobot;

  constructor(x: number, y: number) {
    this._maxX = x;
    this._maxY = y;
  }

  private isRobotPlaced() : boolean {
    return !!(this._robot);
  }

  public place (robot: IRobot, cb: LogCallback) : void {
    if (!(robot.direction in Direction)) {
      return cb(new Error('PLACE command error, invalid direction'));
    }

    if (robot.x < 0 || robot.y < 0 || robot.x > this._maxX || robot.y > this._maxY) {
      return cb(new Error('PLACE command error, invalid position'));
    }

    this._robot = robot;

    return cb(null);
  }

  public move (cb: LogCallback) : void {
    if (!this.isRobotPlaced()) {
      return cb(new Error('MOVE command error, robot not placed'));
    }

    let moved = false;
    switch (this._robot?.direction) {
      case 'NORTH':
        if (this._robot?.y >= 0
          && this._robot?.y < this._maxY) {
          this._robot.y += 1;
          moved = true;
        }
        break;
      case 'SOUTH':
        if (this._robot?.y <= this._maxY
          && this._robot?.y > 0) {
          this._robot.y -= 1;
          moved = true;
        }
        break;
      case 'EAST':
        if (this._robot?.x >= 0
          && this._robot?.x < this._maxX) {
          this._robot.x += 1;
          moved = true;
        }
        break;
      case 'WEST':
        if (this._robot?.x <= this._maxX
          && this._robot?.x > 0) {
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

  public left (cb: LogCallback) : void {
    if (!this.isRobotPlaced()) {
      return cb(new Error('LEFT command error, robot not placed'));
    }

    switch (this._robot?.direction) {
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

  public right(cb: LogCallback) : void {
    if (!this.isRobotPlaced()) {
      return cb(new Error('RIGHT command error, robot not placed'));
    }

    switch (this._robot?.direction) {
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
  public report(cb: LogCallback): void {
    if (!this.isRobotPlaced()) {
      return cb(new Error('RIGHT command error, robot not placed'));
    }

    return cb(null, `Output: ${this._robot?.x},${this._robot?.y},${this._robot?.direction}`);
  }

  public checkPlaceCommand (command: string): Place {
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

  public removeRobot () : void {
    this._robot = undefined;
  }
}
