const WIDTH = 1200;
const HEIGHT = 800;
const LINE_HEIGHT = 50;

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (context == null){
    throw new Error("Context is null")
} 

let lines = [];

//  CONGFGURE EDITOR FONT
context.font = "bold 16px Monospace";
context.textAlign = "right"; // To keep the line numbers aligned

// DRAW EDITOR BACKGROUND
for (var y = LINE_HEIGHT; y < HEIGHT; y += LINE_HEIGHT) {
  context.moveTo(0, y);
  context.lineTo(WIDTH, y);
  context.fillText((y / LINE_HEIGHT).toString(), 25, y - 24);
}

context.strokeStyle = "black";
context.stroke();
