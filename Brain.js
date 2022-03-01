class Brain {
    constructor(decoded, hidden, sb) {
        if (sb) {
            console.log(decoded)
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
                { id: 35, group: 'out', label: 'Mx' }, //Move x
                { id: 36, group: 'out', label: 'My' }, //Move y
                { id: 37, group: 'out', label: 'Mrl' }, //Move left/right
                { id: 38, group: 'out', label: 'Plt' }, //Plant forwards
                { id: 39, group: 'out', label: 'NON' }, //Do nothing
                { id: 40, group: 'out', label: 'Spn' }, //Spawn offspring forwards
            ]

            var nodes = new vis.DataSet([]);
            var ee = []
            for (let i = 0; i < decoded.length; i++) {
                let ton = 0
                let from = 0
                if (decoded[i][0] == 1) {
                    from = (decoded[i][1] % hidden) + 20
                } else {
                    from = (decoded[i][1] % 20)
                }
                if (decoded[i][2] == 1) {
                    ton = (decoded[i][3] % hidden) + 20
                } else {
                    ton = (decoded[i][3] % 10) + 30
                }
                nodes.update(pnodes[ton])
                nodes.update(pnodes[from])
                if (decoded[i][4] < 0) {
                    ee.push(({ from: from + 1, to: ton + 1, color: "red" }))
                }
                if (decoded[i][4] > 0) {
                    ee.push(({ from: from + 1, to: ton + 1, color: "green" }))
                }
            }
            var edges = new vis.DataSet([]);
            for (let i = 0; i < ee.length; i++) {
                console.log(ee[i])
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
}