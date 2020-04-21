import Circle from "../base/Circle";


type Props = {
  width: number;
  position: number;
  acceleration?: number|null;
  speed?: number|null;
}

export default class Player {

  private domElement: HTMLDivElement | null;
  private width: number;
  velocity: number;
  position: number;
  private height: number;
  private parent: HTMLElement|null;
  private rightKeyDown: boolean;
  private leftKeyDown: boolean;
  private acceleration: number | null | undefined;
  private constantVelocity: number|null;
  private bottomPadding: number;

  constructor ({width, position, acceleration = null, speed = null} : Props) {
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
