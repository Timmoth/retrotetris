import Game from "./game";

export default class Block{
    game: Game;
    x: number;
    y: number;
    style: number;
    lineThickness: number;
    constructor(game: Game, x: number, y: number, style: number){
        this.game = game;
        this.x = x;
        this.y = y;
        this.style = style;
        this.lineThickness = 3;
    }

    update(){

    }

    draw(ctx: CanvasRenderingContext2D){
        
        var [x, y] = this.game.board.getPosition(this.x, this.y);
        switch(this.style){
            case 0:
                ctx.fillStyle = '#8b936f';
                ctx.fillRect(x, y, this.game.board.blockWidth, this.game.board.blockHeight);
                break;
            case 1:
                ctx.fillStyle = '#6d735c';
                ctx.fillRect(x, y, this.game.board.blockWidth, this.game.board.blockHeight);
                break;
            case 2:
                ctx.fillStyle = '#bccc8c';
                ctx.fillRect(x, y, this.game.board.blockWidth, this.game.board.blockHeight);
                break;
            case 3:
                ctx.fillStyle = '#7c7c5c';
                ctx.fillRect(x, y, this.game.board.blockWidth, this.game.board.blockHeight);
                break;
        }

        ctx.lineWidth = this.lineThickness;
        ctx.strokeStyle = '#474a40'
        ctx.strokeRect(x + this.lineThickness / 2, y + this.lineThickness / 2, this.game.board.blockWidth - this.lineThickness, this.game.board.blockHeight - this.lineThickness);

    }
}