import Game from "./game";
import RetroTetris from "./retrotetris";
export enum Direction {
  Up = 0,
  Down,
  Left,
  Right
}

export default class InputHandler {
    tetris: RetroTetris;
    textInput: string;

  constructor(tetris: RetroTetris) {
    this.tetris = tetris;
    this.textInput = '';

    this.tetris.canvas.addEventListener('click', (e: MouseEvent) => {
      if (this.tetris.game.running) {
        return;
      }

      let rect = this.tetris.canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      if(this.tetris.sidebar.showHighscores){
        this.tetris.highscores.handleClick(x,y);
      }else{
        this.tetris.sidebar.handleClick(x,y);
      }
    });
    

    window.addEventListener('keydown', (e) => {

    if (e.key === 'Backspace' || e.key === 'Delete') {
        if (this.textInput.length > 0) {
          this.textInput = this.textInput.slice(0, -1);
        }
      }

      const key = e.key.toLowerCase();
      if (key.length === 1) {
        if (this.textInput.length >= 5) {
          return;
        }

        this.textInput += key;
      }

        if(!this.tetris.game.running){
            return;
        }

      if (e.key === 'ArrowUp') {
        this.tetris.game.fallingTetrominoe.rotateRight();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if(this.tetris.game.fallingTetrominoe.canDrop(this.tetris.game.fallingTetrominoe.x, this.tetris.game.fallingTetrominoe.y - 1, this.tetris.game.fallingTetrominoe.orientation)){
            this.tetris.game.fallingTetrominoe.moveDown();
            this.tetris.draw();
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        this.tetris.game.fallingTetrominoe.moveLeft();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        this.tetris.game.fallingTetrominoe.moveRight();
        e.preventDefault();
      }
    });
  }

    clearText() {
    this.textInput = '';
  }

  getText() {
    return this.textInput;
  }

  canSubmit(): boolean {
    return this.textInput.length >= 3;
  }
}
