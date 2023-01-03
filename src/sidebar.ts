import Game from "./game";
import InputHandler from "./inputhandler";
import RetroTetris from "./retrotetris";

export default class SideBar{
    game: Game;
    retrotetris: RetroTetris;
    inputHandler: InputHandler;
    textHeight = 35;
    showHighscores: boolean;

    constructor(game: Game, retrotetris: RetroTetris, inputHandler: InputHandler){
        this.game = game;
        this.retrotetris = retrotetris;
        this.inputHandler = inputHandler;
        this.showHighscores = false;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.font = '28px pixel';
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        var sideBarCenterX = this.game.board.boardWidth + (this.retrotetris.canvas.width - this.game.board.boardWidth) / 2;
        this.drawCenteredText(ctx, 'Score', sideBarCenterX, this.textHeight);
        this.drawCenteredText(ctx, String(this.game.score).padStart(4, '0').toString(), sideBarCenterX, 2 * this.textHeight);

        if (!this.game.running) {

            
            if(this.retrotetris.apiUrl != null){
                this.drawCenteredText(ctx, 'Game Over', sideBarCenterX, 3 * this.textHeight);
                this.drawCenteredText(ctx, 'Name:', sideBarCenterX, 5 * this.textHeight);
                var nameText = String(this.inputHandler.getText()).padStart(5, '_').toString();
                this.drawCenteredText(ctx, nameText, sideBarCenterX, 6 * this.textHeight);
                if(this.inputHandler.canSubmit())
                {
                    this.drawCenteredText(ctx, 'Submit', sideBarCenterX, 8 * this.textHeight);
                }
            }


            this.drawCenteredText(ctx, 'Play Again', sideBarCenterX, this.retrotetris.canvas.height - this.textHeight);
        }

    }

    drawCenteredText(ctx: CanvasRenderingContext2D, text: string, xPos: number, yPos: number) {
        ctx.fillText(text, xPos - ctx.measureText(text).width / 2, yPos);
    }
    
    handleClick(x: number, y: number){
        var restartButtonLocation = this.retrotetris.canvas.height - this.textHeight;
        var submitButtonLocation = 8 * this.textHeight;

        if (y - restartButtonLocation >= 0 && y - restartButtonLocation <= this.textHeight) {
            this.showHighscores = false;
            this.game.restart();
        } else if (y - submitButtonLocation >= 0 && y - submitButtonLocation <= this.textHeight && this.inputHandler.canSubmit()) {

            this.retrotetris.highscores.submit(this.game.score, this.inputHandler.getText()).then((s) => { this.showHighscores = true; });
        }
  }
}