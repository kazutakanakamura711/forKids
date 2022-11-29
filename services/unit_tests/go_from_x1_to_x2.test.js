const {go_from_x1_to_x2} = require("../logic_functions/go_from_x1_to_x2.js")

let x1 = [2,4]
let x2 = [3,2]
let x3 = [0,1]
let x4 = [4,3]
let x5 = [4,1]
let x6 = [0,2]

test("For up direction, easy case", () => {
    const result = go_from_x1_to_x2(x1, x2, "up")
    const expected_result = [
                            [ 
                                [], 
                                [ "go_straight", "go_straight", "turn_right", "go_straight" ] 
                            ],
                            "right"
                            ]
    expect(result).toEqual(expected_result)
});

test("For right direction, > 90 degrees case", () => {
    const result = go_from_x1_to_x2(x2, x3, "right")
    const expected_result = [
                            [
                                [ "turn_left" ],
                                ["go_straight","turn_left","go_straight","go_straight","go_straight"]
                            ],
                            "left"
                            ]
    expect(result).toEqual(expected_result)
});

test("For right direction, need to rotate 2 times", () => {
    const result = go_from_x1_to_x2(x2, x6, "right")
    const expected_result = [
                            [
                                [ "turn_right", "turn_right" ],
                                [ "go_straight", "go_straight", "go_straight" ]
                            ],
                            "left"
                            ]
    expect(result).toEqual(expected_result)
});

test("For left direction, easy case", () => {
    const result = go_from_x1_to_x2(x3, x5, "left")
    const expected_result = [
                            [ 
                                ["turn_right","turn_right"], 
                                [ "go_straight", "go_straight", "go_straight","go_straight" ] 
                            ],
                            "right"
                            ]
    expect(result).toEqual(expected_result)
});

//From now, test only 2 points with 4  different directions
test("For right direction", () => {
    const result = go_from_x1_to_x2(x3, x4, "right")
    const expected_result = [
                            [
                                [],
                                ["go_straight","go_straight","go_straight","go_straight","turn_right","go_straight","go_straight"]
                            ],
                            "down"
                            ]
    expect(result).toEqual(expected_result)
});

test("For down direction", () => {
    const result = go_from_x1_to_x2(x3, x4, "down")
    const expected_result = [
                            [
                                [],
                                ["go_straight","go_straight","turn_left","go_straight","go_straight","go_straight","go_straight"]
                            ],
                            "right"
                            ]
    expect(result).toEqual(expected_result)
});

test("For up direction", () => {
    const result = go_from_x1_to_x2(x3, x4, "up")
    const expected_result = [
                            [
                                [ "turn_right" ],
                                ["go_straight","go_straight","go_straight","go_straight","turn_right","go_straight", "go_straight"]
                            ],
                            "down"
                            ]
    expect(result).toEqual(expected_result)
});

test("For left direction", () => {
    const result = go_from_x1_to_x2(x3, x4, "left")
    const expected_result = [
                            [
                                [ "turn_left" ],
                                ["go_straight","go_straight","turn_left","go_straight","go_straight", "go_straight","go_straight"]
                            ],
                            "right"
                            ]
    expect(result).toEqual(expected_result)
});
