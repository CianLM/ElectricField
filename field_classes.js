class Particle {
    constructor(position,q,r) {
        this.pos = position
        this.q = q
        this.r = r
    }

    draw() {
        ctx.moveTo(this.pos.x,this.pos.y)
        ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI,false)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
}

/**
 * A class to represent vectors and provide methods for
 * manipulation.
 */
class Vector {
    /**
     * Instantiates the vector with an x and y component.
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds the given vector to self.
     * @param {Vector} vector 
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    /**
     * Adds the two vectors given as arguments and returns a new vector.
     * @param {Vector} vector1 
     * @param {Vector} vector2
     * @return {Vector} The sum of the two vectors.
     */
    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    
    /**
     * Subtracts the given vector from self.
     * @param {Vector} vector 
     */
    sub(vector) {
        this.x -= vector.x;
        this.y -+ vector.y;
    }

    /**
     * Subtracts the second vector from the first vector. Returns the
     * result as a new vector.
     * @param {Vector} vector1 
     * @param {Vector} vector2
     * @return {Vector} The difference of the vectors.
     */
    static sub(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    /**
     * Returns the magnitude of self.
     * @return {Vector} The magnitude.
     */
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Returns the square of the magnitude of self.
     * @return {Vector} The square of the magnitude.
     */
    magSq() {
        return this.x ** 2 + this.y ** 2;
    }

    /**
     * Sets the magnitude of self to the value specified by scaling
     * the components.
     * @param {number} value 
     */
    setMag(value) {        
        this.mult(value/this.mag());
    }

    /**
     * Multiples the components of self by the given value.
     * @param {number} value 
     */
    mult(value) {
        this.x *= value;
        this.y *= value;
    }

    /**
     * Normalises the vector.
     */
    norm() {
        this.setMag(1);
    }

    /**
     * Returns the angle of the vector.
     * @return {number} The angle.
     */
    heading() {
        return Math.atan2(this.y, this.x);
    }
}