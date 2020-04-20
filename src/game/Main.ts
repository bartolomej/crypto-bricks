import Player from "./objects/Player";
import Brick from "./objects/Brick";
import Bullet from "./objects/Bullet";
import Vector from "./base/Vector";


enum GameState {
  INITIAL,
  STARTED
}

type Props = {
  container: HTMLElement;
  rows: number;
  columns: number;
  onScore: Function;
  onMissed: Function;
}

export default class Main {

  private animation: number | null;
  private player!: Player;
  private bullet!: Bullet;
  private bricks!: Array<Array<Brick>>;
  private readonly rows: number;
  private readonly columns: number;
  private readonly container: HTMLElement;
  private state: GameState;
  private readonly onScore: Function;
  private readonly onMissed: Function;

  constructor ({container, rows, columns, onMissed, onScore}: Props) {
    this.onScore = onScore;
    this.onMissed = onMissed;
    this.container = container;
    this.animation = null;
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

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown (e: KeyboardEvent) {
    if (e.code === 'Space' && this.state === GameState.INITIAL) {
      this.startGame();
    }
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
    this.player = new Player({
      width: 200,
      position: this.getDimensions().x / 2,
      speed: 20
    });
    this.bullet = new Bullet(bulletRadius, new Vector(this.player.position, this.player.height + bulletRadius));
    this.player.render(this.container);
    this.bullet.render(this.container);
  }

  startGame () {
    this.bullet.velocity.y = 8;
    this.bullet.velocity.angle = (Math.random() * Math.PI / 2) + 1;
    this.state = GameState.STARTED;
  }

  resetGame () {
    this.initializePlayer();
    this.state = GameState.INITIAL;
  }

  requestAnimation () {
    if (!this.animation) {
      this.animation = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  gameLoop (time: number) {
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
          this.onScore();
        }
      }
    }

    // compute player border collisions
    if (this.player.collision(0)) {
      this.player.bounceRight();
      this.player.updateRightPosition();
    }
    else if (this.player.collision(this.getDimensions().x)) {
      this.player.bounceLeft();
      this.player.updateLeftPosition()
    }
    else {
      this.player.updateVelocity();
      this.player.updateLeftPosition()
      this.player.updateRightPosition();
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
      this.resetGame();
      this.onMissed();
    }

    // update and redraw objects
    this.player.update(time);
    this.bullet.update(time);

    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
