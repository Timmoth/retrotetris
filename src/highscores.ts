import Game from './game';
import RetroTetris from './retrotetris';
type SubmitScoreResponse = {
  rank: number;
  total: number;
  scores: Score[];
};

export default class Highscores {
  tetris: RetroTetris;
  scores: Score[];
  textHeight: number;

  constructor(tetris: RetroTetris) {
    this.tetris = tetris;
    this.scores = [];
    this.textHeight = 30;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = '25px pixel';
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    var textWidth = ctx.measureText('00000').width;
    this.drawCenteredText(
      ctx,
      'Highscores',
    this.textHeight
      );

    this.drawCenteredText(
      ctx,
      'Click to play again',
      this.tetris.canvas.height - 2 * this.textHeight
    );

    ctx.font = '20px pixel';
    var textWidth = ctx.measureText('00000').width;

    ctx.fillText(
      'rank',
      this.tetris.canvas.width / 2 - 2 * textWidth,
      2 * this.textHeight
    );
    ctx.fillText(
      'name',
      (this.tetris.canvas.width - textWidth) / 2,
      2 * this.textHeight
    );
    ctx.fillText(
      'score',
      this.tetris.canvas.width / 2 + textWidth,
      2 * this.textHeight
    );

    for (var i = 0; i < this.scores.length; i++) {
      var score = this.scores[i];

      var formattedRank = String(score.rank).padStart(4, '0').toString();
      var formattedName = String(score.name).padEnd(5, ' ').toString();
      var formattedScore = String(score.score).padStart(4, '0').toString();

      var yPos =
        (i + 3) * this.textHeight;
      ctx.fillText(formattedRank, this.tetris.canvas.width / 2 - 2 * textWidth, yPos);
      ctx.fillText(formattedName, (this.tetris.canvas.width - textWidth) / 2, yPos);
      ctx.fillText(formattedScore, this.tetris.canvas.width / 2 + textWidth, yPos);
    }
  }

  drawCenteredText(ctx: CanvasRenderingContext2D, text: string, yPos: number) {
    ctx.fillText(
      text,
      (this.tetris.canvas.width - ctx.measureText(text).width) / 2,
      yPos
    );
  }

    handleClick(x: number, y: number){
        this.tetris.sidebar.showHighscores = false;
        this.tetris.game.restart();
    }

   async submit(score: number, name: string): Promise<SubmitScoreResponse | null> {
    this.scores = [];

    try {
      console.log('submitting score');
      const response = await fetch(`${this.tetris.apiUrl}/api/tetris/highscores`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          score: score
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          sessionid: '07daa504-864b-4055-a115-113a9d8d31d6',
          userid: '07daa504-864b-4055-a115-113a9d8d31d6'
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = (await response.json()) as SubmitScoreResponse;
        this.scores = result.scores;

      console.log('result is: ', JSON.stringify(result, null, 4));
      return result;
    } catch (error) {
      console.log('unexpected error: ', error);
      return null;
    }
  }
}
