import Vector from "../base/Vector";
import Circle from "../base/Circle";

enum BrickStatus {
  ACTIVE,
  HIT
}

export default class Brick extends Circle {

  private domElement: HTMLElement | null;
  private status: BrickStatus;

  constructor (radius: number, position: Vector) {
    super(radius, position);
    this.domElement = null;
    this.status = BrickStatus.ACTIVE;
  }

  isActive () {
    return this.status === BrickStatus.ACTIVE;
  }

  render () {
    const container = document.createElement('div');
    container.className = 'brick';
    container.style.height = `${this.radius*2}px`;
    container.style.width = `${this.radius*2}px`;
    container.style.position = 'absolute';
    container.style.bottom = `${this.position.y - this.radius}px`;
    container.style.left = `${this.position.x - this.radius}px`;
    const image = document.createElement('img');
    image.src = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png';
    container.appendChild(image);
    this.domElement = container;
    return container;
  }

  hit () {
    this.status = BrickStatus.HIT;
    // @ts-ignore
    this.domElement.style.visibility = 'hidden';
  }

  update () {

  }

}
