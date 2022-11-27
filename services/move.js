import {mapping_interger_direction, mapping_direction_interger, Vector2d} from './rotation.js'

function solve_up_down(x1, x2, current_direction)
{
    // Move along y axis firstly then move along x axis
    // Along y axis
    let moving_steps = []
    let direction_value = mapping_direction_interger[current_direction]

    let y_axix_steps = Math.abs(x2.y - x1.y)
    for(let i = 0; i < y_axix_steps;i++)
    {
        moving_steps.push("go_straight")
    }

    // Along x  axis
    let x_distance = x1.x - x2.x
    if(x_distance < 0)
    {
        if (current_direction == "up")
        {
            moving_steps.push("turn_right")
        }
        else 
        {
            moving_steps.push("turn_left")
        }
        direction_value = (direction_value + 1)%4;
        current_direction = mapping_interger_direction[direction_value]

    }
    if(x_distance > 0)
    {
        if (current_direction == "up")
        {
            moving_steps.push("turn_left")
        }
        else
        {
            moving_steps.push("turn_right")
        }
        direction_value = (direction_value - 1)%4;
        current_direction = mapping_interger_direction[direction_value]
    }

    for(let i = 0; i < Math.abs(x_distance); i++)
    {
        moving_steps.push("go_straight")
    }
    return  [moving_steps, current_direction]
}

function solve_left_right(x1, x2, current_direction)
{
    let moving_steps = []
    let direction_value = mapping_direction_interger[current_direction]

    let x_axix_steps = Math.abs(x1.x - x2.x)
    for(let i = 0; i < x_axix_steps;i++)
    {
        moving_steps.push("go_straight")
    }

    // Along x  axis
    let y_distance = x1.y - x2.y
    if(y_distance < 0)
    {
        if (current_direction == "left")
        {
            moving_steps.push("turn_left")
        }
        else 
        {
            moving_steps.push("turn_right")
        }
        direction_value = (direction_value + 1)%4;
        current_direction = mapping_interger_direction[direction_value]

    }
    if(y_distance > 0)
    {
        if (current_direction == "left")
        {
            moving_steps.push("turn_right")
        }
        else 
        {
            moving_steps.push("turn_left")
        }
        direction_value = (direction_value - 1)%4;
        current_direction = mapping_interger_direction[direction_value]
    }

    for(let i = 0; i < Math.abs(y_distance); i++)
    {
        moving_steps.push("go_straight")
    }
    return  [moving_steps, current_direction]
}


function move(x1, x2, current_direction)
{
    let x1_vector = new Vector2d(x1)
    let x2_vector = new Vector2d(x2)
    switch (current_direction)
    {
        case "up":
            return solve_up_down(x1_vector, x2_vector, current_direction)
        case "down":
            return solve_up_down(x1_vector, x2_vector, current_direction)
        case "left":
            return solve_left_right(x1_vector, x2_vector, current_direction)
        case "right":
            return solve_left_right(x1_vector, x2_vector, current_direction)
    }
}

//Unit test
// let x1 = new Vector2d([2,4])
// let x2 = new Vector2d([3,2])
// let x3 = new Vector2d([0,1])
// let x4 = new Vector2d([4,3])

// console.log(move(x1, x2, "up"))
// console.log(move(x2, x3,"left"))
// console.log(move(x3, x4,"right"))

/*
Expected results:
1. go_straight, go_straight,turn_right, go_straight: right
2. go_straight, go_straight, go_straight, turn_right, go_straight: down
3. go_straight, go_straight, go_straight, go_straight, turn_right, go_straight, go_straight : down

*/

export {move}