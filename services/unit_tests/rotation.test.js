const { find_needed_rotation } = require("../logic_functions/rotation.js");

test("No need to rotate, angle = 0 degree", () => {
    const result = find_needed_rotation([0,2],[2,2], "right")
    const expected_results = [ [], "right" ]
    expect(result).toEqual(expected_results);
  });

test("No need to rotate, angle < 45 degrees", () => {
    const result = find_needed_rotation([2,4],[2,2], "up")
    const expected_results = [ [], "up" ]
    expect(result).toEqual(expected_results);
});

test("No need to rotate, angle = 45  degrees", () => {
    const result = find_needed_rotation([2,2], [3,3], "right")
    const expected_results = [ [], "right" ]
    expect(result).toEqual(expected_results);
});

test("Rotate 1 time, angle = 90  degrees", () => {
    const result = find_needed_rotation([1,2], [1,3], "right")
    const expected_results = [ ["turn_right"], "down" ]
    expect(result).toEqual(expected_results);
});

test("Rotate 2 times because angle is 180 degree(opposite direction) ", () => {
    const result = find_needed_rotation([2,2], [0,2], "right")
    const expected_results = [ [ "turn_right", "turn_right" ], "left" ]
    expect(result).toEqual(expected_results);
});

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation([2,2], [4,4], "left")
    const expected_results = [ [ "turn_left" ], "down" ]
    expect(result).toEqual(expected_results);
});

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation([2,2], [0,0], "right")
    const expected_results = [ [ "turn_left" ], "up" ]
    expect(result).toEqual(expected_results);
    });

test("Rotating 1 time is enough because original angle is 135", () => {
    const result = find_needed_rotation([2,2], [0,4], "right")
    const expected_results = [ [ "turn_right" ], "down" ]
    expect(result).toEqual(expected_results);
    });
