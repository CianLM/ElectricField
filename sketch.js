let particle, extraParticle, newParticle;
let particles;

function setup() {
    createCanvas(displayWidth, displayHeight);
    particle = new Particle(createVector(100, 300), 20, 5e-6);
    extraParticle = new Particle(createVector(300, 300), 20, -5e-6);
    newParticle = new Particle(createVector(300, 400), 20, -5e-6);
    particles = [particle, extraParticle, newParticle]
}

function draw() {
    background(0);
    particles[0].pos.x = mouseX;
    particles[0].pos.y = mouseY;
    drawField(0, 0, displayWidth, displayHeight, 100, particles);
    drawParticles(particles);
}