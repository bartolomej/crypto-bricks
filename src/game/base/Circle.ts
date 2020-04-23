import Vector from "./Vector";

export default class Circle {

  radius: number;
  position: Vector;

  constructor (radius: number, position: Vector) {
    this.radius = radius;
    this.position = position;
  }

  setPosition (p: Vector) {
    this.position = p;
  }

  setRadius (r: number) {
    this.radius = r;
  }

  distance (c: Circle) {
    return Math.sqrt(
      (c.position.x - this.position.x) ** 2 +
      (c.position.y - this.position.y) ** 2
    )
  }

  intersects (c: Circle) {
    return this.distance(c) < (c.radius + this.radius);
  }

  intersectsLine (x: number) {
    return Math.abs(x - this.position.x) <= this.radius;
  }

  getNormal (target: Circle) {
    return this.position.subtractImmutable(target.position);
  }

  getTangent (target: Circle) {
    const normal = this.getNormal(target);
    return new Vector(-normal.y, normal.x);
  }

  createElement (className: string, imageSrc?: string, color?: string) {
    const container = document.createElement('div');
    container.className = className;
    container.style.height = `${this.radius * 2}px`;
    container.style.width = `${this.radius * 2}px`;
    container.style.position = 'absolute';
    container.style.bottom = `${this.position.y - this.radius}px`;
    container.style.left = `${this.position.x - this.radius}px`;
    if (color) {
      container.style.background = color;
    }
    if (imageSrc) {
      const image = document.createElement('img');
      image.src = imageSrc;
      container.appendChild(image);
    }
    return container;
  }

}
