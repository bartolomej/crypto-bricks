import Matrix from "./Matrix";

export default class Vector {

  x: number;
  y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get slope () {
    return this.y / this.x;
  }

  get angle () {
    return Math.atan(this.y / this.x);
  }

  set angle (theta: number) {
    const length = this.length();
    this.x = Math.cos(theta);
    this.y = Math.sin(theta);
    this.normalize();
    this.multiply(length);
  }

  get normal () {
    return -(1 / this.slope);
  }

  normalize () {
    this.x /= this.length();
    this.y /= this.length();
  }

  multiplyImmutable (n: number) {
    return new Vector(
      this.x * n,
      this.y * n
    );
  }

  multiply (n: number) {
    const v = this.multiplyImmutable(n);
    this.x = v.x;
    this.y = v.y;
  }

  addImmutable (v: Vector) {
    return new Vector(v.x + this.x, v.y + this.y);
  }

  subtractImmutable (v: Vector) {
    return new Vector(v.x - this.x, v.y - this.y);
  }

  add (v: Vector) {
    this.x += v.x;
    this.y += v.y;
  }

  // calculates linear transformation (applies rotation matrix)
  rotateImmutable (angle: number) {
    const m = new Matrix(
      new Vector(Math.cos(angle), Math.sin(angle)),
      new Vector(-Math.sin(angle), Math.cos(angle))
    );
    return m.transformImmutable(this);
  }

  rotate (angle: number) {
    const { x, y } = this.rotateImmutable(angle);
    this.x = x;
    this.y = y;
  }

  length () {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  equals (v: Vector) {
    return this.x === v.x && this.y === v.y;
  }

}
