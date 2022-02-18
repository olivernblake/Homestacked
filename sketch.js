/*
Homestacked - by Oliver N Blake
Inspired by the style of Abstract Architecture, this project generates a new "Stack" every 5 seconds.

I have drawn inspiration from a building from back in Melbourne
affectionatly referred to as "The Lego Building" 
(pictured here https://www.archdaily.com/881081/the-icon-jackson-clements-burrows)

and also "The Stacks" from Ready Player 1
(pictured here https://www.polygon.com/2015/3/25/8291171/ready-player-one-movie-steven-spielberg-ernest-cline)

The user can navigate the Camera position with the Up and Down arrow keys
and LookAt with W and S
*/

let stack;
let sHeight = [];
let sPositions = [];
let sWidth = [];
let sLength = [];
let sPosZ;
let colours = [];
let turn;
let platformH;

let cameraX, cameraY, cameraZ;
let lookX, lookY, lookZ;

function setup() {
  createCanvas(1280,800, WEBGL);
  // createEasyCam();
  document.oncontextmenu = ()=>false;
  setStackVars();
  
  // Set rotate amount
  turn = 0;
  
  // Camera
  cameraX = 0;
  cameraY = 1500;
  cameraZ = 500;
  lookX = 0;
  lookY = 0;
  lookZ = 350;
}

function setStackVars() {  
  // Get varying amount of stacks
  stack = floor(random(3, 6));
  sPosZ = 0;
  for (let i = 0; i < stack; i++) {
    // Set Colours and push to array
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let c = color(r, g, b);
    colours.push(c);
    
    // Get varying stack heights  
      let stackH = floor(random(2, 5)) * 70;
      sHeight.push(stackH);

    // Get varying positions
      // Offset by Random X and Y
      let sPosX = random(-100, 100);
      let sPosY = random(-100, 100);
      // Increment Z pos
      if (i > 0) {
        sPosZ += sHeight[i -1]/2;
      }
      sPosZ += stackH/2;
      // Create vector position and push to positions array
      let sPos = createVector(sPosX, sPosY, sPosZ);
      sPositions.push(sPos);
    
    // Get varying height and width vars
      let stackW = random(300, 500);
      let stackL = random(300, 500);
      sWidth.push(stackW);
      sLength.push(stackL);
  }
}

function clearArrays() {
  sHeight = [];
  sPositions = [];
  sWidth = [];
  sLength = [];
  sPosZ = [];
  colours = [];
}

function draw() {
  // always redraw
  background(255);
  drawGrid(20, 20, 100);
  // drawAxis();
  
  ambientLight(255);
  camera(cameraX, cameraY, cameraZ, lookX, lookY, lookZ, 0, 1, 0);
  
  // Refresh Building
  if (frameCount % 300 === 0) {
    clearArrays();
    setStackVars();
  }
  
  // Draw the Stacks
  drawBuilding();
  
  // Increment the rotate amount
  turn += 0.004;
}

function drawBuilding() {
  // Draw Stacks  
  for (let i = 0; i < stack; i++) {
      push();
      translate(sPositions[i]);
      rotate(turn);
      fill(colours[i]);
      box(sWidth[i], sLength[i], sHeight[i]);
      pop();
    }
  
  // Draw platforms
  let platformH = 2;
  let platOver = 30;
  for (let i = 0; i < stack; i++) {
    push();
      // translate to base middle
      translate(sPositions[i].x, sPositions[i].y, sPositions[i].z - sHeight[i]/2);
      rotate(turn);      
      fill(0);
      // Draw bottom platform
      box(sWidth[i] + platOver, sLength[i] + platOver, platformH);

      // Translate to top of box
      push();
        translate(0, 0, sHeight[i]);
        // Draw top platform
        box(sWidth[i] + platOver, sLength[i] + platOver, platformH);
      pop();
    pop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    cameraZ += 10;
    console.log(cameraZ);
  }
  if (keyCode === DOWN_ARROW) {
    cameraZ -= 10;
    console.log(cameraZ);
  }
  
  if (key === 'w') {
    lookZ += 10;
    console.log(lookZ);
  }
  
  if (key === 's') {
    lookZ -= 10;
    console.log(lookZ);
  }

}

/* This draws the axis on the 3D plane */
function drawAxis(){
  push();
  strokeWeight(3);
  let sz = 300;
  // draw the lines
  stroke(255,0,0); // R
  line(0,0,0,sz,0,0); // X
  stroke(0,255,0); // G
  line(0,0,0,0,sz,0); // Y
  stroke(0,0,255); //B
  line(0,0,0,0,0,sz); // Z

  // draw the tips
  strokeWeight(12);
  stroke(255,0,0); // R
  point(sz,0,0); // X
  stroke(0,255,0); // G
  point(0,sz,0); // Y
  stroke(0,0,255); //B
  point(0,0,sz); // Z

  pop();
}


/* draw a grid with variable width height and size */
function drawGrid(rows, cols, sz){
  push();
  stroke(0);
  // move to negative edge of the grid
  translate(-rows*0.5*sz,-cols*0.5*sz );

  // draw the rows
  for(let i = 0; i < rows+1; i++){
    line(i *sz, 0 ,i*sz, cols*sz);
  }
  // draw the columns
  for(let j = 0; j < cols+1; j++){
    line(0,j *sz, rows*sz ,j*sz);
  }

  pop();
}