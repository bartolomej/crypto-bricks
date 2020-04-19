import Player from "./objects/Player";
import Brick from "./objects/Brick";
import Bullet from "./objects/Bullet";
import Vector from "./base/Vector";


enum GameState {
  INITIAL,
  STARTED
}

export default class Main {

  private animation: number|null;
  private player: Player|null;
  private bullet: Bullet|null;
  private bricks: Array<Array<Brick>>|null;
  private readonly rows: number;
  private readonly columns: number;
  private readonly container: HTMLElement;
  private state: GameState;

  constructor (container: HTMLElement, rows: number, columns: number) {
    this.container = container;
    this.animation = null;
    this.player = null;
    this.bullet = null;
    this.bricks = null;
    this.rows = rows;
    this.columns = columns;
    this.state = GameState.INITIAL;
  }

  private getDimensions () {
    return {
      x: this.container.clientWidth,
      y: this.container.clientHeight
    }
  }

  initialize () {
    this.initializeBricks();
    this.initializePlayer();
    this.requestAnimation();
    this.registerListeners();
  }

  initializeBricks () {
    const bricks = [];
    const brickWidth = this.getDimensions().x / this.columns;
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        const position = new Vector(
          ((brickWidth*j) + brickWidth/2),
          this.getDimensions().y - ((brickWidth*i) + brickWidth/2)
        );
        row.push(new Brick(brickWidth/2, position));
      }
      bricks.push(row);
    }
    this.bricks = bricks;
    this.container.append(...this.bricks.flat(2).map(e => e.render()))
  }

  initializePlayer () {
    const bulletRadius = 20;
    if (this.player) {
      this.player.removeDom();
    }
    if (this.bullet) {
      this.bullet.removeDom();
    }
    this.player = new Player(150, this.getDimensions().x / 2);
    this.bullet = new Bullet(bulletRadius, new Vector(this.player.position, this.player.height + bulletRadius));
    this.player.render(this.container);
    this.bullet.render(this.container);
  }

  startGame() {
    if (!(this.bricks && this.player && this.bullet)) {
      throw new Error('Not initialized');
    }
    this.bullet.velocity.y = 8;
    this.state = GameState.STARTED;
  }

  resetGame () {
    if (!(this.bricks && this.player && this.bullet)) {
      throw new Error('Not initialized');
    }
    this.initializePlayer();
    this.state = GameState.INITIAL;
  }

  requestAnimation () {
    if (!this.animation) {
      this.animation = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.player?.moveLeft();
    }
    if (e.code === 'ArrowRight') {
      this.player?.moveRight();
    }
    if (e.code === 'Space' && this.state === GameState.INITIAL) {
      this.startGame();
    }
  }

  gameLoop () {
    if (!(this.bricks && this.player && this.bullet)) {
      throw new Error('Not initialized');
    }

    if (this.player.collision(0) || this.player.collision(this.getDimensions().x)) {
      this.player.bounce();
    }

    if (this.state === GameState.INITIAL) {
      this.bullet.position.x = this.player.position;
    }

    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        const brick = this.bricks[i][j];
        if (this.bullet.intersects(brick)) {
          const intersectionAngle = this.bullet.intersectionAngle(brick);
          const diff = this.bullet.velocity.angle - intersectionAngle;
          this.bullet.velocity.angle = (intersectionAngle - diff);
        }
      }
    }

    if (
      this.bullet.position.x <= this.bullet.radius ||
      this.bullet.position.x + this.bullet.radius >= this.getDimensions().x
    ) {
      this.bullet.reflectHorizontal();
    }

    if (this.bullet.position.y - this.bullet.radius <= 0) {
      this.resetGame()
    }

    console.log(this.bullet.position)

    if (this.player.intersects(this.bullet)) {
      this.bullet.reflectVertical();
    }

    this.player.update();
    this.bullet.update();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
