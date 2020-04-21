import Circle from "../base/Circle";
import Vector from "../base/Vector";

export default class Brick extends Circle {

  private domElement: HTMLElement | null;
  velocity: Vector;
  private parent: HTMLElement|null;

  constructor (radius: number, position: Vector) {
    super(radius, position);
    this.velocity = new Vector(0,0);
    this.domElement = null;
    this.parent = null;
  }

  setPositionAnimated(pos: Vector) {
    if (!this.domElement) return;
    const duration = 1;
    this.domElement.style.transition = `all ${duration}s ease-in-out`;
    this.position = pos;
    setTimeout(() => {
      if (!this.domElement) return;
      this.domElement.style.transition = '';
    }, duration * 1000)
  }

  reflectHorizontal () {
    this.velocity.x *= -1;
  }

  reflectVertical () {
    this.velocity.y *= -1;
  }

  // compute velocity after bounce
  bounceVelocity (target: Circle) {
    const normal = target.getNormal(this);
    normal.normalize();
    const u = normal.multiplyImmutable(this.velocity.dotProduct(normal) / normal.dotProduct(normal));
    const w = this.velocity.subtractImmutable(u);
    return w.subtractImmutable(u);
  }

  render (parent: HTMLElement) {
    const container = document.createElement('div');
    container.className = 'bullet';
    container.style.position = 'absolute';
    container.style.height = `${this.radius*2}px`;
    container.style.width = `${this.radius*2}px`;
    this.domElement = container;
    this.parent = parent;
    this.parent.appendChild(container);
  }

  removeDom () {
    if (this.domElement && this.parent) {
      this.parent.removeChild(this.domElement);
    }
  }

  update (time: number) {
    if (!this.domElement) return;

    this.position.add(this.velocity);

    this.domElement.style.left = `${this.position.x - this.radius}px`;
    this.domElement.style.bottom = `${this.position.y - this.radius}px`;
  }

}
