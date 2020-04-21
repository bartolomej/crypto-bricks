import Vector from "./Vector";

export default class Circle {

  radius: number;
  position: Vector;

  constructor (radius: number, position: Vector) {
    this.radius = radius;
    this.position = position;
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

  getNormal (target: Circle) {
    return this.position.subtractImmutable(target.position);
  }

  getTangent (target: Circle) {
    const normal = this.getNormal(target);
    return new Vector(-normal.y, normal.x);
  }

}
