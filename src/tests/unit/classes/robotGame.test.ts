/* eslint-disable no-undef */
import { Robot } from '../../../classes';

describe('Constructor', () => {
  let robot: any;
  beforeEach(() => {
    robot = new Robot(4, 4);
  })

  test('- robot is not placed after initialization', () => {
    const isPlaced = robot.isRobotPlaced();
    expect(isPlaced).toBe(false);
  });
});

describe('PLACE command', () => {
  let robot: any;
  beforeEach(() => {
    robot = new Robot(4, 4);
  })
  afterEach(() => robot.removeRobot());

  test('- returns an error when direction is invalid', () => {
    const cb = jest.fn();
    
    robot.place({ x: 1, y: 1, direction: 'INVALID' }, cb);
    expect(cb).toHaveBeenCalledWith(new Error('PLACE command error, invalid direction'));
  });

  test('- returns an error when x is invalid', () => {
    const cb = jest.fn();

    robot.place({ x: 100, y: 1, direction: 'NORTH' }, cb);
    expect(cb).toHaveBeenCalledWith(new Error('PLACE command error, invalid position'));
  });

  test('- returns an error when y is invalid', () => {
    const cb = jest.fn();

    robot.place({ x: 1, y: 100, direction: 'NORTH' }, cb);
    expect(cb).toHaveBeenCalledWith(new Error('PLACE command error, invalid position'));
  });

  test('+ place robot on table when params are correct', () => {
    const cb = jest.fn();

    robot.place({ x: 1, y: 1, direction: 'NORTH' }, cb);
    const { details } = robot;
    expect(cb).toBeCalledWith(null);
    expect(details).not.toBeUndefined();
    expect(details.x).toBe(1);
    expect(details.y).toBe(1);
    expect(details.direction).toBe('NORTH');
  });
});

describe('LEFT command', () => {
  const cb = jest.fn();
  let robot: any;

  beforeEach(() => {
    robot = new Robot(4, 4);
  })
  afterEach(() => robot.removeRobot());

  describe('- When robot is not placed', () => {
    test('- returns an error `robot not placed`', () => {
      robot.left(cb);
      expect(cb).toBeCalledWith(new Error('LEFT command error, robot not placed'));
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'NORTH' }, () => {}));

    test('+ will change from NORTH to WEST', () => {
      robot.left(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('WEST');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'WEST' }, () => {}));

    test('+ will change from WEST to SOUTH', () => {
      robot.left(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('SOUTH');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'SOUTH' }, () => {}));

    test('+ will change from SOUTH to EAST', () => {
      robot.left(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('EAST');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'EAST' }, () => {}));

    test('+ will change from EAST to NORTH', () => {
      robot.left(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('NORTH');
    });
  });
});

describe('RIGHT command', () => {
  const cb = jest.fn();
  let robot: any;

  beforeEach(() => {
    robot = new Robot(4, 4);
  })
  afterEach(() => robot.removeRobot());

  describe('- When robot is not placed', () => {
    test('- returns an error `robot not placed`', () => {
      robot.right(cb);
      expect(cb).toBeCalledWith(new Error('RIGHT command error, robot not placed'));
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'NORTH' }, () => {}));

    test('+ will change from NORTH to EAST', () => {
      robot.right(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('EAST');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'WEST' }, () => {}));

    test('+ will change from WEST to NORTH', () => {
      robot.right(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('NORTH');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'SOUTH' }, () => {}));
    afterEach(() => robot.removeRobot());

    test('+ will change from SOUTH to WEST', () => {
      robot.right(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('WEST');
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'EAST' }, () => {}));
    afterEach(() => robot.removeRobot());

    test('+ will change from EAST to SOUTH', () => {
      robot.right(cb);
      const { details } = robot;

      expect(cb).toHaveBeenCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.direction).toBe('SOUTH');    });
  });
});

describe('MOVE command', () => {
  const cb = jest.fn();
  let robot: any;

  beforeEach(() => {
    robot = new Robot(4, 4);
  })
  afterEach(() => robot.removeRobot());

  describe('- When robot is not placed', () => {
    test('- returns an error `robot not placed`', () => {
      robot.move(cb);

      expect(cb).toBeCalledWith(new Error('MOVE command error, robot not placed'));
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => robot.place({ x: 0, y: 0, direction: 'WEST' }, () => {}));

    test('- will not move, when x = 0 and facing WEST', () => {
      robot.move(cb);

      expect(cb).toHaveBeenCalledWith(new Error('Falling off the table prevented, robot not moved'));
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => robot.place({ x: 0, y: 0, direction: 'SOUTH' }, () => {}));

    test('- will not move, when y = 0 and facing SOUTH', () => {
      robot.move(cb);

      expect(cb).toHaveBeenCalledWith(new Error('Falling off the table prevented, robot not moved'));
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => robot.place({ x: 0, y: 4, direction: 'NORTH' }, () => {}));

    test('- will not move, when y = maxValue and facing NORTH', () => {
      robot.move(cb);

      expect(cb).toHaveBeenCalledWith(new Error('Falling off the table prevented, robot not moved'));
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => robot.place({ x: 4, y: 0, direction: 'EAST' }, () => {}));

    test('- will not move, when x = maxValue and facing EAST', () => {
      robot.move(cb);

      expect(cb).toHaveBeenCalledWith(new Error('Falling off the table prevented, robot not moved'));
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'NORTH' }, () => {}));

    test('+ will move NORTH one step from 1,1 to 1,2', () => {
      robot.move(cb);
      const { details } = robot;

      expect(cb).toBeCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.x).toBe(1);
      expect(details.y).toBe(2);
      expect(details.direction).toBe('NORTH');
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'SOUTH' }, () => {}));

    test('+ will move SOUTH one step from 1,1 to 1,0', () => {
      robot.move(cb);
      const { details } = robot;

      expect(cb).toBeCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.x).toBe(1);
      expect(details.y).toBe(0);
      expect(details.direction).toBe('SOUTH');
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'EAST' }, () => {}));

    test('+ will move EAST one step from 1,1 to 2,1', () => {
      robot.move(cb);
      const { details } = robot;

      expect(cb).toBeCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.x).toBe(2);
      expect(details.y).toBe(1);
      expect(details.direction).toBe('EAST');
    });
  });
  
  describe('Move forward when robot is already placed', () => {
    beforeEach(() => robot.place({ x: 1, y: 1, direction: 'WEST' }, () => {}));

    test('+ will move WEST one step, from 1,1 to 0,1', () => {
      robot.move(cb);
      const { details } = robot;

      expect(cb).toBeCalledWith(null);
      expect(details).not.toBeUndefined();
      expect(details.x).toBe(0);
      expect(details.y).toBe(1);
      expect(details.direction).toBe('WEST');
    });
  });
});

describe('REMOVE robot', () => {
  let robot: any;
  let isPlacedFalse: boolean;
  let isPlacedTrue: boolean;
  beforeEach(() => {
    robot = new Robot(4, 4);
    robot.place({ x: 1, y: 1, direction: 'NORTH' }, () => {});
    isPlacedTrue = robot.isRobotPlaced();
    robot.removeRobot();
    isPlacedFalse = robot.isRobotPlaced();
  })

  test('+ will remove robot if ', () => {
    expect(isPlacedTrue).toBeTruthy();
    expect(isPlacedFalse).toBeFalsy();
  });
});

describe('Check PLACE command format', () => {
  let robot: any;
  beforeEach(() => {
    robot = new Robot(4, 4);
  })

  test('- will return command is invalid if direction is invalid', () => {
    const res = robot.checkPlaceCommand('PLACE 1,4,INVALID DIRECTION');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid if x > max', () => {
    const res = robot.checkPlaceCommand('PLACE 5,1,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid if y > max', () => {
    const res = robot.checkPlaceCommand('PLACE 1,5,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid when pattern is invalid', () => {
    const res = robot.checkPlaceCommand('PLACExxx,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('+ will return separated values from command if valid', () => {
    const res = robot.checkPlaceCommand('PLACE 1,4,NORTH');

    expect(res.isValid).toBeTruthy();
    expect(res.x).toBe(1);
    expect(res.y).toBe(4);
    expect(res.f).toBe('NORTH');
  });
});
