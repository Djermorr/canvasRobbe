const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const opacitySlider = document.getElementById("opacity-slider");
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let opacity = 1;

let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
        ctx.globalAlpha = opacity;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
    if(e.target.id === 'opacity-slider') {
        opacity = e.target.value;
        ctx.globalAlpha = opacity;
    }
});


const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvasOffsetX, e.clientY);
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
});

canvas.addEventListener('mousemove', draw);
