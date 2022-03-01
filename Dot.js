class Dot {
    constructor(glength, sx, sy, h, sb) {
        this.genome = new Genome()
        this.genome.generate(glength)
        this.pos = createVector(sx, sy)
        this.brain = new Brain(this.genome.decode(), h, sb)
        let s = this.genome.s.replace(/\s/g, "")
        let l = Math.round(s.length / 3)
        let l2 = Math.round(2 * s.length / 3)
        this.r = (parseInt(s.substring(0, l), 16) % 150) + 50
        this.g = (parseInt(s.substring(l, l2), 16) % 150) + 50
        this.b = (parseInt(s.substring(l2, s.length), 16) % 150) + 50
    }

    draw() {
        fill(this.r, this.g, this.b)
        ellipse(this.pos.x * 6 + 3, this.pos.y * 6 + 3, 6)
    }

    move() {
        return Math.floor(Math.random() * 4)
    }
}