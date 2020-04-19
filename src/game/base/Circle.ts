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
      (c.position.x - this.position.x)**2 +
      (c.position.y - this.position.y)**2
    )
  }

  intersects (c: Circle) {
    return this.distance(c) < (c.radius + this.radius);
  }

  intersectionAngle (target: Circle) {
    let dv = target.position.subtractImmutable(this.position);
    return dv.angle + (Math.PI/2);
  }

}
