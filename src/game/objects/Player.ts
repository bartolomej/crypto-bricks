import Circle from "../base/Circle";
import Vector from "../base/Vector";
import Bullet from "./Bullet";


type Props = {
  width: number;
  position: number;
  acceleration?: number | null;
  speed?: number | null;
}

export default class Player {

  private domElement: HTMLDivElement | null;
  private readonly width: number;
  private readonly height: number;
  velocity: number;
  position: number;
  private parent: HTMLElement | null;
  private rightKeyDown: boolean;
  private leftKeyDown: boolean;
  private readonly acceleration: number | null | undefined;
  private readonly constantVelocity: number | null;
  private readonly bottomPadding: number;

  constructor ({ width, position, acceleration = null, speed = null }: Props) {
    this.height = 15;
    this.bottomPadding = 8;
    this.width = width;
    this.position = position;
    this.velocity = 0;
    this.constantVelocity = speed;
    this.acceleration = acceleration;
    this.domElement = null;
    this.parent = null;
    this.rightKeyDown = false;
    this.leftKeyDown = false;
    this.registerListeners();
  }

  private getCorners () {
    const r = this.height / 2;
    const left = new Circle(r, new Vector(this.position - (this.width / 2) + r, r));
    const right = new Circle(r, new Vector(this.position + (this.width / 2) - r, r));
    return { left, right };
  }

  setPositionAnimated(pos: number) {
    if (!this.domElement) return;
    const duration = 1;
    this.domElement.style.transition = `all ${duration}s ease-in-out`;
    this.position = pos;
    setTimeout(() => {
      if (!this.domElement) return;
      this.domElement.style.transition = '';
    }, duration * 1000)
  }

  getHeight () {
    return this.height + this.bottomPadding + 5;
  }

  registerListeners () {
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  onKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.leftKeyDown = true;
    }
    if (e.code === 'ArrowRight') {
      this.rightKeyDown = true;
    }
  }

  onKeyUp (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.leftKeyDown = false;
    }
    if (e.code === 'ArrowRight') {
      this.rightKeyDown = false;
    }
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

  updateVelocity () {
    // check if initialized as constant velocity movement
    if (!this.acceleration) return;

    if (this.leftKeyDown) {
      this.velocity -= this.acceleration;
    }
    if (this.rightKeyDown) {
      this.velocity += this.acceleration;
    }
  }

  updateRightPosition () {
    if (this.constantVelocity) {
      if (this.rightKeyDown) {
        this.position += this.constantVelocity;
      }
    }
  }

  updateLeftPosition () {
    if (this.constantVelocity) {
      if (this.leftKeyDown) {
        this.position -= this.constantVelocity;
      }
    }
  }

  update (time: number) {
    if (!this.domElement) return;

    if (this.acceleration) {
      this.position += this.velocity;
    }
    this.domElement.style.left = `${this.position - this.width / 2}px`;
  }

}
