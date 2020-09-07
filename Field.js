let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let k = 1e5
let timestart = Date.now()
window.onload = window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fieldVectors(10)
    charges.forEach( (c) => c.draw())
    timeload = Date.now()-timestart
    console.log(timeload)
    //squares()
  }

class Particle {
    constructor(x,y,q,r) {
        this.x = x
        this.y = y
        this.q = q
        this.r = r
        this.draw()
    }
    draw() {
        ctx.moveTo(this.x,this.y)
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
}

charges = [ new Particle(window.innerWidth/2,window.innerHeight/2,1,50)//, random inital charge //-Math.floor(Math.random()*3)
    // new Particle(window.innerWidth/3,window.innerHeight/2,1,50),
    // new Particle(window.innerWidth*2/3,window.innerHeight/2,1,50),
    // new Particle(window.innerWidth/2,window.innerHeight/2 + window.innerWidth*1/6,-1,50),
    // new Particle(window.innerWidth/2,window.innerHeight/2 - window.innerWidth*1/6,-1,50)
]

function fieldVectors(inc) {
    for (let i = 0; i < canvas.width/inc; i++) {
        for (let j = 0; j < canvas.height/inc; j++) {
                electric_field = coulombs(i*inc,j*inc)
                arrow(inc*i,inc*j,electric_field[1],electric_field[0])
        }
    }    
} 

function box(start_x,start_y,box_width,box_height,thickness,color) {
ctx.beginPath()
ctx.fillStyle = color
ctx.fillRect(start_x,start_y,box_width,thickness)
ctx.fillRect(start_x,start_y,thickness,box_height)
ctx.fillRect(start_x,start_y+box_height-thickness,box_width,thickness)
ctx.fillRect(start_x+box_width-thickness,start_y,thickness,box_height)
ctx.closePath()
}

//     box(580,innerHeight/2-50,100,100,5,'white');
// colors = [{pos:0,r:255,g:255,b:255},{pos:1,r:255,g:255,b:255}]; arrow(window.innerWidth/2,window.innerHeight/2,Math.PI,250)