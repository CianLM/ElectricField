function centered_clock() {
    setInterval(() => {
        let d = new Date()
        arrow(canvas.width/2,canvas.height/2,2*Math.PI*d.getSeconds()/(60),200)
        console.log(d.getSeconds())
    }, 1000);
}

function general_clock() {
setInterval(() => {
    let d = new Date()
    for (let i = 0; i < canvas.width/10; i++) {
        for (let j = 0; j < canvas.height/10; j++) {
            arrow(10*i,10*j,2*Math.PI*d.getSeconds()/(60),10)
        }
    }            
    }, 1000);
}

let xclick; let yclick; const rect = canvas.getBoundingClientRect(); min_radius =35
function createCircle(canvas, event) {

  //console.log("Up, x: " + xclick + " y: " + yclick)
}
canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect()
  xclick = event.clientX - rect.left
  yclick = event.clientY - rect.top
  holdstart = Date.now()
  grow_anim = setInterval(() => {
    ctx.moveTo(xclick,yclick)
    ctx.arc(xclick,yclick,((Date.now()-holdstart)/100)**2,0,2*Math.PI,false)
    ctx.fillStyle = 'white'
    ctx.fill()
  }, 50);
})
canvas.addEventListener('mouseup', function(e) {
    clearInterval(grow_anim)
    const xlift = e.clientX - rect.left
    const ylift = e.clientY - rect.top
    holdtime = Date.now() - holdstart
    charges.push(new Particle(xclick,yclick,-1,(holdtime/100)**2 > min_radius ? (holdtime/100)**2 : min_radius))
    canvas.height = window.innerHeight;
    fieldVectors(10)
    charges.forEach( (c) => c.draw())
})

function arrow(x,y,angle,length) {
    ctx.beginPath()
    //cl = 50;ctx.strokeStyle = "#"+parseInt(0xff*Math.abs(length)/cl).toString(16)+parseInt(0xc0*Math.abs(length)/cl).toString(16)+parseInt(0xcb*Math.abs(length)/cl).toString(16)
    ctx.strokeStyle="blue" //red, blue, pink, yellow, magenta, lightblue
    ctx.moveTo(x,y)
    head = {"x":x+Math.cos(angle)*length,"y":y+Math.sin(angle)*length}
    ctx.lineTo(head["x"],head["y"])
    ctx.moveTo(head["x"],head["y"])
    ctx.lineTo(head["x"]-length/10*Math.cos(angle-Math.PI/7),head["y"]-length/10*Math.sin(angle-Math.PI/7));
    ctx.moveTo(head["x"],head["y"])
    ctx.lineTo(head["x"]-length/10*Math.cos(angle+Math.PI/7),head["y"]-length/10*Math.sin(angle+Math.PI/7));
    ctx.stroke()
    ctx.closePath();
}

function coulombs(x,y) {
    E_x = 0
    E_y = 0
    for (let c = 0; c < charges.length; c++) {
        r = Math.hypot(charges[c].x-x,charges[c].y-y)
        if(r<=charges[c].r) {return [0,0]}
        E_f = -k * charges[c].q / Math.hypot(charges[c].x-x,charges[c].y-y)**2
        E_angle = Math.atan2(charges[c].y-y,charges[c].x-x)
        E_x += E_f*Math.cos(E_angle)
        E_y += E_f*Math.sin(E_angle)
    }
    return [Math.hypot(E_x,E_y),Math.atan2(E_y,E_x)]
}