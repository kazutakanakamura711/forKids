const {Vector2d, direction_vectors, mapping_direction_interger, mapping_interger_direction} = require('./vector.js')

function find_needed_rotation(x1, x2, current_direction)
{
    let x = x2.subtract(x1)
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
      //Do nothing
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

    // console.log(needed_rotation)
    return [needed_rotation, current_direction]
}

module.exports = {find_needed_rotation}

