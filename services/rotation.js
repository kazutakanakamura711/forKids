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

function find_needed_rotation(x1, x2, current_direction)
    {
        let x1_vector = new Vector2d(x1)
        let x2_vector = new Vector2d(x2)
        let x = x2_vector.subtract(x1_vector)
        let direction_vector = direction_vectors[current_direction]
        let angle = x.angle(direction_vector)
        
        // console.log(angle)
        let needed_rotation = []
        let direction_value = mapping_direction_interger[current_direction]
        
        if(angle == 180)
        {
            // console.log("Right 2 times")
            needed_rotation.push(
                "turn_right",
                "turn_right",
            )
            direction_value = (direction_value + 2) % 4;
            current_direction = mapping_interger_direction[direction_value]
        }
        else if (angle < 90)
        {
          //No need to rotate in this case
        //   console.log("No rotation")
        }
        else
        {
          let half_pi = Math.PI/2
          let half_pi_minus = -Math.PI/2
          //check rotate anticlockwise
          let  new_vector1  = new Vector2d( [Math.cos( half_pi)* direction_vector.x - Math.sin(half_pi) * direction_vector.y, 
                               Math.sin(half_pi) * direction_vector.x + Math.cos(half_pi) * direction_vector.y ])
            // console.log(new_vector1)       
          let angle1 = x.angle(new_vector1)

          //check rotate clockwise
          let  new_vector2  = new Vector2d([Math.cos(half_pi_minus)* direction_vector.x - Math.sin(half_pi_minus) * direction_vector.y, 
                               Math.sin(half_pi_minus) * direction_vector.x + Math.cos(half_pi_minus) * direction_vector.y ])
                          
          let angle2 = x.angle(new_vector2)
        //   console.log(angle1, angle2)
        // console.log(new_vector2) 
          if(angle1 < angle2)
          {
            //rotate anticlockwise
            needed_rotation.push("turn_right")
            direction_value = (direction_value + 1)%4;
            current_direction = mapping_interger_direction[direction_value]
            // console.log("right")
          }
          else
          {
            needed_rotation.push("turn_left")
            direction_value = (direction_value - 1) % 4;
            current_direction = mapping_interger_direction[direction_value]
            // console.log("left")
          }
         }

        console.log(needed_rotation)
        return [needed_rotation, current_direction]
    }

//Unit test

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

export {find_needed_rotation, mapping_interger_direction, mapping_direction_interger,Vector2d}