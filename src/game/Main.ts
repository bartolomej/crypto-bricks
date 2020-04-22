import Player from "./objects/Player";
import Brick from "./objects/Brick";
import Bullet from "./objects/Bullet";
import Vector from "./base/Vector";


enum GameState {
  INITIAL,
  STARTED,
}

type Props = {
  container: HTMLElement;
  rows: number;
  columns: number;
  onScore: Function;
  onMissed: Function;
  onStart: Function;
  playerSize?: number;
  bulletSize?: number;
  velocity: number;
}

export default class Main {

  private animation: number | null;
  private player!: Player;
  private bullet!: Bullet;
  private bricks!: Array<Array<Brick>>;
  private rows: number;
  private columns: number;
  private readonly domElement: HTMLElement;
  private state: GameState;
  private readonly onScore: Function;
  private readonly onMissed: Function;
  private borderPadding: number;
  private brickPadding: number;
  private bulletSize: number;
  private playerSize: number;
  private readonly onStart: Function;
  private velocity: number;
  private bricksWrapperDom: HTMLDivElement;
  private enableInteraction: boolean;

  constructor ({
    container,
    rows,
    columns,
    onMissed,
    onScore,
    bulletSize,
    playerSize,
    onStart,
    velocity
  }: Props) {
    this.onScore = onScore;
    this.onMissed = onMissed;
    this.onStart = onStart;
    this.velocity = velocity;
    this.domElement = container;
    this.bricksWrapperDom = document.createElement('div');
    this.animation = null;
    this.rows = rows;
    this.columns = columns;
    this.state = GameState.INITIAL;
    this.borderPadding = 20;
    this.brickPadding = 10;
    this.bulletSize = bulletSize || 40;
    this.playerSize = playerSize || 150;
    this.enableInteraction = true;
    this.domElement.appendChild(this.bricksWrapperDom);
  }

  setPlayerSize (size: number) {
    this.playerSize = size;
    this.initializePlayer();
  }

  setBulletSize (size: number) {
    this.bulletSize = size;
    this.initializeBullet();
  }

  setBricksQuantity (rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.initializeBricks();
  }

  setVelocity (v: number) {
    this.velocity = v;
    this.player.setVelocity(v * 2);
  }

  private getDimensions () {
    return {
      x: this.domElement.clientWidth,
      y: this.domElement.clientHeight
    }
  }

  private get initialPlayerPosition () {
    return this.getDimensions().x / 2;
  }

  private get initialBulletPosition () {
    return new Vector(this.player.position, this.player.getHeight() + this.bulletSize / 2);
  }

  private get brickWidth () {
    const { borderPadding, brickPadding } = this;
    return (this.getDimensions().x - (borderPadding * 2) - ((this.columns - 1) * brickPadding)) / this.columns;
  }

  initialize () {
    this.initializeBricks();
    this.initializePlayer();
    this.initializeBullet();
    this.requestAnimation();
    this.registerListeners();
  }

  async resetPlayerAndBall () {
    this.player.setEnableInteraction(false);
    this.enableInteraction = false;
    await Promise.all([
      this.bullet.setPosition(this.initialBulletPosition),
      this.player.setPosition(this.initialPlayerPosition)
    ]);
    this.enableInteraction = true;
    this.player.setEnableInteraction(true);
  }

  startGame () {
    this.bullet.setVelocity(this.velocity);
    this.bullet.setAngle((Math.random() * Math.PI / 2) + 1);
    this.state = GameState.STARTED;
    this.onStart();
  }

  resetRound () {
    this.onMissed();
    this.resetPlayerAndBall();
    this.state = GameState.INITIAL;
    this.bullet.velocity.y = 0;
  }

  destroy () {
    this.domElement.remove();
  }

  initializeBricks () {
    if (this.bricksWrapperDom.hasChildNodes()) {
      this.domElement.removeChild(this.bricksWrapperDom);
      this.bricksWrapperDom = document.createElement('div');
      this.domElement.appendChild(this.bricksWrapperDom);
    }
    const bricks = [];
    const { borderPadding, brickPadding } = this;
    const bW = this.brickWidth;
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        const xPadding = (j === 0 ? 0 : j * brickPadding);
        const yPadding = (i === 0 ? 0 : i * brickPadding);
        const x = ((bW * j) + bW / 2 + borderPadding + xPadding);
        const y = this.getDimensions().y - ((bW * i) + bW / 2) - borderPadding - yPadding;
        row.push(new Brick(bW / 2, new Vector(x, y)));
      }
      bricks.push(row);
    }
    this.bricks = bricks;
    this.bricksWrapperDom.append(...this.bricks.flat(2).map(e => e.render()))
  }

  initializePlayer () {
    if (this.player) {
      this.player.removeDom();
    }
    this.player = new Player({
      width: this.playerSize,
      position: this.initialPlayerPosition,
      speed: this.velocity,
    });
    this.player.render(this.domElement);
  }

  initializeBullet () {
    if (this.bullet) {
      this.bullet.removeDom();
    }
    this.bullet = new Bullet(
      this.bulletSize / 2,
      this.initialBulletPosition
    );
    this.bullet.render(this.domElement);
  }

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown (e: KeyboardEvent) {
    if (!this.enableInteraction) return;
    if (e.code === 'Space' && this.state === GameState.INITIAL) {
      this.startGame();
    }
  }

  requestAnimation () {
    if (!this.animation) {
      this.animation = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  gameLoop () {
    // compute brick-bullet collisions and response
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        const brick = this.bricks[i][j];
        if (brick.isActive() && this.bullet.intersects(brick)) {
          this.bullet.velocity = this.bullet.bounceVelocity(brick);
          brick.hit();
          this.onScore(brick.coin);
        }
      }
    }

    // compute player border collisions
    if (this.player.collision(0)) {
      this.player.updateRightPosition();
    } else if (this.player.collision(this.getDimensions().x)) {
      this.player.updateLeftPosition();
    } else {
      this.player.updatePosition();
    }

    // compute top border bounce
    if ((this.bullet.position.y - this.bullet.radius) >= this.getDimensions().y) {
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
    } else if (this.player.intersectsCorners(this.bullet)) {
      this.bullet.velocity = this.player.cornerIntersection(this.bullet);
    }

    // set horizontal bullet collision equal to player's if game hasn't started
    if (this.state === GameState.INITIAL) {
      this.bullet.position.x = this.player.position;
    }

    // check if bullet hit the ground
    if (this.bullet.position.y - this.bullet.radius <= 0) {
      this.resetRound();
    }

    // update and redraw objects
    this.player.update();
    this.bullet.update();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
