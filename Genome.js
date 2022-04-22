const hexs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

function hex2bin(hex) {
    var out = "";
    for (var c of hex) {
        switch (c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }

    return out;
}

class Genome {
    constructor() {
        this.s = ""
        this.sa = []
    }

    decode() {
        let result = []
        for (let b of this.sa) {
            let temp = []
            temp.push(parseInt(b[0], 2))
            temp.push(parseInt(b.slice(1, 8), 2))
            temp.push(parseInt(b[8], 2))
            temp.push(parseInt(b.slice(9, 16), 2))
            if (b[16] == 0) {
                temp.push(parseInt(b.slice(17), 2) / 10000)
            } else {
                temp.push((parseInt(b.slice(17), 2) * -1) / 10000)
            }
            result.push(temp)
        }
        return result
    }

    generate(l) {
        for (let i = 0; i < l; i++) {
            if (i > 0) {
                this.s += " "
            }
            let t = ""
            for (let j = 0; j < 8; j++) {
                t += hexs[Math.floor(Math.random() * hexs.length)]
            }
            this.s += t
        }
        for (let w of this.s.split(" ")) {
            this.sa.push(hex2bin(w))
        }
    }

    getsa(ss) {
        for (let w of ss.split(" ")) {
            this.sa.push(hex2bin(w))
        }
    }


    mutate(r) {
        let ss = (' ' + this.s).slice(1)
        let saa = []
        let gg = new Genome
        if (Math.random() < r) {
            let go = true
            while (go) {
                let i = Math.floor(Math.random() * ss.length)
                if (ss[i] != " ") {
                    go = false
                    let n = hexs[Math.floor(Math.random() * hexs.length)]
                    while (n == ss[i]) {
                        n = hexs[Math.floor(Math.random() * hexs.length)]
                    }
                    ss = ss.substring(0, i) + n + ss.substring(i + 1)
                }
            }
            for (let w of ss.split(" ")) {
                saa.push(hex2bin(w))
            }
            gg.sa = saa
            gg.s = ss
        } else {
            gg.sa = this.sa
            gg.s = this.s
        }
        return gg
    }
}