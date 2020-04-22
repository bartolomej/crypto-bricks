import Circle from "../base/Circle";
import Vector from "../base/Vector";
import Bullet from "./Bullet";


type Props = {
  width: number;
  position: number;
  speed?: number;
}

export default class Player {

  private domElement: HTMLDivElement | null;
  private width: number;
  private readonly height: number;
  velocity: number;
  position: number;
  private parent: HTMLElement | null;
  private readonly bottomPadding: number;
  private moveRight: boolean;
  private moveLeft: boolean;
  private enableInteraction: boolean;

  constructor ({ width, position, speed = 1 }: Props) {
    this.height = 15;
    this.bottomPadding = 8;
    this.width = width;
    this.position = position;
    this.velocity = speed;
    this.domElement = null;
    this.parent = null;
    this.registerListeners();
    this.moveRight = false;
    this.moveLeft = false;
    this.enableInteraction = true;
  }

  private getCorners () {
    const r = this.height / 2;
    const left = new Circle(r, new Vector(this.position - (this.width / 2) + r, r));
    const right = new Circle(r, new Vector(this.position + (this.width / 2) - r, r));
    return { left, right };
  }

  // sets horizontal position with animation
  async setPosition (pos: number) {
    return new Promise(resolve => {
      if (!this.domElement) return;
      const duration = 1;
      this.domElement.style.transition = `all ${duration}s ease-in-out`;
      this.position = pos;
      setTimeout(() => {
        if (!this.domElement) return;
        this.domElement.style.transition = '';
        return resolve();
      }, duration * 1000)
    });
  }

  setEnableInteraction(enable: boolean) {
    this.enableInteraction = enable;
  }

  setVelocity (v: number) {
    this.velocity = v;
  }

  getHeight () {
    return this.height + this.bottomPadding + 5;
  }

  bounceLeft () {
    this.velocity = -Math.abs(this.velocity) * 0.8;
  }

  bounceRight () {
    this.velocity = Math.abs(this.velocity) * 0.8;
  }

  collision (x: number) {
    return Math.sqrt((x - this.position) ** 2) <= this.width / 2;
  }

  // only checks vertical collision
  // implemented for our special case
  intersects (bullet: Circle) {
    const d = bullet.position.y - (this.height / 2);
    if (
      (bullet.position.x) >= this.position - this.width / 2 &&
      (bullet.position.x) <= this.position + this.width / 2 &&
      d < bullet.radius + ((this.height + this.bottomPadding) / 2)
    ) {
      return true;
    }
  }

  intersectsCorners (bullet: Circle) {
    const { left, right } = this.getCorners();
    return right.intersects(bullet) || left.intersects(bullet);
  }

  cornerIntersection (source: Bullet) {
    const { left, right } = this.getCorners();
    if (left.distance(source) < right.distance(source)) {
      return source.bounceVelocity(left);
    } else {
      return source.bounceVelocity(right);
    }
  }

  updateRightPosition () {
    if (this.moveRight) {
      this.position += this.velocity;
    }
  }

  updateLeftPosition () {
    if (this.moveLeft) {
      this.position -= this.velocity;
    }
  }

  updatePosition () {
    this.updateLeftPosition();
    this.updateRightPosition();
  }

  update () {
    if (!this.domElement) return;
    this.domElement.style.left = `${this.position - this.width / 2}px`;
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
    const container = document.createElement('div');
    container.className = 'player';
    container.style.position = 'absolute';
    container.style.bottom = this.bottomPadding + 'px';
    container.style.height = `${this.height}px`;
    container.style.width = `${this.width}px`;
    this.domElement = container;
    this.parent = parent;
    this.parent.appendChild(container);
  }

  removeDom () {
    if (this.domElement && this.parent) {
      this.parent.removeChild(this.domElement);
    }
  }

}
