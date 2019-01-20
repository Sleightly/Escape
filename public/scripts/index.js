//W = 0, R = 1, H = 2, F = 3, D = 4, B = 5
var data = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 4, 1],
    [0, 4, 0, 4, 0, 0],
    [0, 1, 4, 1, 0, 0],
  ];
var height;
var width;
var canvas;
var ctx;
var mouseClickX;
var mouseClickY;

function getDimensions() {
    height = document.getElementsByName("height")[0].value * 100;
    width = document.getElementsByName("width")[0].value * 100;
    console.log(height);
    console.log(width);
    displayBorders();
}

function displayBorders() {
    document.getElementById("simulationButton").style.visibility = "visible";
    canvas = document.getElementById("myCanvas");
    canvas.style.visibility = "visible";
    canvas.height = height;
    canvas.width = width;
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseClickX = mousePos.x;
        mouseClickY = mousePos.y;
        var message = 'Mouse position: ' + mouseClickX + ',' + mouseClickY;
        console.log(message);
        changeColor();
      }, false);    
    displayLines();
}

function displayLines() {
    ctx = canvas.getContext("2d");
    displayColors(data);
    for (var i = 0; i < height; i++) { 
        ctx.moveTo((i+1)*100, 0);
        ctx.lineTo((i+1)*100, height);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    for (var i = 0; i < width; i++) {
        ctx.moveTo(0, (i+1)*100);
        ctx.lineTo(width, (i+1)*100);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}

function displayColors(grid) {
    for(var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (grid[i][j] == 0) {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 99, 99);
                ctx.fillStyle = "black";
                ctx.fill();
            } else if (grid[i][j] == 1) {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 99, 99);
                ctx.fillStyle = "white";
                ctx.fill();
            } else if (grid[i][j] == 4) {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 99, 99);
                ctx.fillStyle = "green";
                ctx.fill();
            }
        }
    }
}

function getMousePos(canvas,evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function changeColor() {
    mouseClickX = Math.floor(mouseClickX/100);
    mouseClickY = Math.floor(mouseClickY/100);
    if (data[mouseClickY][mouseClickX] == 1) {
        ctx.beginPath();
        ctx.rect(mouseClickX*100, mouseClickY*100, 99, 99);
        ctx.fillStyle = "blue";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 2;
    } else if (data[mouseClickY][mouseClickX] == 2){
        ctx.beginPath();
        ctx.rect(mouseClickX*100, mouseClickY*100, 99, 99);
        ctx.fillStyle = "orange";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 3;
    } else if (data[mouseClickY][mouseClickX] == 3) {
        ctx.beginPath();
        ctx.rect(mouseClickX*100, mouseClickY*100, 99, 99);
        ctx.fillStyle = "white";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 1;
    } else if (data[mouseClickY][mouseClickX] == 4) {
        ctx.beginPath();
        ctx.rect(mouseClickX*100, mouseClickY*100, 99, 99);
        ctx.fillStyle = "red";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 5;
    } else if (data[mouseClickY][mouseClickX] == 5) {
        ctx.beginPath();
        ctx.rect(mouseClickX*100, mouseClickY*100, 99, 99);
        ctx.fillStyle = "green";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 4;
    }
}




