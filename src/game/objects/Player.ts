import Circle from "../base/Circle";
import Vector from "../base/Vector";


const coins = ['btc', 'eth', 'mkr'];

type Props = {
  width: number;
  position: number;
  speed?: number;
  coin: string;
}

export default class Player extends Circle {

  private domElement: HTMLDivElement | null;
  private width: number;
  private readonly height: number;
  velocity: number;
  private parent: HTMLElement | null;
  private readonly bottomPadding: number;
  private moveRight: boolean;
  private moveLeft: boolean;
  private enableInteraction: boolean;
  private coin: string;

  constructor ({ width, position, speed = 1, coin }: Props) {
    super(width / 2, new Vector(position, width / 2));
    this.height = 15;
    this.bottomPadding = 8;
    this.width = width;
    this.velocity = speed;
    this.domElement = null;
    this.parent = null;
    this.registerListeners();
    this.moveRight = false;
    this.moveLeft = false;
    this.enableInteraction = true;
    this.coin = coin;
  }

  // sets horizontal position with animation
  async setPositionAnimated (pos: number) {
    return new Promise(resolve => {
      if (!this.domElement) return;
      const duration = 1;
      this.domElement.style.transition = `all ${duration}s ease-in-out`;
      super.setPosition(new Vector(pos, this.radius));
      setTimeout(() => {
        if (!this.domElement) return;
        this.domElement.style.transition = '';
        return resolve();
      }, duration * 1000)
    });
  }

  setEnableInteraction (enable: boolean) {
    this.enableInteraction = enable;
  }

  setVelocity (v: number) {
    this.velocity = v;
  }

  getHeight () {
    return this.radius * 2 + this.bottomPadding + 5;
  }

  bounceLeft () {
    this.velocity = -Math.abs(this.velocity) * 0.8;
  }

  bounceRight () {
    this.velocity = Math.abs(this.velocity) * 0.8;
  }

  updateRightPosition () {
    if (this.moveRight) {
      this.position.x += this.velocity;
    }
  }

  updateLeftPosition () {
    if (this.moveLeft) {
      this.position.x -= this.velocity;
    }
  }

  updatePosition () {
    this.updateLeftPosition();
    this.updateRightPosition();
  }

  update () {
    if (!this.domElement) return;
    this.domElement.style.left = `${this.position.x - this.radius}px`;
  }

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  onKeyDown (e: KeyboardEvent) {
    if (!this.enableInteraction) {
      this.moveRight = false;
      this.moveLeft = false;
      return;
    }
    if (e.code === 'ArrowRight') {
      this.moveRight = true;
    }
    if (e.code === 'ArrowLeft') {
      this.moveLeft = true;
    }
  }

  onKeyUp (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.moveLeft = false;
    }
    if (e.code === 'ArrowRight') {
      this.moveRight = false;
    }
  }

  render (parent: HTMLElement) {
    const image = require(`../assets/${this.coin}-color.png`);
    const container = super.createElement('player', image);
    this.parent = parent;
    this.domElement = container;
    this.parent.appendChild(container);
  }

  removeDom () {
    if (this.domElement && this.parent) {
      this.parent.removeChild(this.domElement);
    }
  }

}
