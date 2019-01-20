//W = 0, R = 1, H = 2, F = 3, D = 4, B = 5
var data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 4, 1, 0, 0, 0, 0],
    [0, 4, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 1, 4, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 4, 1, 0, 0, 0, 0],
    [0, 4, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 1, 4, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 4, 1, 0, 0, 0, 0],
  ];
var height = 10;
var width = 10;
var factor = 50;
var canvas;
var ctx;
var mouseClickX;
var mouseClickY;

function displayBorders() {
    document.getElementById("simulationButton").style.visibility = "visible";
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
    for(var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
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
              data: data
             },
      success: function(ret, textStatus, jqXHR)
      {
        $("#points").text(data.points);
        $("#name").text(data.out_name);
        var theme = data.theme
        var $nav = $('nav');
        var curTheme = theme.replace(/([A-Z])/g, '-$1').toLowerCase() + "-bg";
        $nav.addClass(curTheme);
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
       
      }
    });
}

function arrayToString() {
    var output = ""
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            output += ""+data[i]+" "
        }
    }
    output = output.substring(0, output.length - 1);
    return output
}

function stringToArray(d) {
    var res = d.split(" ").filter(function () { return true });
    for (var i = 0; i < res; i++) {
        d[i/data.length][i%data.length] = parseInt(res[i]);
    }
}

