function twoBodyProblem(t, state) {
    const G = 1; // Gravitational constant
    const m1 = 10000; // Mass of body 1 (Earth)
    const m2 = 4; // Mass of body 2 (Moon)

    const [x1, y1, vx1, vy1, x2, y2, vx2, vy2] = state;

    const r = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    const ax1 = -G * m2 * (x1 - x2) / r ** 3;
    const ay1 = -G * m2 * (y1 - y2) / r ** 3;
    const ax2 = -G * m1 * (x2 - x1) / r ** 3;
    const ay2 = -G * m1 * (y2 - y1) / r ** 3;

    return [
        vx1,
        vy1,
        ax1,
        ay1,
        vx2,
        vy2,
        ax2,
        ay2
    ];
}

function rungeKutta(f, initialState, t0, t1, h) {
    let t = t0;
    let state = initialState;

    const results = [];

    while (t < t1) {
        results.push({ t, state });

        const k1 = f(t, state);
        const k2 = f(t + 0.5 * h, state.map((s, i) => s + 0.5 * h * k1[i]));
        const k3 = f(t + 0.5 * h, state.map((s, i) => s + 0.5 * h * k2[i]));
        const k4 = f(t + h, state.map((s, i) => s + h * k3[i]));

        state = state.map((s, i) => s + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
        t += h;
    }

    return results;
}
// Function to get a specific column from a 2D array
function getColumn(matrix, col) {
    var j = [];
    for(i = 0; i<results.length; i++){
        j.push(matrix[i].state[col]);
    }
    return j
}

function axesHorizontal(y){
    ctx2.beginPath();
    ctx2.moveTo(0,y);
    ctx2.lineTo(1920, y);
    ctx2.stroke();

}

function axesVertical(x){
    ctx2.strokeStyle = "green";
    ctx2.beginPath();
    ctx2.moveTo(x,0);
    ctx2.lineTo(x, 1080);
    ctx2.stroke();

}


// Example usage:
const initialState = [-100 + 960, -100 + 540, 0, 0, 100 + 960, 100 + 540, 0, -5]; // [x1, y1, vx1, vy1, x2, y2, vx2, vy2]
const initialTime = 0;
const finalTime = 3000;
const stepSize = 1;

const results = rungeKutta(twoBodyProblem, initialState, initialTime, finalTime, stepSize);

var x1_values = getColumn(results, 0)
var y1_values = getColumn(results, 1)
        
var x2_values = getColumn(results, 4)
var y2_values = getColumn(results, 5)

        
i = 0
function draw(x, y) {
    ctx.clearRect(0,0, 1920, 1080);                   //Particula
    
    ctx.beginPath();
    ctx.ellipse(x1_values[i] , y1_values[i], 20, 20, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "#edf0f1";
    ctx.fillStyle = "#519872";
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x2_values[i] , y2_values[i], 20, 20, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "#edf0f1";
    ctx.fillStyle = "#519872";
    ctx.stroke();
    ctx.fill();

    i++;
    if (i == x1_values.length){
        i = 0;
    }             
}
                //Animação
function here(){
    draw();
    t=t+dt
}

        //Simular
function roda(){
    K = setInterval("here()",dt_ms);
}
        