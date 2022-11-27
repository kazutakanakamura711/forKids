const {Vector2d} = require ("../logic_functions/vector.js");

let v1 = new Vector2d([0,1]) // x = 0, y = 1
let v2 = new Vector2d([1,0])
let v3 = new Vector2d([0,-1])
let v4 = new Vector2d([Math.sqrt(2)/2,Math.sqrt(2)/2])
let v5 = new Vector2d([-Math.sqrt(2)/2,-Math.sqrt(2)/2])


test("should return 90 degrees", () => {
    const result = v1.angle(v2)
    expect(result).toBe(90)
  });

test("should return 180 degrees", () => {
    const result = v1.angle(v3)  
    expect(result).toBe(180)
});

test("should return 45 degrees", () => {
    const result = v1.angle(v4)
    expect(result).toBe(45)
});

test("should return 135 degrees", () => {
    const result = v1.angle(v5)
    expect(result).toBe(135)
    });