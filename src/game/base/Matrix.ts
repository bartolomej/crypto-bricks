import Vector from "./Vector";

export default class Matrix {

  private v0: Vector;
  private v1: Vector;

  constructor (v0: Vector, v1: Vector) {
    this.v0 = v0;
    this.v1 = v1;
  }

  // calculates matrix-vector multiplication (linear transformation)
  transformImmutable (v: Vector) {
    let x = this.v0.multiplyImmutable(v.x);
    let y = this.v1.multiplyImmutable(v.y);
    return x.addImmutable(y);
  }

}
