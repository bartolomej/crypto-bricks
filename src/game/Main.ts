import Player from "./objects/Player";
import Brick from "./objects/Brick";
import Bullet from "./objects/Bullet";
import Vector from "./base/Vector";


enum GameState {
  INITIAL,
  STARTED
}

export default class Main {

  private animation: number | null;
  private player: Player | null;
  private bullet: Bullet | null;
  private bricks: Array<Array<Brick>> | null;
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
          ((brickWidth * j) + brickWidth / 2),
          this.getDimensions().y - ((brickWidth * i) + brickWidth / 2)
        );
        row.push(new Brick(brickWidth / 2, position));
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
    this.player = new Player(200, this.getDimensions().x / 2);
    this.bullet = new Bullet(bulletRadius, new Vector(this.player.position, this.player.height + bulletRadius));
    this.player.render(this.container);
    this.bullet.render(this.container);
  }

  startGame () {
    if (!(this.bricks && this.player && this.bullet)) {
      throw new Error('Not initialized');
    }
    this.bullet.velocity.y = 8;
    this.bullet.velocity.angle = (Math.random() * Math.PI / 2) + 1;
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

    // compute brick-bullet collisions
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        const brick = this.bricks[i][j];
        if (brick.isActive() && this.bullet.intersects(brick)) {
          const normal = brick.getNormal(this.bullet);
          normal.normalize();
          const u = normal.multiplyImmutable(this.bullet.velocity.dotProduct(normal));
          const w = this.bullet.velocity.subtractImmutable(u);
          this.bullet.velocity = w.subtractImmutable(u);
          brick.hit();
        }
      }
    }

    // compute player border collisions
    if (this.player.collision(0) || this.player.collision(this.getDimensions().x)) {
      this.player.bounce();
    }

    // compute top border bounce
    if (this.bullet.position.y >= this.getDimensions().y) {
      this.bullet.reflectVertical();
    }

    // compute bullet horizontal border collisions
    if (
      this.bullet.position.x <= this.bullet.radius ||
      this.bullet.position.x + this.bullet.radius >= this.getDimensions().x
    ) {
      this.bullet.reflectHorizontal();
    }

    // compute if player bounced the bullet
    if (this.player.intersects(this.bullet)) {
      this.bullet.reflectVertical();
    }

    // set horizontal bullet collision equal to player's if game hasn't started
    if (this.state === GameState.INITIAL) {
      this.bullet.position.x = this.player.position;
    }

    // check if bullet hit the ground
    if (this.bullet.position.y - this.bullet.radius <= 0) {
      this.resetGame()
    }

    // update and redraw objects
    this.player.update();
    this.bullet.update();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
