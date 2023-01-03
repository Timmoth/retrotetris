import Block from "./block";
import Game from "./game"

export default class Tetrominoe{
    game: Game;
    blocks: Block[];
    x: number;
    y: number;
    matrix: number[][];
    orientation: number;
    style: number;
    constructor(game: Game, x: number, y: number, matrix: number[][]){
        this.game = game;
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.orientation = Math.floor(Math.random() * 3);
        var positions = this.matrix[this.orientation];
        this.blocks = [];
        this.style = Math.floor(Math.random() * 4);

        var index = 0;
        for(var i = 0; i < positions.length; i+=2){
            var newBlock = this.blocks[index++] = new Block(game,  x + positions[i],  y + positions[i+1], this.style);
            this.game.board.blocks[newBlock.x][newBlock.y] = newBlock;
        }
    }

    canDrop(newX: number, newY: number, orientation: number): boolean{
        var positions = this.matrix[orientation];
        for(var i = 0; i < positions.length; i+=2){
            var x = newX + positions[i];
            var y = newY + positions[i+1];

            if(y < 0){
                return false;
            }

            if(x < 0 || x >= this.game.board.horizontalBlockCount){
                return false;
            }

            var existingBlock = this.game.board.blocks[x][y];
            if(existingBlock == null){
                continue;
            }

            var isPartOfTetrominoe = false;
            for(var j = 0; j < this.blocks.length; j++){
                if(existingBlock == this.blocks[j]){
                    isPartOfTetrominoe = true;
                    break;
                }
            }

            if(!isPartOfTetrominoe){
                return false;
            }
        }

        return true;
    }

    rotateRight(){
        var newOrientation = (this.orientation + 1) % 4;
        if(this.canDrop(this.x, this.y, newOrientation)){
            this.orientation = newOrientation;    
            console.log(this.orientation);

        }
    }

    moveDown(){
        for(var i = 0; i < this.blocks.length; i++){
            var block = this.blocks[i];
            this.game.board.blocks[block.x][block.y] = null;
        }

        this.y--;
        var positions = this.matrix[this.orientation];
        var index = 0;
        for(var i = 0; i < positions.length; i+=2){
            var block = this.blocks[index++] = new Block(this.game,  this.x + positions[i],  this.y + positions[i+1], this.style);
            this.game.board.blocks[block.x][block.y] = block;
        }
    }
    
    moveLeft(){
        if(this.canDrop(this.x - 1, this.y, this.orientation))
        {
            this.x --;
        }
    }

    moveRight(){
        if(this.canDrop(this.x + 1, this.y, this.orientation))
        {
            this.x ++;
        }
    }

    static Create(game: Game): Tetrominoe{
        var x = Math.max(Math.floor(Math.random() * game.board.horizontalBlockCount - 3), 2);
        var y = game.board.verticalBlockCount - 2;
        var matrix = TetrominoeMatrix.getTetrominoeMatrix();
        return new Tetrominoe(game, x, y, matrix);
    }
}

class TetrominoeMatrix{

    static getTetrominoeMatrix(): number[][] {
        var i = Math.round(Math.random() * 4);
        switch(i){
            case 0: 
                return TetrominoeMatrix.straightTetrominoe;
            case 1: 
                return TetrominoeMatrix.tTetrominoe;
            case 2: 
                return TetrominoeMatrix.lTetrominoe;
            case 3: 
                return TetrominoeMatrix.skewTetrominoe;
            case 4: 
                return TetrominoeMatrix.squareTetrominoe;
        }
    }

    static straightTetrominoe: number[][] = [
        [0, -1, 0, 0, 0, 1, 0, 2],
        [-1, 0, 0, 0, 1, 0, 2, 0],
        [0, -1, 0, 0, 0, 1, 0, 2],
        [-1, 0, 0, 0, 1, 0, 2, 0],
    ]

    static tTetrominoe: number[][] = [
        [-1, 0, 0, 0, 1, 0, 0, -1],
        [0, 1, 0, 0, 0, -1, -1, 0],
        [-1, 0, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 0, 0, -1, 1, 0],
    ]

    static lTetrominoe: number[][] = [
        [0, -1, 0, 0, 0, 1, 1, 1],
        [-1, 0, 0, 0, 1, 0, 1, -1],
        [0, 1, 0, 0, 0, -1, -1, -1],
        [-1, 0, 0, 0, 1, 0, -1, 1],
    ]

    static skewTetrominoe: number[][] = [
        [0, 1, 0, 0, 1, 0, 1, -1],
        [1, 0, 0, 0, 0, -1, -1, -1],
        [0, -1, 0, 0, -1, 0, -1, 1],
        [-1, 0, 0, 0, 0, 1, 1, 1],
    ]

    static squareTetrominoe: number[][] = [
        [0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 0, 1, 1],
    ]
}