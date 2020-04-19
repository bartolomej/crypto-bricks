import Circle from "./Circle";
import Vector from "./Vector";
import Matrix from "./Matrix";

describe('Vector tests', function () {

  it('should calculate vector angle', function () {
    let v = new Vector(1, 1);

    expect(v.angle).toBeCloseTo(Math.PI / 4);
  });

  it('should calculate dot product', function () {
    let v0 = new Vector(1,0);
    let v1 = new Vector(0,1);

    expect(v0.dotProduct(v1)).toBe(0);
  });

  it('should calculate normal coefficient to angle', function () {
    let v = new Vector(1, 1);

    expect(v.normal).toBeCloseTo(-1);
  });

  it('should set vector angle', function () {
    const v = new Vector(1,1);
    v.angle = Math.PI;

    expect(v.angle).toBeCloseTo(0);
    expect(v.x).toBeCloseTo(-1);
    expect(v.y).toBeCloseTo(0);
  });

});

describe('Circle tests', function () {

  it('should calculate distance between circles', function () {
    let c1 = new Circle(5, new Vector(-1, -1));
    let c2 = new Circle(3, new Vector(5, 7));

    expect(c1.distance(c2)).toBe(10);
    expect(c2.distance(c1)).toBe(10);
  });

  it('should calculate if two circles intersects', function () {
    let c1 = new Circle(2, new Vector(-1, -1));
    let c2 = new Circle(3, new Vector(2, 2));

    expect(c1.intersects(c2)).toBeTruthy();
    expect(c2.intersects(c1)).toBeTruthy();
  });

  it('should calculate normal vector between circles', function () {
    let c1 = new Circle(1, new Vector(1,1));
    let c2 = new Circle(1, new Vector(3, 1));

    expect(c1.getNormal(c2)).toEqual(new Vector(2, 0));
  });

  it('should calculate intersection tangent between circles', function () {
    let c1 = new Circle(1, new Vector(1,1));
    let c2 = new Circle(1, new Vector(1, -1));

    expect(c1.getTangent(c2)).toEqual(new Vector(2,0));
  });

});


describe('Matrix tests', function () {

  it('should transform vector with identity matrix', function () {
    const m = new Matrix(new Vector(1,0), new Vector(0,1));
    const v = new Vector(3,4);

    expect(m.transformImmutable(v)).toEqual(v);
  });

  it('should rotate vector by an angle', function () {
    const v = new Vector(1,1);
    v.rotate(Math.PI);

    expect(v.x).toBeCloseTo(-1);
    expect(v.y).toBeCloseTo(-1);
  });

});
