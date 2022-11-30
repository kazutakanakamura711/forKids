const {Vector2d} = require("./vector.js")

function solve_up_down(x1, x2, current_direction)
{
    // Move along y axis firstly then move along x axis
    let moving_steps = []
    let y_axix_steps = Math.abs(x2.y - x1.y)
    for(let i = 0; i < y_axix_steps;i++)
    {
        moving_steps.push("go_straight")
    }
    let x_distance = x2.x - x1.x
    if(x_distance < 0)
    {
        if (current_direction == "up")
        {
            moving_steps.push("turn_left")
        }
        else
        {
            moving_steps.push("turn_right")
        }
        current_direction = "left"
    }
    if(x_distance > 0)
    {
        if(current_direction == "up")
        {
            moving_steps.push("turn_right")
        }
        else
        {
            moving_steps.push("turn_left")
        }
        current_direction = "right"
    }
    for(let i = 0; i < Math.abs(x_distance); i++)
    {
        moving_steps.push("go_straight")
    }

    return  [moving_steps, current_direction]
}

function solve_left_right(x1, x2, current_direction)
{
    //Move along x axis  firstly, then y axis. 
    let moving_steps = []
    let x_axix_steps = Math.abs(x2.x - x1.x)
    for(let i = 0; i < x_axix_steps;i++)
    {
        moving_steps.push("go_straight")
    }
    let y_distance = x2.y - x1.y
    if(y_distance < 0)
    {
        if (current_direction == "right")
        {
            moving_steps.push("turn_left")
        }
        else 
        {
            moving_steps.push("turn_right")
        }
        current_direction = "up"
    }
    if(y_distance > 0)
    {
        if (current_direction == "right")
        {
            moving_steps.push("turn_right")
        }
        else 
        {
            moving_steps.push("turn_left")
        }
        current_direction = "down"
    }
    for(let i = 0; i < Math.abs(y_distance); i++)
    {
        moving_steps.push("go_straight")
    }

    return  [moving_steps, current_direction]
}

function move_easily(x1, x2, current_direction)
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

module.exports  =  {move_easily}