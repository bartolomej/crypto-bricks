import Circle from "../base/Circle";

export default class Player {

  private domElement: HTMLDivElement | null;
  private width: number;
  velocity: number;
  position: number;
  height: number;
  private parent: HTMLElement|null;

  constructor (width: number, position: number) {
    this.height = 15;
    this.width = width;
    this.position = position;
    this.velocity = 0;
    this.domElement = null;
    this.parent = null;
  }

  get acceleration () {
    return 4;
  }

  moveLeft () {
    this.velocity -= this.acceleration;
  }

  moveRight () {
    this.velocity += this.acceleration;
  }

  bounce () {
    this.velocity *= -1;
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
      d < bullet.radius + (this.height / 2)
    ) {
      return true;
    }
  }

  render (parent: HTMLElement) {
    const container = document.createElement('div');
    container.className = 'player';
    container.style.position = 'absolute';
    container.style.bottom = '0px';
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

  update () {
    if (!this.domElement) return;
    this.position += this.velocity;
    this.domElement.style.left = `${this.position - this.width / 2}px`;

  }

}
