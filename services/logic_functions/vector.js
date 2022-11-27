class Vector2d 
      {
        constructor(value) 
        {
          this.x = value[0]
          this.y = value[1]
          this.length = Math.sqrt(this.x**2 + this.y**2)
        }

        subtract (x2)
        {
            return new Vector2d([this.x- x2.x, this.y- x2.y])
        }
        
        dot_product(x2)
        {
            return this.x * x2.x + this.y * x2.y
        }
        
        angle(x2)
        {
          return (Math.acos(this.dot_product(x2)/(this.length * x2.length )))/Math.PI * 180  
        }
      }

let direction_vectors = {
"up" : new Vector2d([0,1]),
"right" : new Vector2d([1,0]),
"down" : new Vector2d([0,-1]),
"left": new Vector2d([-1,0]),
}

let mapping_direction_interger = {
    "up" : 0,
    "right" : 1,
    "down" : 2,
    "left": 3,
}

let mapping_interger_direction = [
    "up", "right", "down", "left"
]

module.exports = {Vector2d, direction_vectors, mapping_direction_interger, mapping_interger_direction}