import Vector from "../base/Vector";
import Circle from "../base/Circle";

export default class Brick extends Circle {

  private domElement: HTMLElement | null;

  constructor (radius: number, position: Vector) {
    super(radius, position);
    this.domElement = null;
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

  update () {

  }

}
