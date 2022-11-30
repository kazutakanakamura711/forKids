const {find_needed_rotation} = require("./rotation.js")
const {move_easily} = require("./easy_movement.js")

/*
Logic steps:
1. Rotate airplane to become easy movement
2. Move in the easy case
*/

function go_from_x1_to_x2(x1, x2, current_direction)
{
  let path = []

  //Rotate airplane to have exptected direction
  let needed_rotation 
  [needed_rotation, current_direction] = find_needed_rotation(x1, x2, current_direction)
  path.push(needed_rotation)

  //Easily move
  let moving_steps
  [moving_steps, current_direction] = move_easily(x1,x2, current_direction)
  path.push(moving_steps)
  
  return [path, current_direction]
}

module.exports = {go_from_x1_to_x2}