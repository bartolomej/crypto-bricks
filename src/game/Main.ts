import Player from "./Player";
import Brick from "./Brick";
import Bullet from "./Bullet";

export default class Main {

  private animation: number|null;
  private player: Player|null;
  private bullet: Bullet|null;
  private bricks: Array<Array<Brick>>|null;
  private readonly rows: number;
  private readonly columns: number;

  constructor (rows: number, columns: number) {
    this.animation = null;
    this.player = null;
    this.bullet = null;
    this.bricks = null;
    this.rows = rows;
    this.columns = columns;
  }

  initialize () {
    this.player = new Player();
    this.bullet = new Bullet();
    const bricks = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(new Brick());
      }
      bricks.push(row);
    }
    this.bricks = bricks;

    this.requestAnimation();
    this.registerListeners();
  }

  requestAnimation () {
    if (!this.animation) {
      this.animation = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.player?.moveLeft();
    }
    if (e.code === 'ArrowRight') {
      this.player?.moveRight();
    }
  }

  // TODO: check if was moving in same direction as key up event
  onKeyUp (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      this.player?.stop();
    }
  }

  render (parent: HTMLElement) {
    if (!this.bricks || !this.player) {
      throw new Error("Game not initialized");
    }
    const bricksWrapper = document.createElement('div');
    bricksWrapper.className = 'bricks-wrapper';
    for (let i = 0; i < this.bricks.length; i++) {
      const row = document.createElement('div');
      row.className = 'bricks-row';
      for (let j = 0; j < this.bricks[i].length; j++) {
        row.appendChild(this.bricks[i][j].render());
      }
      bricksWrapper.appendChild(row);
    }
    const playerDom = this.player.render(parent);
    parent.append(bricksWrapper, playerDom);
  }

  gameLoop () {
    this.player?.update();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
