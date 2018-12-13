const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images 
// i dont have any

// load audio
// i dont have any

// variables
const snake = [];
let score = 0;
let highScore = 0;
let food;
let newGame = false;

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

// create food
function createFood() {
    food = {
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    }
} createFood();

// create snake
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

// control the snake
let d;
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( (key == 37 || key == 65) && d != "RIGHT"){
        d = "LEFT";
    }else if((key == 38 || key == 87) && d != "DOWN"){
        d = "UP";
    }else if((key == 39 || key == 68) && d != "LEFT"){
        d = "RIGHT";
    }else if((key == 40 || key == 83) && d != "UP"){
        d = "DOWN";
    }
}

// check collison function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// check if new food is in the snake
function checkFood(food,array){
    for(let i = 0; i < array.length; i++){
        if(food.x == array[i].x && food.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){

    // draw background
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0,19*box,20*box);
    ctx.fillStyle = "white";
    ctx.fillRect(box,3*box,17*box,15*box);
    // draw snake
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "lightgreen";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    // draw food
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x+box/2,food.y+box/2,box/2,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "#ff3333";
    ctx.beginPath();
    ctx.arc(food.x+box*0.55,food.y+box*0.4,box*0.29,0,2*Math.PI);
    ctx.fill();
    

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction 
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++
        do {
            createFood();
        } while (checkFood(food,snake));
        // leave the tail
    }else{
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over 
     if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box ||collision(newHead,snake)){
        ctx.fillStyle = "red";
        ctx.fillRect(newHead.x,newHead.y,box,box);
        clearInterval(game);
        if (score > highScore){
            highScore = score;
            
        }
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "gold";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);

    ctx.fillStyle = "gold";
    ctx.font = "45px Changa one";
    ctx.fillText(highScore,16*box,1.6*box);

}

// call draw function every 100 ms
let game = setInterval(draw, 70);
