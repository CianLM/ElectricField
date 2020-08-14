let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let k = 1e5
window.onload = window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fieldVectors(10)
    charges.forEach( (c) => c.draw())
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

charges = [
    new Particle(canvas.width/2,canvas.height/2,1,50)//,
    // new Particle(canvas.width/4,canvas.height/2,-1,50),
    // new Particle(canvas.width*3/4,canvas.height/2,-1,50)
]

function fieldVectors(inc) {
    for (let i = 0; i < canvas.width/inc; i++) {
        for (let j = 0; j < canvas.height/inc; j++) {
                electric_field = coulombs(i*inc,j*inc)
                arrow(inc*i,inc*j,electric_field[1],electric_field[0])
        }
    }    
} 
