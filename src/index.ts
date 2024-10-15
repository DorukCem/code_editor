const WIDTH = 1200;
const HEIGHT = 800;
const LINE_HEIGHT = 20;
const TOP_GUTTER = 40;
const TEXT_FONT = '14px Monospace';

class Line {
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}

function addCharToString(str: string, ch: string, position: number): string {
  return str.substring(0, position) + ch + str.substring(position);
}

function removeCharFromString(str: string, position: number): string {
  if (position <= 0) {
    return str;
  }
  return str.slice(0, position-1) + str.slice(position);
}

function render_line(
  context: CanvasRenderingContext2D,
  line: Line,
  start_y: number,
  idx: number,
) {
  const line_num_padding = 25;
  const text_padding = 40;

  context.textBaseline = 'middle';
  context.textAlign = 'right'; // To keep the line numbers aligned
  context.fillText(idx.toString(), line_num_padding, start_y + LINE_HEIGHT / 2);

  context.textAlign = 'left'; // To keep the line numbers aligned
  context.fillText(line.content, text_padding, start_y + LINE_HEIGHT / 2);
}

const cursor = { line: 0, column: 0 };

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

// This part is just to to have a non null context for TS
if (ctx == null) {
  throw new Error('Context is null');
}
let context = ctx;

//  CONGFGURE EDITOR FONT
context.font = TEXT_FONT;

// Capture all key presses
document.addEventListener('keydown', function (e) {
  let key = e.key;
  showCursor = 30;
  // Check if it's a special key  combination
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent the browser's save dialog
    console.log('Save shortcut triggered');
    // Implement save functionality
  }
  // Check if it's a special key (like Enter, Backspace, etc.)
  else if (e.key === 'Backspace') {
    lines[0].content = removeCharFromString(lines[0].content, cursor.column);
    if (cursor.column > 0) {
      cursor.column -= 1;
    }
    console.log('Delete');
  } else if (e.key === 'Enter') {
    // Handle Enter (move to a new line)
    console.log('Enter');
  } else if (e.key === 'ArrowLeft') {
    console.log(e.key);
  } else if (e.key === 'ArrowRight') {
    console.log(e.key);
  } else if (e.key === 'ArrowUp') {
    console.log(e.key);
  } else if (e.key === 'ArrowDown') {
    console.log(e.key);
  } else if (key.length === 1) {
    // Normal character input
    console.log(key);
    lines[0].content = addCharToString(lines[0].content, key, cursor.column);
    cursor.column++;
  }
});

let frame = 0;
var showCursor = 0;
let lines: Line[] = [new Line('Hello World'), new Line('BYE World')];

function mainLoop() {
  context.clearRect(0, 0, WIDTH, HEIGHT);

  draw();

  frame = (frame + 1) % 60;
  if (showCursor > 0) {
    showCursor -= 1;
  }
  // Keep requesting new frames
  window.requestAnimationFrame(mainLoop);
}

function draw() {
  lines.forEach((line, idx) => {
    const y_top = idx * LINE_HEIGHT + TOP_GUTTER;
    render_line(context, line, y_top, idx);

    if (cursor.line === idx && (showCursor > 0 || frame < 30)) {
      // Draw cursor
      let line_width = context.measureText(
        lines[0].content.slice(0, cursor.column),
      ).width;
      let cursor_x_pos = line_width + 40;
      console.log('line_width:', line_width);

      context.beginPath();
      context.moveTo(cursor_x_pos, y_top);
      context.lineTo(cursor_x_pos, y_top + LINE_HEIGHT - 2);

      context.strokeStyle = 'black';
      context.stroke();
    }
  });
}

mainLoop();
