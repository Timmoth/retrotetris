import Board from "./board";
import InputHandler from "./inputhandler";
import Tetrominoe from "./tetrominoe";

export default class Game{
    board: Board;
    fallingTetrominoe: Tetrominoe;
    running: boolean;
    score: number;
    constructor(){
        this.board = new Board(this);
        this.fallingTetrominoe = Tetrominoe.Create(this);
        this.board.add(this.fallingTetrominoe);
        this.score = 0;
        this.running = true;
    }

    update(){
        if(!this.running){
            return;
        }

        if(this.fallingTetrominoe.canDrop(this.fallingTetrominoe.x, this.fallingTetrominoe.y - 1, this.fallingTetrominoe.orientation)){
            this.fallingTetrominoe.moveDown();
        }else{
            this.fallingTetrominoe = Tetrominoe.Create(this);
            this.board.add(this.fallingTetrominoe);
            this.running = this.fallingTetrominoe.canDrop(this.fallingTetrominoe.x, this.fallingTetrominoe.y -1, this.fallingTetrominoe.orientation);
        }

        for(var y = 0; y < this.board.verticalBlockCount; y++){
            var tetris = true;
            for(var x = 0; x < this.board.horizontalBlockCount; x++){
                if(this.board.blocks[x][y] == null){
                    tetris = false;
                    break;
                }
            }

            if(tetris){
                this.score++;
                for(var x = 0; x < this.board.horizontalBlockCount; x++){
                    this.board.blocks[x][y] = null;
                }

                for(var y2 = y + 1; y2 < this.board.verticalBlockCount; y2++){
                    for(var x = 0; x < this.board.horizontalBlockCount; x++){
                        var block = this.board.blocks[x][y2];
                        if(block == null)
                        {
                            continue;
                        }
                        block.y--;
                        this.board.blocks[x][y2] = null;
                        this.board.blocks[x][block.y] = block;
                    }
                }
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "gray";
        var [x, h] = this.board.getPosition(0,-2);
        var [w, y] = this.board.getPosition(this.board.horizontalBlockCount, this.board.verticalBlockCount);

        ctx.strokeRect(x, y, w, h);

        this.board.draw(ctx);

    }

    restart(){
        this.board.clear();
        this.fallingTetrominoe = Tetrominoe.Create(this);
        this.board.add(this.fallingTetrominoe);
        this.score = 0;
        this.running = true;
    }
}