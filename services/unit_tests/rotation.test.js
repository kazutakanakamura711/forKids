const { find_needed_rotation } = require("../logic_functions/rotation.js");
const {Vector2d} = require ("../logic_functions/vector.js");

test("No need to rotate", () => {
    const result = find_needed_rotation(new Vector2d([0,2]), new Vector2d([2,2]), "right")
    const expected_results = [ [], 'right' ]
    expect(result).toEqual(expected_results);
  });

test("No need to rotate", () => {
    const result = find_needed_rotation(new Vector2d([2,2]), new Vector2d([3,3]), "right")
    const expected_results = [ [], 'right' ]
    expect(result).toEqual(expected_results);
});

test("Rotate 2 times because angle is 180 degree(opposite direction) ", () => {
    const result = find_needed_rotation(new Vector2d([2,2]), new Vector2d([0,2]), "right")
    const expected_results = [ [ 'turn_right', 'turn_right' ], 'left' ]
    expect(result).toEqual(expected_results);
});

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation(new Vector2d([2,2]), new Vector2d([4,4]), "left")
    const expected_results = [ [ 'turn_left' ], 'down' ]
    expect(result).toEqual(expected_results);
});

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation(new Vector2d([2,2]), new Vector2d([0,0]), "right")
    const expected_results = [ [ 'turn_left' ], 'up' ]
    expect(result).toEqual(expected_results);
    });

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation(new Vector2d([2,2]), new Vector2d([0,4]), "right")
    const expected_results = [ [ 'turn_right' ], 'down' ]
    expect(result).toEqual(expected_results);
    });


// console.log(find_needed_rotation([0,2], [2,2], "right")) 
// console.log(find_needed_rotation([2,2], [3,3], "right")) 
// console.log(find_needed_rotation([2,2], [0,2], "right")) 
// console.log(find_needed_rotation([2,2], [4,4], "left")) 
// console.log(find_needed_rotation([2,2], [0,0], "right")) 
// console.log(find_needed_rotation([2,2], [0,4], "right"))

/*
Expected result:
[ [], 'right' ]
[ [], 'right' ]
[ [ 'turn_right', 'turn_right' ], 'left' ]
[ [ 'turn_left' ], 'down' ]
[ [ 'turn_left' ], 'up' ]
[ [ 'turn_right' ], 'down' ]
*/