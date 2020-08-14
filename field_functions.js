window.onload = window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fieldVectors(20, charges);
    charges.forEach( (c) => c.draw())
}

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
    fieldVectors(20, charges)
    charges.forEach( (c) => c.draw())
})

function arrow(x,y,angle,length) {
    ctx.beginPath()
    //cl = 50;ctx.strokeStyle = "#"+parseInt(0xff*Math.abs(length)/cl).toString(16)+parseInt(0xc0*Math.abs(length)/cl).toString(16)+parseInt(0xcb*Math.abs(length)/cl).toString(16)
    ctx.strokeStyle=getColor(length); //red, blue, pink, yellow, magenta, lightblue
    ctx.moveTo(x,y);
    head = {"x":x+Math.cos(angle)*length,"y":y+Math.sin(angle)*length};
    ctx.lineTo(head["x"],head["y"]);
    ctx.moveTo(head["x"],head["y"]);
    ctx.lineTo(head["x"]-length/10*Math.cos(angle-Math.PI/7),head["y"]-length/10*Math.sin(angle-Math.PI/7));
    ctx.moveTo(head["x"],head["y"]);
    ctx.lineTo(head["x"]-length/10*Math.cos(angle+Math.PI/7),head["y"]-length/10*Math.sin(angle+Math.PI/7));
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws field vectors across the canvas with the specified increment.
 * @param {number} inc The increment between field points.
 * @param {Array<Particle>} charges The array of charges.
 */
function fieldVectors(inc, charges) {
    for (let i = 0; i < canvas.width/inc; i++) {
        for (let j = 0; j < canvas.height/inc; j++) {
            let position = new Vector(i*inc, j*inc);
            field = getField(position, charges);
            arrow(position.x, position.y, field.heading() ,field.mag());
        }
    }    
}

/**
 * Calculates the electric field vector due to an array of charges at 
 * the specified vector position.
 * @param {Vector} position The point to calculate the electric field.
 * @param {Array<Vector>} charges The array of charges.
 */
function getField(position, charges) {
    let field = new Vector(0,0);

    for (let c = 0; c < charges.length; c++) {
        let r = Vector.sub(position, charges[c].pos);

        if (r.mag() < charges[c].r) return new Vector(0,0);

        let magnitude = K * (charges[c].q / r.magSq());
        r.norm();
        r.mult(magnitude);
        field.add(r);
    }

    return field;
}

/**
 * Applies a model to the given value to find a set of rgb values and 
 * returns the result as a CSS string.
 * @param {number} value The normalised value to find the colour for.
 * @return {string} The rgb value format.
 */
function getColor(value) {
    let r = 10*value**2
    let g = 100 + 4*value
    let b = 500*1/value

    return "rgb(" + r + "," + g + "," + b + ")"
}