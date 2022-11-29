const {Vector2d, direction_vectors, mapping_direction_interger, mapping_interger_direction} = require('./vector.js')

function find_needed_rotation(x1, x2, current_direction)
{
    let x1_vector = new Vector2d(x1)
    let x2_vector = new Vector2d(x2)
    let x = x2_vector.subtract(x1_vector)
    let direction_vector = direction_vectors[current_direction]
    let angle = x.angle(direction_vector)
    let needed_rotation = []
    let direction_value = mapping_direction_interger[current_direction]
    
    if(angle == 180)
    {
        needed_rotation.push( "turn_right","turn_right")
        direction_value = (direction_value + 2) % 4;
        current_direction = mapping_interger_direction[direction_value]
    }
    else if (angle < 90)
    {
      // No need to rotate
    }
    else
    {
      //Caculate rotate anticlockwise
      let new_vector1 = new Vector2d([direction_vector.y, -direction_vector.x])
      let angle1 = x.angle(new_vector1)

      //Caculate rotate clockwise
      let new_vector2 = new  Vector2d([-direction_vector.y,direction_vector.x])
      let angle2 = x.angle(new_vector2)
      if(angle1 < angle2)
      {
        //Rotate anticlockwise
        needed_rotation.push("turn_left")
        direction_value = (direction_value + 3) % 4;
        current_direction = mapping_interger_direction[direction_value]
      }
      else
      {
        //Rotate clockwise
        needed_rotation.push("turn_right")
        direction_value = (direction_value + 1)%4;
        current_direction = mapping_interger_direction[direction_value]
      }
    }

    return [needed_rotation, current_direction]
}

module.exports = {find_needed_rotation}

