const COLORS = ['#FCF6F5', '#0e0000'];
const CELL_SIZE = 15;
const SPEED = 6;

class GameOfLife {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'gameOfLife';
    document.body.prepend(this.canvas);
    // Add padding to body to prevent content overlap
    document.body.style.paddingTop = '20px';
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.initGrid();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.cols = Math.floor(this.width / CELL_SIZE);
    this.rows = Math.floor(this.height / CELL_SIZE);
  }

  initGrid() {
    this.grid = Array(this.cols).fill().map(() => 
      Array(this.rows).fill().map(() => Math.floor(Math.random() > 0.8))
    );
  }

  countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const col = (x + i + this.cols) % this.cols;
        const row = (y + j + this.rows) % this.rows;
        sum += this.grid[col][row];
      }
    }
    return sum - this.grid[x][y];
  }

  update() {
    const next = this.grid.map(arr => [...arr]);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const neighbors = this.countNeighbors(i, j);
        if (this.grid[i][j]) {
          next[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          next[i][j] = neighbors === 3;
        }
      }
    }
    this.grid = next;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.grid[i][j]) {
          this.ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
          this.ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE-1, CELL_SIZE-1);
        }
      }
    }
  }

  animate() {
    this.frameCounter = (this.frameCounter || 0) + 1;
    
    if(this.frameCounter % SPEED === 0) {
      this.draw();
      this.update();
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

new GameOfLife();