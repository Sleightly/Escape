//W = 0, R = 1, D = 2
var data = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 2, 1],
    [0, 2, 0, 2, 0, 0],
    [0, 1, 2, 1, 0, 0],
  ];
var height;
var width;
var canvas;
var ctx;

function getDimensions() {
    height = document.getElementsByName("height")[0].value * 100;
    width = document.getElementsByName("width")[0].value * 100;
    console.log(height);
    console.log(width);
    displayBorders();
}

function displayBorders() {
    canvas = document.getElementById("myCanvas");
    canvas.height = height;
    canvas.width = width;
    displayLines();
}

function displayLines() {
    ctx = canvas.getContext("2d");
    for (var i = 0; i < height; i++) { 
        ctx.moveTo((i+1)*100, 0);
        ctx.lineTo((i+1)*100, height);
        ctx.stroke();
    }
    for (var i = 0; i < width; i++) {
        ctx.moveTo(0, (i+1)*100);
        ctx.lineTo(width, (i+1)*100);
        ctx.stroke();
    }
    displayColors(data);
}

function displayColors(grid) {
    for(var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (grid[i][j] == 0) {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 100, 100);
                ctx.fillStyle = "black";
                ctx.fill();
            } else if (grid[i][j] == 1) {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 100, 100);
                ctx.fillStyle = "white";
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.rect(j*100, i*100, 100, 100);
                ctx.fillStyle = "blue";
                ctx.fill();
            }
        }
    }

}

