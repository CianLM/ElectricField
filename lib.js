class Particle {
    constructor(position, radius, charge) {
        this.pos = position;
        this.q = charge;
        this.color = this.getColor();
        this.r = radius
    }

    draw() {
        stroke(this.color);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }

    fieldVector(position) {
        let K = 9e9
        let r = p5.Vector.sub(position, this.pos)
        let magnitude = K * (this.q/r.magSq())
        return r.normalize().mult(magnitude)
    }

    getColor() {
        if (this.q > 0) {
            return 'red'
        } else {
            return 'blue'
        }
    }
}

function drawVector(position, vector) {
    let endX = position.x + vector.mag()*Math.cos(vector.heading())
    let endY = position.y + vector.mag()*Math.sin(vector.heading())
    line(position.x, position.y, endX, endY)
}

function drawField(x1, y1, x2, y2, n, particles) {
    stroke('green')
    for (let x = x1; x < x2; x += (x2-x1)/n) {
        for (let y = y1; y < y2; y += (y2-y1)/n) {
            let vector = createVector(0,0);
            let position = createVector(x, y);
            
            for (let i = 0; i < particles.length; i++) {
                vector.add(particles[i].fieldVector(position));
            }
            
            vector.setMag(constrain(vector.mag(), 0, 15));
            drawVector(position, vector);
        }
    }
}

function drawParticles(particles) {
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
    }
}
