class Brain {
    constructor(decoded, hidden) {
        this.h = hidden
        this.d = decoded
    }

    getoutput(data) {
        let hidd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let out = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // input to hidden or output
        for (let i = 0; i < this.d.length; i++){
            if (this.d[i][0] == 0){
                if (this.d[i][2] == 1) {
                    hidd[this.d[i][3] % this.h] += (this.d[i][4] * data[this.d[i][1] % 20])
                } else {
                    out[this.d[i][3] % 14] += (this.d[i][4] * data[this.d[i][1] % 20])
                }
            }
        }

        // hidden to hidden
        for (let i = 0; i < this.d.length; i++){
            if (this.d[i][0] == 1){
                if (this.d[i][2] == 1) {
                    hidd[this.d[i][3] % this.h] += (this.d[i][4] * hidd[this.d[i][1] % this.h])
                } 
            }
        }

        // hidden to output
        for (let i = 0; i < this.d.length; i++){
            if (this.d[i][0] == 1){
                hidd[this.d[i][1] % this.h] = Math.tanh(hidd[this.d[i][1] % this.h])
                if (this.d[i][2] == 0) {
                    out[this.d[i][3] % 14] += (this.d[i][4] * hidd[this.d[i][1] % this.h])
                } 
            }
        }

        // tanh all the output values
        for (let i = 0; i < 13; i++){
            out[i] = Math.tanh(out[i])
        }

        return [out.indexOf(max(out)), max(out)]
    }

    show() {
        let pnodes = [
            { id: 1, group: 'inp', label: 'Age' }, //Age
            { id: 2, group: 'inp', label: 'Rnd' }, //Random Input
            { id: 3, group: 'inp', label: 'Pfd' }, //Pop density forwards
            { id: 4, group: 'inp', label: 'Plr' }, //Pop density L/R
            { id: 5, group: 'inp', label: 'LPf' }, //Pop density long range forwards
            { id: 6, group: 'inp', label: 'LMy' }, //Last move y                
            { id: 7, group: 'inp', label: 'LMx' }, //Last move x
            { id: 8, group: 'inp', label: 'BDy' }, //Border distance y
            { id: 9, group: 'inp', label: 'BDx' }, //Border distance x
            { id: 10, group: 'inp', label: 'Lx' }, //x location
            { id: 11, group: 'inp', label: 'Ly' }, //y location
            { id: 12, group: 'inp', label: 'Bd' }, //Closest border
            { id: 13, group: 'inp', label: 'PLd' }, //Distance to closest plant
            { id: 14, group: 'inp', label: 'Eng' }, //Energy
            { id: 15, group: 'inp', label: 'DEg' }, //Change in energy from last turn
            { id: 16, group: 'inp', label: 'Pdf' }, //Plant density forwards
            { id: 17, group: 'inp', label: 'Osc' }, //Oscillator
            { id: 18, group: 'inp', label: 'PiD' }, //Plants within 5 moves
            { id: 19, group: 'inp', label: 'PDy' }, //Plant distance y
            { id: 20, group: 'inp', label: 'PDx' }, //Plant distance x
            { id: 21, group: 'hid', label: 'N0' }, //Hidden node 0
            { id: 22, group: 'hid', label: 'N1' }, //Hidden node 1
            { id: 23, group: 'hid', label: 'N2' }, //Hidden node 2
            { id: 24, group: 'hid', label: 'N3' }, //Hidden node 3
            { id: 25, group: 'hid', label: 'N4' }, //Hidden node 4
            { id: 26, group: 'hid', label: 'N5' }, //Hidden node 5
            { id: 27, group: 'hid', label: 'N6' }, //Hidden node 6
            { id: 28, group: 'hid', label: 'N7' }, //Hidden node 7
            { id: 29, group: 'hid', label: 'N8' }, //Hidden node 8
            { id: 30, group: 'hid', label: 'N9' }, //Hidden node 9
            { id: 31, group: 'out', label: 'OSC' }, //Set oscillator period
            { id: 32, group: 'out', label: 'Mfd' }, //Move forwards
            { id: 33, group: 'out', label: 'Mrn' }, //Move random
            { id: 34, group: 'out', label: 'Mrv' }, //Move reverse
            { id: 35, group: 'out', label: 'Mx-' }, //Move x-
            { id: 36, group: 'out', label: 'Mx+' }, //Move x+
            { id: 37, group: 'out', label: 'My-' }, //Move y-
            { id: 38, group: 'out', label: 'My+' }, //Move y+
            { id: 39, group: 'out', label: 'ML' }, //Move left
            { id: 40, group: 'out', label: 'MR' }, //Move right
            { id: 41, group: 'out', label: 'Plt' }, //Plant forwards
            { id: 42, group: 'out', label: 'NON' }, //Do nothing
            { id: 43, group: 'out', label: 'Spn' }, //Spawn offspring forwards
            { id: 44, group: 'out', label: 'Eat' }, //Eat plant forwards
        ]

        var nodes = new vis.DataSet([]);
        var ee = []
        for (let i = 0; i < this.d.length; i++) {
            let ton = 0
            let from = 0
            if (this.d[i][0] == 1) {
                from = (this.d[i][1] % this.h) + 20
            } else {
                from = (this.d[i][1] % 20)
            }
            if (this.d[i][2] == 1) {
                ton = (this.d[i][3] % this.h) + 20
            } else {
                ton = (this.d[i][3] % 14) + 30
            }
            nodes.update(pnodes[ton])
            nodes.update(pnodes[from])
            if (this.d[i][4] < 0) {
                ee.push(({ from: from + 1, to: ton + 1, color: "red", width: Math.abs(this.d[i][4]) }))
            }
            if (this.d[i][4] > 0) {
                ee.push(({ from: from + 1, to: ton + 1, color: "green", width: Math.abs(this.d[i][4]) }))
            }
        }
        var edges = new vis.DataSet([]);
        for (let i = 0; i < ee.length; i++) {
            edges.update(ee[i])
        }
        // create a network
        var container = document.getElementById('status');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            groups: {
                inp: { color: { background: '#77aaff' } },
                out: { color: { background: '#ff8888' } },
                hid: { color: { background: '#aaaaaa' } }
            },
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                    }
                }
            }
        };

        // initialize your network!
        var network = new vis.Network(container, data, options);
    }
}