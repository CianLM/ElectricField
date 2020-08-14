let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let K = 1e5

charges = [
    new Particle(new Vector(canvas.width/2,canvas.height/2),1,50),
    new Particle(new Vector(canvas.width/4,canvas.height/2),-1,50),
    new Particle(new Vector(canvas.width*3/4,canvas.height/2),-1,50)
]
