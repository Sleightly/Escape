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
                ctx.fillStyle = "#7fbf7f";
                ctx.fill();
            } else if (grid[i][j] == 10) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#f2e5f2";
                ctx.fill();
            } else if (grid[i][j] == 11) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#d8b2d8";
                ctx.fill();
            } else if (grid[i][j] == 12) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#bf7fbf";
                ctx.fill();
            } else if (grid[i][j] == 13) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#a64ca6";
                ctx.fill();
            } else if (grid[i][j] == 14) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#993299";
                ctx.fill();
            } else if (grid[i][j] == 15) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#8c198c";
                ctx.fill();
            } else if (grid[i][j] == 16) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#800080";
                ctx.fill();
            } else if (grid[i][j] == 17) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#730073";
                ctx.fill();
            } else if (grid[i][j] == 18) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#660066";
                ctx.fill();
            } else if (grid[i][j] == 19) {
                ctx.beginPath();
                ctx.rect(j*factor, i*factor, factor - 1, factor - 1);
                ctx.fillStyle = "#590059";
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
                if(newdata[i][j]/2 < 1 && data[i][j] == 1) {
                    data[i][j] = 10;
                } 
                else if(newdata[i][j]/4 < 1 && data[i][j] == 1) {
                    data[i][j] = 11;
                } 
                else if(newdata[i][j]/6 < 1 && data[i][j] == 1) {
                    data[i][j] = 12;
                } 
                else if(newdata[i][j]/8 < 1 && data[i][j] == 1) {
                    data[i][j] = 13;
                }
                else if(newdata[i][j]/10 < 1 && data[i][j] == 1) {
                    data[i][j] = 14;
                } 
                else if(newdata[i][j]/12 < 1 && data[i][j] == 1) {
                    data[i][j] = 15;
                } 
                else if(newdata[i][j]/14 < 1 && data[i][j] == 1) {
                    data[i][j] = 16;
                } 
                else if(newdata[i][j]/16 < 1 && data[i][j] == 1) {
                    data[i][j] = 17;
                } 
                else if(newdata[i][j]/18 < 1 && data[i][j] == 1) {
                    data[i][j] = 18;
                } 
                else if(data[i][j] == 1) {
                    data[i][j] = 19;
                } 
            }
        }
        console.log(data)
        for (var i = 0; i < height; i++) {
            row = ""
            for (var j = 0; j < height; j++) {
                row += j+" "
            }
            console.log(row)
        }
        displayColors(data)
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

