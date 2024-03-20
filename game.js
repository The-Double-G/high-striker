class Rectangle
{
    constructor(x, y, width, height, border, color, dy, acc, maxSpeed)
    {
        this.x = x
//made by gurpreet
        this.y = y
        this.width = width
        this.height = height
        this.border = border
        this.color = color
//made by gurpreet
        this.dy = dy
        this.acc = acc
        this.maxSpeed = maxSpeed
    }
    
    draw()
    {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        
        ctx.fillStyle = this.color
        ctx.fillRect(
//made by gurpreet
            this.x+this.border,
            this.y+this.border,
            this.width-2*this.border,
            this.height-2*this.border
        )
    }

    update()
    {
        this.dy = Math.min(this.maxSpeed, this.dy+this.acc)
        this.y += this.dy
    }
    
    impactGround()
    {
        if(this.y+this.height >= canvas.height)
        {
//made by gurpreet
            this.y = canvas.height - this.height
            this.dy = 0
        }
    }
}

var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

//made by gurpreet
var power1 = 0
var increasePower1 = 0
var powerPerRefresh1 = 0.25
var power2 = 0
var increasePower2 = 0
var powerPerRefresh2 = 0.25

var square1 = new Rectangle(
    canvas.width/2 - 100,// x
    canvas.height,                  // y
    100,                // width
    100,                // height
    10,                 // border size
    "red",              // color
    0,                  // initial speed
//made by gurpreet
    0.25,               // acceleration
    20                  // max speed (due to gravity)
)

var square2 = new Rectangle(
    canvas.width/2 + 100,// x
    canvas.height,                  // y
    100,                // width
    100,                // height
//made by gurpreet
    10,                 // border size
    "blue",              // color
    0,                  // initial speed
    0.25,               // acceleration
    20                  // max speed (due to gravity)
)
var background = new Rectangle(0,-100,                  // y
    10000,                // width
    10000,                // height
//made by gurpreet
    10,                 // border size
    "red",              // color
    0,                  // initial speed
    0.25,               // acceleration
    20                  // max speed (due to gravity)
)

function animate()
{
    if(gameStatus == "On"){
        requestAnimationFrame(animate)
//made by gurpreet
    }
    

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    power1 += increasePower1

    square1.update()
    square1.impactGround()
//made by gurpreet
    square1.draw()

    power2 += increasePower2

    square2.update()
    square2.impactGround()
//made by gurpreet
    square2.draw()

    ctx.font = "40px Arial"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText(Math.round(player1Score), canvas.width/2-100, 50)
//made by gurpreet
    ctx.fillText(Math.round(player2Score), canvas.width/2+100, 50)
    player1Score=Math.min(square1.y,player1Score)
    if(Math.sign(player1Score)==-1){
        square1.y = 100
        
        gameStatus = "OffByDeath"
//made by gurpreet
        
    }else if(player1turns>=3&&player2turns>=3){
        
        gameStatus = "Off"
        
    }
    player2Score=Math.min(square2.y,player2Score)
    if(Math.sign(player2Score)==-1){
        square2.y = 100
        
        gameStatus = "OffByDeath"
        
    }else if(player1turns>=3&&player2turns>=3){
//made by gurpreet
        
        gameStatus = "Off"
        
    }
    if(player1turns>=3){
        
        ctx.fillText("Player1 Turn Over", canvas.width/2-400, 50)
        
//made by gurpreet
    }
    if(player2turns>=3){
        
        ctx.fillText("Player2 Turn Over", canvas.width/2+400, 50)
        
//made by gurpreet
    }
    
}
function checkOver(){
    if(gameStatus=="Off"){
        if(player1Score<player2Score){
            setTimeout(function() {
                background.color = "green"
                background.draw()
                ctx.fillStyle = "black"
                ctx.fillText("Player1 Won With The Lowest Score!", canvas.width/2, 50)
            },3000)
            
//made by gurpreet
        }else{
            setTimeout(function() {background.color = "blue"
            background.draw()
            ctx.fillStyle = "black"
            ctx.fillText("Player2 Won With The Lowest Score!", canvas.width/2, 50)
            },3000)
            
        }
//made by gurpreet
    }
    else if(gameStatus=="OffByDeath"){
        if(player1Score<player2Score){
            setTimeout(function() {background.color = "yellow"
            background.draw()
            ctx.fillStyle = "black"
            ctx.fillText("Player2 Won By Death!", canvas.width/2, 50)
            },3000)
            
        }else{
            setTimeout(function() {background.draw()
                ctx.fillStyle = "black"
                ctx.fillText("Player1 Won By Death!", canvas.width/2, 50)
//made by gurpreet
            },3000)
            
        }
    }
    if(gameStatus=="On"){
        requestAnimationFrame(checkOver)
    }
    
}
var gameStatus = "On"
animate()
checkOver()
//made by gurpreet
var player1Score=999999999999999
var player1turns=0
var player2turns=0
var player2Score=999999999999999
//made by gurpreet


addEventListener("keydown", function(event)
{
    if(player1turns<3){
        if(event.key == "a")
        {
//made by gurpreet
            increasePower1 = powerPerRefresh1
        }
    }
    
})

addEventListener("keyup", function(event)
{
    if(event.key == "a")
//made by gurpreet
    {
        square1.dy -= power1
        power1 = 0
        increasePower1 = 0
        player1turns++
    }
})

addEventListener("keydown", function(event)
//made by gurpreet
{
    if(player2turns<3){
        if(event.key == "l")
        {
            increasePower2 = powerPerRefresh2
        }
//made by gurpreet
    }else{
        ctx.fillText("Player2 Turn Over", canvas.width/2+100, 50)
    }
    
})
//made by gurpreet
addEventListener("keyup", function(event)
{
    if(event.key == "l")
    {
        square2.dy -= power2
        power2 = 0
        increasePower2 = 0
//made by gurpreet
        player2turns++
    }
})
