const {move_easily} = require("../logic_functions/easy_movement.js")

let x1 = [2,4]
let x2 = [3,2]
let x3 = [0,1]
let x4 = [4,3]

test("For up direction", () => {
    const result = move_easily(x1, x2, "up")
    const expected_result = [["go_straight","go_straight","turn_right", "go_straight"],"right"]
    expect(result).toEqual(expected_result)
});

test("For down direction", () => {
    const result = move_easily(x3, x4,"down")
    const expected_result = [["go_straight","go_straight","turn_left","go_straight","go_straight","go_straight","go_straight"],"right"]
    expect(result).toEqual(expected_result)
});

test("For left direction", () => {
    const result = move_easily(x2, x3,"left")
    const expected_result = [["go_straight","go_straight","go_straight","turn_right","go_straight"],"up"]
    expect(result).toEqual(expected_result)
});

test("For right direction", () => {
    const result = move_easily(x3, x4,"right")
    const expected_result = [["go_straight","go_straight","go_straight","go_straight","turn_right","go_straight","go_straight"],"down"]
    expect(result).toEqual(expected_result)
});