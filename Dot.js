class Dot {
    constructor(glength, sx, sy, h) {
        this.dead = false
        this.genome = new Genome()
        this.genome.generate(glength)
        this.pos = createVector(sx, sy)
        this.lposx = 0
        this.lposy = 0
        this.energy = 100
        this.lenergy = 0
        this.dir = 3
        this.moved = 4
        this.brain = new Brain(this.genome.decode(), h)
        this.period = Math.random() * 2 - 1
        let s = this.genome.s.replace(/\s/g, "")
        let l = Math.round(s.length / 3)
        let l2 = Math.round(2 * s.length / 3)
        this.r = (parseInt(s.substring(0, l), 16) % 150) + 50
        this.g = (parseInt(s.substring(l, l2), 16) % 150) + 50
        this.b = (parseInt(s.substring(l2, s.length), 16) % 150) + 50
        this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    draw(G) {
        fill(this.r, this.g, this.b)
        ellipse(this.pos.x * ((100/GRID) * 6) + ((100/GRID) * 3), this.pos.y * ((100/GRID) * 6) + ((100/GRID) * 3), ((100/GRID) * 6))
    }

    action() {
        console.log(this.data[17], this.data[12])
        this.lenergy = this.energy
        this.lposx = this.pos.x
        this.lposy = this.pos.y
        this.energy--
        let choice = this.brain.getoutput(this.data)
        switch (choice[0]) {
            case 0: //OSC
                this.period = choice[1]
                break;
            case 1: //Mfd
                this.moved = this.dir
                this.energy--
                break;
            case 2: //Mrn
                this.moved = Math.floor(Math.random() * 4)
                this.energy--
                break;
            case 3: //Mrv
                this.moved = (this.dir + 2) % 4
                this.energy--
                break;
            case 4: //Mx-
                this.moved = 2
                this.energy--
                break;
            case 5: //Mx+
                this.moved = 0
                this.energy--
                break;
            case 6: //My-
                this.moved = 3
                this.energy--
                break;
            case 7: //My+
                this.moved = 1
                this.energy--
                break;
            case 8: //ML
                this.moved = (this.dir - 1) % 4
                this.energy--
                break;
            case 9: //MR
                this.moved = (this.dir + 1) % 4
                this.energy--
                break;
            case 10: //Plt
                console.log("PLANT")
                this.energy--
                break;
            case 11: //NON
                console.log("nothing")
                break;
            case 12: //Spn
                console.log("spawn")
                this.energy -= 50
                break;
            case 13: //Eat
                this.energy += 20
                console.log("eat plant")
                break;

        }
    }

    showbrain() {
        this.brain.show()
    }

    update(mapp) {
        if (this.energy <= 0){
            this.dead = true
        }
        this.moved = 4
        this.data[0] += 0.001 //age
        this.data[1] = Math.random() * 2 - 1 //random
        this.data[5] = this.pos.y - this.lposy //lmy
        this.data[6] = this.pos.x - this.lposx //lmx
        this.data[9] = this.pos.x / 100 //lx
        this.data[10] = this.pos.y / 100 //ly
        if (this.pos.y > (mapp.length/2)) {
            this.data[7] = (mapp.length - this.pos.y) / 100 //bdy
        } else {
            this.data[7] = this.pos.y / 100 //bdy
        }
        if (this.pos.x > (mapp.length/2)) {
            this.data[8] = (mapp.length - this.pos.x) / 100 //bdx
        } else {
            this.data[8] = this.pos.x / 100 //bdx
        }
        this.data[11] = min(this.data[7], this.data[8]) //bd
        this.data[16] = Math.sin(this.data[0] * this.period * 100) //osc
        this.data[13] = this.energy / 100 //eng
        this.data[14] = (this.energy - this.lenergy) / 100 //deg
        //Switch per direction
        let shortot = 0
        let plantoc = 0
        let shortoc = 0
        let longot = 0
        let longoc = 0
        let LRot = 0
        let LRoc = 0
        switch (this.dir) {
            //   3
            //  2+0
            //   1
            case 0:
                //mapp[y][x + 1]
                //Short(10), Long(40), and Plant(10) densities
                for (let i = 0; i < 40; i++) {
                    if (this.pos.x + i + 1 <= (mapp.length - 1)) {
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
                    if (this.pos.y + i <= (mapp.length - 1) && this.pos.y + i >= 0 && i != 0) {
                        LRot++
                        if (mapp[this.pos.y + i][this.pos.x] == 1) {
                            LRoc++
                        }
                    }
                }
                break;
            case 1:
                //mapp[y + 1][x]
                //Short(10), Long(40), and Plant(10) densities
                for (let i = 0; i < 40; i++) {
                    if (this.pos.y + i + 1 <= (mapp.length - 1)) {
                        if (i < 10) {
                            shortot++
                            if (mapp[this.pos.y + 1 + i][this.pos.x] == 1) {
                                shortoc++
                            }
                            if (mapp[this.pos.y + 1 + i][this.pos.x] == 2) {
                                plantoc++
                            }
                        }
                        longot++
                        if (mapp[this.pos.y + 1 + i][this.pos.x] == 1) {
                            longoc++
                        }
                    }
                }

                //Left(5) and Right(5) densities
                for (let i = -5; i < 6; i++) {
                    if (this.pos.x + i <= (mapp.length - 1) && this.pos.x + i >= 0 && i != 0) {
                        LRot++
                        if (mapp[this.pos.y][this.pos.x + i] == 1) {
                            LRoc++
                        }
                    }
                }
                break;

            case 2:
                //mapp[y][x - 1]
                //Short(10), Long(40), and Plant(10) densities
                for (let i = 0; i < 40; i++) {
                    if (this.pos.x - i - 1 >= 0) {
                        if (i < 10) {
                            shortot++
                            if (mapp[this.pos.y][this.pos.x - 1 - i] == 1) {
                                shortoc++
                            }
                            if (mapp[this.pos.y][this.pos.x - 1 - i] == 2) {
                                plantoc++
                            }
                        }
                        longot++
                        if (mapp[this.pos.y][this.pos.x - 1 - i] == 1) {
                            longoc++
                        }
                    }
                }

                //Left(5) and Right(5) densities
                for (let i = -5; i < 6; i++) {
                    if (this.pos.y + i <= (mapp.length - 1) && this.pos.y + i >= 0 && i != 0) {
                        LRot++
                        if (mapp[this.pos.y + i][this.pos.x] == 1) {
                            LRoc++
                        }
                    }
                }
                break;
            case 3:
                //mapp[y - 1][x]
                //Short(10), Long(40), and Plant(10) densities
                for (let i = 0; i < 40; i++) {
                    if (this.pos.y - i - 1 >= 0) {
                        if (i < 10) {
                            shortot++
                            if (mapp[this.pos.y - 1 - i][this.pos.x] == 1) {
                                shortoc++
                            }
                            if (mapp[this.pos.y - 1 - i][this.pos.x] == 2) {
                                plantoc++
                            }
                        }
                        longot++
                        if (mapp[this.pos.y - 1 - i][this.pos.x] == 1) {
                            longoc++
                        }
                    }
                }

                //Left(5) and Right(5) densities
                for (let i = -5; i < 6; i++) {
                    if (this.pos.x + i <= (mapp.length - 1) && this.pos.x + i >= 0 && i != 0) {
                        LRot++
                        if (mapp[this.pos.y][this.pos.x + i] == 1) {
                            LRoc++
                        }
                    }
                }
                break;
        }
        if (shortot != 0) {
            this.data[2] = shortoc / shortot //pfd
            this.data[15] = plantoc / shortot //pdf
        } else {
            this.data[2] = 0 //pfd
            this.data[15] = 0 //pdf
        }

        if (longot != 0) {
            this.data[4] = longoc / longot //lpf
        } else {
            this.data[4] = 0 //lpf
        }
           
        if (LRot != 0) {
            this.data[3] = LRoc / LRot //plr
        } else {
            this.data[3] = 0 //plr
        }
        let ptot = 0
        let dy = mapp.length
        let dx = mapp.length
        for (let i = 0; i < mapp.length; i++) {
            if (mapp[this.pos.y][i] == 2) {
                if (Math.abs(i - this.pos.x) < dx) {
                    dx = Math.abs(i - this.pos.x)
                    this.data[19] = i - this.pos.x //pdx
                }
                if (i - this.pos.x < 6 && i - this.pos.x > -6) {
                    ptot++
                }
            }
        }
        for (let i = 0; i < mapp.length; i++) {
            if (mapp[i][this.pos.x] == 2) {
                if (Math.abs(i - this.pos.y) < dy) {
                    dy = Math.abs(i - this.pos.y)
                    this.data[18] = i - this.pos.y //pdy
                }
                if (i - this.pos.y < 6 && i - this.pos.y > -6) {
                    ptot++
                }
            }
        }
        this.data[12] = min(this.data[18], this.data[19])
        this.data[17] = ptot //pid
    }
}