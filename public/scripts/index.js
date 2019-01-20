//W = 0, R = 1, H = 2, F = 3, D = 4, B = 5
var data;
var height = 21;
var width = 21;
var factor = 20;
var canvas;
var ctx;
var mouseClickX;
var mouseClickY;

function generateMaze() {
    console.log("here")
    $.ajax({
      url : "/gen",
      type: "POST",
    }).done(function(d){
        data = stringToArray(d.d)
        displayBorders()
    })
}

function displayBorders() {
    document.getElementById("simulationButton").disabled = false;
    document.getElementById("simulationButton").style.backgroundColor = "white";
    canvas = document.getElementById("myCanvas");
    canvas.style.visibility = "visible";
    canvas.height = height * factor;
    canvas.width = width * factor;
    displayLines();
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseClickX = mousePos.x;
        mouseClickY = mousePos.y;
        var message = 'Mouse position: ' + mouseClickX + ',' + mouseClickY;
        console.log(message);
        changeColor();
      }, false);    
}

function displayLines() {
    ctx = canvas.getContext("2d");
    displayColors(data);
    for (var i = 0; i < height; i++) { 
        ctx.moveTo((i+1)*factor, 0);
        ctx.lineTo((i+1)*factor, height*factor);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    for (var i = 0; i < width; i++) {
        ctx.moveTo(0, (i+1)*factor);
        ctx.lineTo(width * factor, (i+1)*factor);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}

function displayColors(grid) {
    for(var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (grid[i][j] == 0) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "black";
                ctx.fill();
            } else if (grid[i][j] == 1) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "white";
                ctx.fill();
            } else if (grid[i][j] == 4) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "green";
                ctx.fill();
            } else if (grid[i][j] == 10) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#eee8f3";
                ctx.fill();
            } else if (grid[i][j] == 11) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#ccbadc";
                ctx.fill();
            } else if (grid[i][j] == 12) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#aa8cc5";
                ctx.fill();
            } else if (grid[i][j] == 13) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#885ead";
                ctx.fill();
            } else if (grid[i][j] == 14) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#663096";
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
    mouseClickX = Math.floor(mouseClickX/factor);
    mouseClickY = Math.floor(mouseClickY/factor);
    if (data[mouseClickY][mouseClickX] == 1) {
        ctx.beginPath();
        ctx.rect(mouseClickX*factor, mouseClickY*factor, factor - 1, factor - 1);
        ctx.fillStyle = "blue";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 2;
    } else if (data[mouseClickY][mouseClickX] == 2){
        ctx.beginPath();
        ctx.rect(mouseClickX*factor, mouseClickY*factor, factor - 1, factor - 1);
        ctx.fillStyle = "orange";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 3;
    } else if (data[mouseClickY][mouseClickX] == 3) {
        ctx.beginPath();
        ctx.rect(mouseClickX*factor, mouseClickY*factor, factor - 1, factor - 1);
        ctx.fillStyle = "white";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 1;
    } else if (data[mouseClickY][mouseClickX] == 4) {
        ctx.beginPath();
        ctx.rect(mouseClickX*factor, mouseClickY*factor, factor - 1, factor - 1);
        ctx.fillStyle = "red";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 5;
    } else if (data[mouseClickY][mouseClickX] == 5) {
        ctx.beginPath();
        ctx.rect(mouseClickX*factor, mouseClickY*factor, factor - 1, factor - 1);
        ctx.fillStyle = "green";
        ctx.fill();
        data[mouseClickY][mouseClickX] = 4;
    }
}

function runSimulation() {
    $.ajax({
      url : "/sim",
      type: "POST",
      data : {
              input:arrayToString(),
             },
      success: function(ret, textStatus, jqXHR)
      {
        newdata = stringToArray(ret.d)
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if(newdata[i][j]/3 < 1 && data[i][j] == 1) {
                    data[i][j] = 10;
                } 
                else if(newdata[i][j]/6 < 1 && data[i][j] == 1) {
                    data[i][j] = 11;
                } 
                else if(newdata[i][j]/9 < 1 && data[i][j] == 1) {
                    data[i][j] = 12;
                } 
                else if(newdata[i][j]/12 < 1 && data[i][j] == 1) {
                    data[i][j] = 13;
                } 
                else if(data[i][j] == 1) {
                    data[i][j] = 14;
                } 
            }
        }
        console.log(data)
        displayColors()
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
       
      }
    });
}

function arrayToString() {
    var output = ""
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            output += data[i][j].toString()+" "
        }
    }
    output = output.substring(0, output.length - 1);
    return output.toString()
}

function stringToArray(d) {
    var newGrid = [];
    var res = d.split(" ").filter(function () { return true });
    var row = []
    for (var i = 0; i < res.length; i++) {
        if (i % 21 == 0 && i > 5) {
            newGrid.push(row)
            row = []
        }
        row.push(parseInt(res[i]))
    }
    return newGrid
}

