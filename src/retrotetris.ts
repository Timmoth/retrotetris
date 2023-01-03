import Game from "./game";
import Highscores from "./highscores";
import InputHandler from "./inputhandler";
import SideBar from "./sidebar";

export default class RetroTetris {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  game: Game;
  highscores: Highscores;
  sidebar: SideBar;
  lastTimeStamp: number;
  inputHandler: InputHandler;
  apiUrl: string | null;

  constructor(apiUrl: string | null) {
    this.apiUrl = apiUrl;
    this.canvas = document.getElementById(
      'tetris-canvas'
    ) as HTMLCanvasElement;

    if (this.canvas == null) {
      throw new Error('Could not find canvas.');
    }

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.game = new Game();
    this.inputHandler = new InputHandler(this);
    this.sidebar = new SideBar(this.game, this, this.inputHandler);
    this.lastTimeStamp = 0;
    this.highscores = new Highscores(this);
  }

  Start() {
    this.animate(0);
  }

  animate(timestamp: number) {
    if (timestamp - this.lastTimeStamp >= 200) {
        this.lastTimeStamp = timestamp;
        this.game.update();
    }
    this.draw();
    requestAnimationFrame((n) => this.animate(n));
  }

  draw(){
    this.ctx.fillStyle = '#94d300';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if(this.sidebar.showHighscores){
        this.highscores.draw(this.ctx);
    }else{
        this.game.draw(this.ctx);
        this.sidebar.draw(this.ctx);
    }
  }
}
