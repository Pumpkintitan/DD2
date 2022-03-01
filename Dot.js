class Dot {
    constructor(glength, sx, sy, h, sb) {
        this.genome = new Genome()
        this.genome.generate(glength)
        this.pos = createVector(sx, sy)
        this.lpos = createVector(0, 0)
        this.brain = new Brain(this.genome.decode(), h, sb)
        let s = this.genome.s.replace(/\s/g, "")
        let l = Math.round(s.length / 3)
        let l2 = Math.round(2 * s.length / 3)
        this.r = (parseInt(s.substring(0, l), 16) % 150) + 50
        this.g = (parseInt(s.substring(l, l2), 16) % 150) + 50
        this.b = (parseInt(s.substring(l2, s.length), 16) % 150) + 50
        this.data = {
            age: 0,
            rnd: 0,
            pfd: 0,
            plr: 0,
            lpf: 0,
            lmy: 0,
            lmx: 0,
            bdy: 0,
            bdx: 0,
            lx: 0,
            ly: 0,
            bd: 0,
            gen: 0,
            pld: 0,
            eng: 0,
            deg: 0,
            pdf: 0,
            osc: 0,
            pid: 0,
            pdy: 0,
            pdx: 0
        }
    }

    draw() {
        fill(this.r, this.g, this.b)
        ellipse(this.pos.x * 6 + 3, this.pos.y * 6 + 3, 6)
    }

    move() {
        this.lpos = this.pos
        return Math.floor(Math.random() * 4)
    }

    update() {
        this.data.age++
        this.data.rnd = Math.random() * 2 - 1
        this.data.lmy = this.pos.y = this.lpos.y
        this.data.lmx = this.pos.x = this.lpos.x
        if (this.pos.y > 50) {
            this.data.bdy = 100 - this.pos.y
        } else {
            this.data.bdy = this.pos.y
        }
        if (this.pos.x > 50) {
            this.data.bdx = 100 - this.pos.x
        } else {
            this.data.bdx = this.pos.x
        }

    }
}