import { food, snake } from "./MyObjects.js";

let grid = new Array(20);
let body = new Array();

// grid[0].style.backgroundColor = "yellow";

function getLocation(X, Y, score) {
  var locationX = document.getElementById("locationX");
  locationX.innerHTML = X;
  var locationY = document.getElementById("locationY");
  locationY.innerHTML = Y;
  var tscore = document.getElementById("score");
  tscore.innerHTML = score;
}

//get the world element from the html
var myWorld = document.getElementById("myWorld");

//setting up the world environment
myWorld.style.width = "500px";
myWorld.style.height = "500px";
myWorld.style.backgroundColor = "hwb(186deg 17% 64% / 69%)";
myWorld.style.display = "grid";
myWorld.style.gridTemplateColumns = "repeat(auto-fill, 25px)";
myWorld.style.position = "relative";
// myWorld.style.gridTemplateRows = "25px 1fr ";

//setting up divs inside the main world
//there will be 400 divs 20*20
for (let i = 0; i < 400; i++) {
  //creating a div element
  var myDiv = document.createElement("div");
  myDiv.setAttribute("class", "outerDiv");
  myDiv.setAttribute("id", "outerDiv" + i);
  myWorld.appendChild(myDiv);

  //creating div inside the div
  var innerDiv = document.createElement("div");
  innerDiv.setAttribute("class", "innerDiv");
  innerDiv.setAttribute("id", "innerDiv" + i);
  //   innerDiv.style.backgroundColor = myColors[index];
  myDiv.appendChild(innerDiv);
}

for (var i = 0; i < 20; i++) {
  grid[i] = new Array(20);
  grid[i] = document.getElementById("innerDiv" + i);
  for (var j = 0; j < 20; j++) {
    grid[i][j] = document.getElementById("innerDiv" + (i * 20 + j));
  }
}
let foodObj = Object.create(food);
let snakeObj = Object.create(snake);

let score = 0;

function updateFood(foodObj1) {
  var foodDiv = grid[foodObj1.location.x][foodObj1.location.y];
  foodDiv.style.backgroundColor = "red";
  foodDiv.style.borderRadius = "50%";

  //put a food at random place
}

function updateHead(e) {
  if (e.keyCode == "38") {
    if (score >= 1) {
      let temp1 = snakeObj.headLocation[0];
      for (let i = 1; i <= score; i++) {
        let temp = snakeObj.headLocation[i];
        snakeObj.headLocation[i] = temp1;
        temp1 = temp;
      }
    }
    snakeObj.moveUp();
  }

  if (e.keyCode == "40") {
    if (score >= 1) {
      let temp1 = snakeObj.headLocation[0];
      for (let i = 1; i <= score; i++) {
        let temp = snakeObj.headLocation[i];
        snakeObj.headLocation[i] = temp1;
        temp1 = temp;
      }
    }
    snakeObj.moveDown();
  }

  if (e.keyCode == "37") {
    if (score >= 1) {
      let temp1 = snakeObj.headLocation[0];
      for (let i = 1; i <= score; i++) {
        let temp = snakeObj.headLocation[i];
        snakeObj.headLocation[i] = temp1;
        temp1 = temp;
      }
    }
    snakeObj.moveLeft();
  }

  if (e.keyCode == "39") {
    if (score >= 1) {
      let temp1 = snakeObj.headLocation[0];
      for (let i = 1; i <= score; i++) {
        let temp = snakeObj.headLocation[i];
        snakeObj.headLocation[i] = temp1;
        temp1 = temp;
      }
    }
    snakeObj.moveRight();
  }
  getLocation(snakeObj.headLocation[0].x, snakeObj.headLocation[0].y, score);
}

async function startHead() {
  //wait for 0.2 secs
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        result: "success",
      });
    }, 100);
  });
}

function updateBody(score) {
  if (score == 0) {
    body[0] = snakeObj.headLocation[0];
    return;
  }
  body[0] = snakeObj.headLocation[0];
  for (let i = 1; i <= score; i++) {
    body[i] = snakeObj.headLocation[i];
  }
}

let gameOver = false;

// if (l == 0) {
//   grid[k][l].style.width = "500px";
//   grid[k][l].style.display = "flex";
//   grid[k][l].style.justifyContent = "center";
//   grid[k][l].innerHTML = "GameOver";
//   grid[k][l].style.fontSize = "40px";
//   grid[k][l].style.zIndex = "+1";
// } else {
//   grid[k][l].style.display = "none";
// }

function resetGrid() {
  for (let k = 0; k < grid.length; k++) {
    for (let l = 0; l < grid.length; l++) {
      if (k == foodObj.location.x && l == foodObj.location.y) continue;
      grid[k][l].style.backgroundColor = "";
      grid[k][l].style.borderRadius = "";
    }
  }
}

function paintBody() {
  resetGrid();
  for (let i = 0; i < body.length; i++) {
    let loc = grid[body[i].x][body[i].y];
    loc.style.backgroundColor = "blue";
  }
  let head = grid[body[0].x][body[0].y];
  head.style.backgroundColor = "yellow";
}

//This is to test if the headpositons work when updated
// snakeObj.headLocation.push({ x: 4, y: 5 });
// snakeObj.headLocation.push({ x: 5, y: 5 });

// updateBody(2);
// console.log(body);
// paintBody();

function checkForFood(snakeObj, foodObj) {
  if (
    snakeObj.headLocation[0].x == foodObj.location.x &&
    snakeObj.headLocation[0].y == foodObj.location.y
  ) {
    score = score + 1;
    foodObj.newLocation();
    updateFood(foodObj);
  }
}

let checkBody = function (a) {
  for (let i = 1; i < snakeObj.headLocation.length; i++) {
    if (
      a.x == snakeObj.headLocation[i].x &&
      a.y == snakeObj.headLocation[i].y
    ) {
      return false;
    }
  }

  return true;
};

function displayOver(gameOver) {
  if (gameOver) {
    // grid[k][l].style.backgroundColor = "green";
    let myDiv = document.createElement("div");
    myDiv.setAttribute("class", "gameover");
    myDiv.style.position = "absolute";
    myDiv.innerHTML = "GameOver";
    myWorld.appendChild(myDiv);
  }
}

function flash() {
  for (let i = 0; i < 10; i++) {
    gameOver = true;
    resetGrid();
    setTimeout(() => {
      paintBody();
      if (i % 2 == 0) resetGrid();
      if (i % 2 == 1) paintBody();
    }, 100 * i);
  }
}

let up = true,
  down = true,
  right = true,
  left = true;

var checkKeyFunc = async function (e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    //up arrow
    //this cancels other events
    up = true;
    right = false;
    left = false;
    down = false;
    while (up) {
      await startHead(snakeObj);
      if (up) {
        updateHead(e);
        updateBody(score);
        checkForFood(snakeObj, foodObj);
        paintBody();
        if (!checkBody(snakeObj.headLocation[0])) {
          flash();
          displayOver(gameOver);
          snakeObj.resetHead();
          score = 0;
          break;
        }
      }
    }
  } else if (e.keyCode == "40") {
    //down arrow
    //this cancels other events
    down = true;
    right = false;
    up = false;
    left = false;
    while (down) {
      await startHead(snakeObj);
      if (down) {
        updateHead(e);
        updateBody(score);
        checkForFood(snakeObj, foodObj);
        paintBody();
        if (!checkBody(snakeObj.headLocation[0])) {
          flash();
          displayOver(gameOver);
          snakeObj.resetHead();
          score = 0;
          break;
        }
      }
    }
  } else if (e.keyCode == "37") {
    //left arrow
    //this cancels other events
    left = true;
    right = false;
    up = false;
    down = false;
    while (left) {
      await startHead(snakeObj);
      if (left) {
        updateHead(e);
        updateBody(score);
        checkForFood(snakeObj, foodObj);
        paintBody();
        if (!checkBody(snakeObj.headLocation[0])) {
          flash();
          displayOver(gameOver);
          snakeObj.resetHead();
          score = 0;
          break;
        }
      }
    }
  } else if (e.keyCode == "39") {
    //right arrow
    //this cancels other events
    right = true;
    left = false;
    up = false;
    down = false;
    while (right) {
      await startHead(snakeObj);

      if (right) {
        updateHead(e);
        updateBody(score);
        checkForFood(snakeObj, foodObj);
        paintBody();
        if (!checkBody(snakeObj.headLocation[0])) {
          flash();
          displayOver(gameOver);
          snakeObj.resetHead();
          score = 0;
          break;
        }
      }
    }
  }
};

document.onkeydown = checkKeyFunc;

updateFood(foodObj);

