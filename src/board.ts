import Block from "./block";
import Game from "./game";
import Tetrominoe from "./tetrominoe";

export default class Board{
    game: Game;
    boardWidth: number;
    boardHeight: number;
    blocks: Block[][];
    blockWidth: number;
    blockHeight: number;
    horizontalBlockCount: number;
    verticalBlockCount: number;
    
    constructor(game: Game){
        this.game = game;
        this.boardWidth = 300;
        this.boardHeight = 500;
        this.horizontalBlockCount = 15;
        this.verticalBlockCount = 25;
        this.blockWidth = this.boardWidth / this.horizontalBlockCount;
        this.blockHeight = this.boardHeight / this.verticalBlockCount;

        this.blocks = [];
        for(var x = 0; x < this.horizontalBlockCount; x++){
            this.blocks[x] = [];
            for(var y = 0; y < this.verticalBlockCount; y++){
                this.blocks[x][y] = null;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D){
        for(var x = 0; x < this.horizontalBlockCount; x++){
            var col = this.blocks[x];
            for(var y = 0; y < this.verticalBlockCount; y++){
                if(col[y] != null){
                    col[y].draw(ctx);
                }
            }
        }
    }

    getPosition(x: number, y: number): [number, number]{
        return [x * this.blockWidth, (this.verticalBlockCount - (y + 1)) * this.blockHeight];
    }

    add(tetrominoe: Tetrominoe){
        for(var i = 0; i < tetrominoe.blocks.length; i++){
            var block = tetrominoe.blocks[i];
            this.blocks[block.x][block.y] = block;
        }
    }
    
    clear(){
        for(var x = 0; x < this.horizontalBlockCount; x++){
            for(var y = 0; y < this.verticalBlockCount; y++){
                this.blocks[x][y] = null;
            }
        }
    }
}