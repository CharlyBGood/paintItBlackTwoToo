import * as test2 from './test2.js';

let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");
let color;
let yi, xf;

let x, y;
let stage;

// definir tamaño de canvas segun window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let width = canvas.width;
let text = document.getElementById("text_lines");
let button = document.getElementById("button");

button.addEventListener('click', justClick)

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(xinicial, yinicial);
    ctx.lineTo(xfinal, yfinal);
    ctx.stroke();
    ctx.closePath();
}

function justClick() {
    color = test2.colorZ()
    let lineas = parseInt(text.value);
    let espacio = width / lineas / Math.random(width / lineas);
    
    const patron = ()=> {
    let yi, xf;
    for (let i = 0; i < lineas; i++) {
    yi = espacio * i;
    xf = espacio * (i + 1);
    dibujarLinea(color, 0, yi, xf, 300);
    dibujarLinea(color, 300, yi, xf, 0);
    dibujarLinea(color, 300, yi, xf, 120);
    dibujarLinea(color, 0, yi, xf, 120);  
   }
 }
    patron();

}




// crear variables de posición de pincel y estado de dibujo

let colorX = '#f3ebdc';
let size;
let magicButton = false;

// definir tamaño de canvas segun window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// añadir eventos de mouse / touch
canvas.addEventListener("pointerdown", pointerDown, false);
canvas.addEventListener("pointermove", pointerMove, false);
canvas.addEventListener("pointerup", pointerUp, false);

// redimensionar canvas según viewport
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// cambiar color de fondo al canvas
let bgrPckr  = document.getElementById('bgr_color');
bgrPckr.addEventListener("input", bgrChange);

function bgrChange() {
        canvas.style.backgroundColor = bgrPckr.value;
        console.log("cambiar color de fondo")
}


// cambiar color a pincel 
let brushPckr = document.getElementById('brush_color');
brushPckr.addEventListener("input", brushColor);

function brushColor() {
    colorX = brushPckr.value;
    ctx.globalCompositeOperation = "source-over";
    magicButton = false;
    console.log(magicButton);
    console.log("cambia color pincel, funciona!!")
}

// seleccionar pincel mágico
let brushMagic = document.getElementById("magic_button");
brushMagic.addEventListener("click", brushMc);

function brushMc() {
    magicButton = !magicButton;
    console.log(magicButton);
    console.log("funciona pincel mágico");
}

// seleccionar goma de borrar
let brushErase = document.getElementById("brush_erase");
brushErase.addEventListener("click", eraseDraw);

function eraseDraw() {
    ctx.globalCompositeOperation = "destination-out";
    console.log("Goma de borrar seleccionada!");
    magicButton = false;     
}

// cambiar tamaño a pincel
let sizeB = document.getElementById('range');
sizeB.addEventListener('input', brushSize);

function brushSize() {
    size = sizeB.value;
}

// recargar canvas 
let reload = document.getElementById('reload');
reload.addEventListener('click', reloadCanvas);

function reloadCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

// funciones para dibujar según se mueve el puntero
function pointerDown(ev) {
    stage = 1;
    x = ev.layerX;
    y = ev.layerY;
    ev.preventDefault();
    console.log(ev.target)
}

function pointerMove(ev) {
    if (stage == 1) {
        if (magicButton) {
            colorX = test2.colorZ();
            ctx.globalCompositeOperation = "source-over";
            console.log(magicButton);
        } 
        drawLine(colorX, x, y, ev.layerX, ev.layerY, ctx);
    }
    x = ev.layerX;
    y = ev.layerY;
    ev.preventDefault();
}



function pointerUp() {
    stage = 0;
}

function drawLine(color, xini, yini, xfin, yfin, ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.moveTo(xini, yini);
    ctx.lineTo(xfin, yfin);
    ctx.stroke();
    ctx.closePath();        
}