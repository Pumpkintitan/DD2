class Dot {
    constructor(glength, sx, sy, h, sb) {
        this.genome = new Genome()
        this.genome.generate(glength)
        this.pos = createVector(sx, sy)
        this.lpos = createVector(0, 0)
        this.energy = 100
        this.lenergy = 0
        this.dir = 1
        this.brain = new Brain(this.genome.decode(), h, sb)
        this.period = Math.random() * 2 - 1
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

    update(mapp) {
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
        this.data.bd = min(this.data.bdx, this.data.bdy)
        this.data.ocs = Math.sin(this.data.age * this.period)
        this.data.eng = this.energy
        this.data.deg = this.energy - this.lenergy
        //Switch per direction
        let shortot = 0
        let plantoc = 0
        let shortoc = 0
        let longot = 0
        let longoc = 0
        let LRot = 0
        let LRoc = 0
        switch (this.dir) {
            case 0:
                //mapp[y][x + 1]
                //Short(10), Long(40), and Plant(10) densities
                for (let i = 0; i < 40; i++) {
                    if (this.pos.x + i + 1 <= 99) {
                        if (i < 10) {
                            shortot++
                            if (mapp[this.pos.y][this.pos.x + 1 + i] == 1) {
                                shortoc++
                            }
                            if (mapp[this.pos.y][this.pos.x + 1 + i] == 2) {
                                plantoc++
                            }
                        }
                        longot++
                        if (mapp[this.pos.y][this.pos.x + 1 + i] == 1) {
                            longoc++
                        }
                    }
                }

                //Left(5) and Right(5) densities
                for (let i = -5; i < 6; i++) {
                    if (this.pos.y + i <= 99 && this.pos.y + i >= 0 && i != 0) {
                        LRot++
                        if (mapp[this.pos.y + i][this.pos.x] == 1) {
                            LRoc++
                        }
                    }
                }
                break;
            case 1:
                if (x != 0 && mapp[y][x - 1] == 0) {
                    x -= 1
                }
                break;
            case 2:
                if (y != mapp.length - 1 && mapp[y + 1][x] == 0) {
                    y += 1
                }
                break;
            case 3:
                if (y != 0 && mapp[y - 1][x] == 0) {
                    y -= 1
                }
                break;
        }
        this.data.pfd = shortoc / shortot
        this.data.pdf = plantoc / shortot
        this.data.lpf = longoc / longot
        this.data.pfd = LRoc / LRot
        let ptot = 0
        let dy = 100
        let dx = 100
        for (let i = 0; i < 100; i++) {
            if (mapp[this.pos.y][i] == 2) {
                if (Math.abs(i - this.pos.x) < dx) {
                    dx = Math.abs(i - this.pos.x)
                    this.data.pdx = i - this.pos.x
                }
                if (i - this.pos.x < 6 && i - this.pos.x > -6) {
                    ptot++
                }
            }
        }
        for (let i = 0; i < 100; i++) {
            if (mapp[i][this.pos.x] == 2) {
                if (Math.abs(i - this.pos.y) < dy) {
                    dy = Math.abs(i - this.pos.y)
                    this.data.pdy = i - this.pos.y
                }
                if (i - this.pos.y < 6 && i - this.pos.y > -6) {
                    ptot++
                }
            }
        }
        this.data.pid = ptot
    }
}