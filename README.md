# toy-robot-challenge-ts
Toy Robot Challenge

You can initialize the robot by importing `Robot` class then initializing it by passing the max width and length of the table.
- e.g. if you want a 5x5 table, pass `new Robot(4, 4)` as start of coordinate is 0.

This game reads data from `src/testData/sample.json`. Modify the file to test commands.
## Allowed Commands
- `PLACE X,Y,F` where `X` is the x coordinate, `Y` is the y coordinate and `F` the direction
- `MOVE` - will move robot in the direction it's facing. Robot will ignore command if instruction will result in robot falling off the table
- `LEFT` - will rotate robot 90 degrees counter-clockwise.
- `RIGHT` - will rotate robot 90 degrees clockwise.
- `REPORT` - will display current location and direction of the robot

## Prerequisite
- NodeJS >= 14
- Before running the project, make sure to install dependencies by running `yarn`
## Commands
- `yarn build`- build the project
- `yarn start` - build and start the project
